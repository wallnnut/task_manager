import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
	getLoadingStatusTasks,
	removeTask,
	editTask,
} from "../../store/slices/tasks";
import Pagination from "./pagination";
import TaskContainer from "./taskContainer";
import { paginate } from "../../utils/paginate";

const TasksList = ({ tasks, listForAllProjects }) => {
	const isLoading = useSelector(getLoadingStatusTasks());
	const dispatch = useDispatch();
	const [activePage, setActivePage] = useState(1);
	const handleRemoveTask = (taskId) => {
		dispatch(removeTask(taskId));
	};
	const handleComplete = (data) => {
		dispatch(editTask(data));
	};
	const windowInnerHeight = window.innerHeight;
	const pageSize = windowInnerHeight === 1080 ? 6 : 3;
	const handlePageChange = (pageIndex) => {
		setActivePage(pageIndex);
	};

	const userCrop = paginate(tasks, activePage, pageSize);
	return (
		<>
			{!isLoading ? (
				<Container className="mt-5">
					{userCrop.map((task) => (
						<TaskContainer
							listForAllProjects={listForAllProjects}
							key={task._id}
							onComplete={handleComplete}
							onRemove={handleRemoveTask}
							task={task}
						/>
					))}
					<div className="d-flex justify-content-center ">
						<Pagination
							activePage={activePage}
							itemsCount={tasks.length}
							pageSize={pageSize}
							onPageChange={handlePageChange}
						/>
					</div>
				</Container>
			) : (
				"Loading"
			)}
		</>
	);
};

export default TasksList;
