import React from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import CheckBoxField from "./forms/common/checkBoxField";
import { useTask } from "./hooks/useTask";

const TasksList = () => {
	const { tasks } = useTask();
	return (
		<Container className="mt-5">
			{tasks.map((task) => {
				return (
					<Row
						key={task._id}
						className="align-items-center justify-content-sm-between border mb-4 p-4"
					>
						<Col className="d-flex  align-items-center ">
							<CheckBoxField mb="0" />
							{task.title}
						</Col>
						<Col>
							<Badge>{task.category_sphere}</Badge>
							<Badge>{task.category_size}</Badge>
						</Col>
						<Col>
							<Badge>{task.priority}</Badge>
							<Badge>{task.deadLine}</Badge>
						</Col>
						<Col className="d-flex justify-content-end align-items-center ">
							<Button className="ms-2">
								<i className="bi bi-trash3 fs-5"></i>
							</Button>
							<Button className="ms-2 me-3">
								<i className="bi bi-pencil fs-5"></i>
							</Button>
						</Col>
					</Row>
				);
			})}
		</Container>
	);
};

export default TasksList;
