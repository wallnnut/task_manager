import React from "react";
import { Button, Container } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import useModal from "../hooks/useModal";
import { useSelector } from "react-redux";
import { getTaskList } from "../store/slices/tasks";
import { getSizes } from "../store/slices/categorySize";
import { getSpheres } from "../store/slices/categorySphere";
import { getPriorities } from "../store/slices/priority";
import TasksList from "../components/tasksList/tasksList";
import CreateTaskForm from "../components/forms/createTaskForm/createTaskForm";
const AllProjects = () => {
	const tasks = useSelector(getTaskList());
	const sphere = useSelector(getSpheres());
	const size = useSelector(getSizes());
	const priority = useSelector(getPriorities());
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
					<CreateTaskForm
						sizes={size}
						priorities={priority}
						spheres={sphere}
					/>
				</Container>
			</Modal>
			{tasks && <TasksList tasks={tasks} />}
		</>
	);
};

export default AllProjects;
