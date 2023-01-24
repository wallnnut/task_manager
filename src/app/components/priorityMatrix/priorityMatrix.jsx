import React from "react";
import PriorityContainer from "./priorityContainer";
import { Col, Container, Row } from "react-bootstrap";

const PriorityMatrix = ({ tasks, priority }) => {
	console.log(priority);
	const urgentImportant = priority.find((p) => p.name === "Срочные и Важные");
	const notUrgentImportant = priority.find(
		(p) => p.name === "Несрочные и важные"
	);
	const urgentNotImportant = priority.find(
		(p) => p.name === "Срочные и Неважные"
	);
	const notUrgentNotImportant = priority.find(
		(p) => p.name === "Несрочные и Неважные"
	);

	const urgentImportantTasks = tasks.filter(
		(task) => task.priority === urgentImportant._id
	);
	const notUrgentImportantTasks = tasks.filter(
		(task) => task.priority === notUrgentImportant._id
	);
	const urgentNotImportantTasks = tasks.filter(
		(task) => task.priority === urgentNotImportant._id
	);
	const notUrgentNotImportantTasks = tasks.filter(
		(task) => task.priority === notUrgentNotImportant._id
	);
	return (
		<Container className="mt-5">
			<h3 className="mb-4">Матрица Эйзенхауэра</h3>
			<Row className="g-4 mb-3">
				<Col>
					<PriorityContainer
						header="Срочные и Важные"
						list={urgentImportantTasks}
						bg="danger"
					/>
				</Col>
				<Col>
					<PriorityContainer
						header="Несрочные и Важные"
						list={notUrgentImportantTasks}
						bg="warning"
					/>
				</Col>
			</Row>
			<Row>
				<Col>
					<PriorityContainer
						header="Срочные и Неважные"
						list={urgentNotImportantTasks}
						bg="warning-subtle"
					/>
				</Col>
				<Col>
					<PriorityContainer
						header="Несрочные и Неважные"
						list={notUrgentNotImportantTasks}
						bg="light-subtle"
					/>
				</Col>
			</Row>
		</Container>
	);
};

export default PriorityMatrix;