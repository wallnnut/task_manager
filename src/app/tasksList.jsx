import React from "react";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import CheckBoxField from "./forms/common/checkBoxField";
import {
	getLoadingStatusTasks,
	getTaskList,
	removeTask,
	completeTask,
} from "./store/slices/tasks";

const TasksList = () => {
	const tasks = useSelector(getTaskList());
	const isLoading = useSelector(getLoadingStatusTasks());
	const dispatch = useDispatch();
	const handleRemoveTask = (taskId) => {
		dispatch(removeTask(taskId));
	};
	const history = useHistory();
	const handleComplete = (data) => {
		console.log(data);
		dispatch(completeTask(data));
	};

	return (
		<>
			{!isLoading ? (
				<Container className="mt-5">
					{tasks.map((task) => {
						return (
							<Row
								key={task._id}
								className="align-items-center justify-content-sm-between border mb-4 p-4"
							>
								<Col className="d-flex  align-items-center ">
									<CheckBoxField
										name="completed"
										value={task.completed}
										onChange={handleComplete}
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
									<Button
										onClick={() =>
											handleRemoveTask(task._id)
										}
										className="ms-2"
									>
										<i className="bi bi-trash3 fs-5"></i>
									</Button>
									<Button
										onClick={() =>
											history.push(`/edit/${task._id}`)
										}
										className="ms-2 me-3"
									>
										<i className="bi bi-pencil fs-5"></i>
									</Button>
								</Col>
							</Row>
						);
					})}
				</Container>
			) : (
				"Loading"
			)}
		</>
	);
};

export default TasksList;
