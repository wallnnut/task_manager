import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import CreateTask from "../createTask/createTask";
import TasksList from "../tasksList";
import { Modal } from "react-bootstrap";
import useModal from "../hooks/useModal";
import CreateTaskForm from "../forms/createTaskForm";

const AllProjects = () => {
	const { createTaskModal, setCreateTaskModal } = useModal();
	return (
		<>
			<Container className="mt-4 d-flex justify-content-between  ">
				<h2>Все проекты</h2>
				<Button
					onClick={() => setCreateTaskModal(true)}
					className="d-flex align-items-center"
					variant="warning"
				>
					<span className="fs-5">Создать</span>
					<i className="bi bi-plus fs-3"></i>
				</Button>
			</Container>
			<Modal
				contentClassName="bg-dark"
				show={createTaskModal}
				onHide={() => setCreateTaskModal((prevState) => !prevState)}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton closeVariant="white">
					<h3 className=" text-lg text-center text-light">
						Создать задачу
					</h3>
				</Modal.Header>
				<Container>
					<CreateTaskForm />
				</Container>
			</Modal>

			<TasksList />
		</>
	);
};

export default AllProjects;
