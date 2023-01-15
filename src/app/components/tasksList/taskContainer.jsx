import React from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import CheckBoxField from "../forms/common/checkBoxField";

const TaskContainer = ({ task, onRemove, onComplete }) => {
	const history = useHistory();
	return (
		<Row
			key={task._id}
			className={`shadow-sm align-items-center justify-content-sm-between bg-light-subtle rounded-3 mb-4 p-4 ${
				task.completed ? "text-decoration-line-through" : ""
			}`}
		>
			<Col className="d-flex align-items-center">
				<CheckBoxField
					name="completed"
					value={task.completed}
					onChange={onComplete}
					_id={task._id}
					mb="0"
				/>
				{task.title}
			</Col>
			<Col>
				<Badge>{task.category_sphere}</Badge>
				<Badge>{task.category_size}</Badge>
			</Col>
			<Col>
				<Badge>{task.priority}</Badge>
				{/* <Badge>{task.deadLine}</Badge> */}
			</Col>
			<Col className="d-flex justify-content-end align-items-center ">
				<Button onClick={onRemove} className="ms-2">
					<i className="bi bi-trash3 fs-5"></i>
				</Button>
				<Button
					onClick={() => history.push(`/edit/${task._id}`)}
					className="ms-2 me-3"
				>
					<i className="bi bi-pencil fs-5"></i>
				</Button>
			</Col>
		</Row>
	);
};

export default TaskContainer;
