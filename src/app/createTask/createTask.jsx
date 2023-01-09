import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Button, FormLabel, Modal, Stack } from "react-bootstrap";
import useModal from "../hooks/useModal";
import DropDownButton from "./DropDownButton";

const CreateTask = () => {
	const { createTaskModal, setCreateTaskModal } = useModal();
	const [value, onChange] = useState(new Date());
	const [isCalendar, setIsCalendar] = useState(false);
	const [isAlarm, setIsAlarm] = useState(false);
	const handleClick = ({ target }) => {
		if (target.name === "calendar") {
			setIsCalendar((prevState) => !prevState);
		}
		if (target.name === "alarm") {
			setIsAlarm((prevState) => !prevState);
		}
	};
	return (
		<Container>
			<Row>
				<Col className="offset-md-3 rounded-4 p-4" md={6}>
					<Form
						onSubmit={(e) => {
							e.preventDefault();
						}}
						className="items-center"
					>
						<Stack>
							<Form.Group
								className="mb-3"
								controlId="formBasicEmail"
							>
								<FloatingLabel
									label="Название задачи"
									className="mb-3"
								>
									<Form.Control
										type="text"
										placeholder="Название задачи"
									/>
								</FloatingLabel>
							</Form.Group>
							<Form.Group className="mb-3">
								<FloatingLabel
									label="Описание задачи"
									className="mb-3"
								>
									<Form.Control
										type="text"
										placeholder="Описание задачи"
									/>
								</FloatingLabel>
							</Form.Group>
							<Stack
								className="mb-5 mx-auto"
								direction="horizontal"
								gap={3}
							>
								<Button name="calendar" onClick={handleClick}>
									<i className="bi bi-calendar"></i>
								</Button>
								<Button name="alarm" onClick={handleClick}>
									<i className="bi bi-alarm"></i>
								</Button>
								<Button>
									<i className="bi bi-bar-chart-steps"></i>
								</Button>
								<DropDownButton
									children={<i className="bi bi-flag"></i>}
								/>
								<DropDownButton
									children={<i className="bi bi-tag"></i>}
								/>
							</Stack>
							<Stack className="mb-5 ">
								{isCalendar && (
									<Calendar
										onClickDay={console.log(value)}
										onChange={onChange}
										value={value}
									/>
								)}
							</Stack>
						</Stack>

						<Button
							onClick={() =>
								setCreateTaskModal((prevState) => !prevState)
							}
							className="w-100 mb-3"
							variant="primary"
							type="submit"
						>
							Создать
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	);
};

export default CreateTask;
