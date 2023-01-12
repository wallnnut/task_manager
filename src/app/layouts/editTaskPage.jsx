import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getLoadingStatusTasks, getTaskById } from "../store/slices/tasks";
import TaskCategoryCard from "../taskCategoryCard";
import TaskPriorityCard from "../taskPriorityCard";
import TaskTitleCard from "../taskTitleCard";

const EditTaskPage = () => {
	const isLoading = useSelector(getLoadingStatusTasks());
	const { taskId } = useParams();
	const currentTask = useSelector(getTaskById(taskId));
	console.log(currentTask);
	return (
		<>
			{!isLoading ? (
				<div className="container mt-5">
					<div className="row gutters-sm">
						<div className="col-md-4">
							<div>Edit FORM </div>
						</div>
						<div className="col-md-7 mb-3 ">
							<TaskTitleCard task={currentTask} />
							<TaskPriorityCard task={currentTask} />
							<TaskCategoryCard task={currentTask} />
						</div>
					</div>
				</div>
			) : (
				"Loading"
			)}
		</>
	);
};

export default EditTaskPage;
