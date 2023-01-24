import React from "react";
import { Badge, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { getSizeById } from "../../store/slices/categorySize";
import { getSphereById } from "../../store/slices/categorySphere";
import { getPriorityById } from "../../store/slices/priority";
import CheckBoxField from "../forms/common/checkBoxField";

const TaskContainer = ({ task, onRemove, onComplete, listForAllProjects }) => {
	const size = useSelector(getSizeById(task.category_size));
	const sphere = useSelector(getSphereById(task.category_sphere));
	const priority = useSelector(getPriorityById(task.priority));
	const history = useHistory();
	return (
		<Row
			className={`shadow-sm align-items-center justify-content-sm-between bg-light-subtle rounded-3 mb-4 p-4 ${
				task.completed ? "text-decoration-line-through" : ""
			}`}
		>
			<Col className="d-flex align-items-center">
				{listForAllProjects && (
					<CheckBoxField
						name="completed"
						value={task.completed}
						onChange={onComplete}
						_id={task._id}
						mb="0"
					/>
				)}
				<Link to={`projects/${task._id}`}>{task.title}</Link>
			</Col>
			<Col>
				<Badge>{sphere.name}</Badge>
				<Badge>{size.name}</Badge>
			</Col>
			<Col>
				<Badge>{priority.name}</Badge>
				{/* <Badge>{task.deadLine}</Badge> */}
			</Col>
			<Col className="d-flex justify-content-end align-items-center ">
				{listForAllProjects ? (
					<>
						<Button
							onClick={() => onRemove(task._id)}
							className="ms-2"
						>
							<i className="bi bi-trash3 fs-5"></i>
						</Button>
						<Button
							onClick={() => history.push(`/${task._id}/edit`)}
							className="ms-2 me-3"
						>
							<i className="bi bi-pencil fs-5"></i>
						</Button>
					</>
				) : (
					<p>{task.focused_time} секунд</p>
				)}
			</Col>
		</Row>
	);
};

export default TaskContainer;
