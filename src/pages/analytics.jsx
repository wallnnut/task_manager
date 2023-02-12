import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getTaskList } from "../store/slices/tasks";
import TasksList from "../modules/tasksList/tasksList";
import Filters from "../modules/filterModalForm/filters";
import PriorityMatrix from "../modules/priorityMatrix/priorityMatrix";
import DataLoader from "../hoc/dataLoader";
import CompletedTasks from "../modules/CompletedInChart/taskCompleted";

const Analytics = () => {
	const tasks = useSelector(getTaskList());
	const [filter, setFilter] = useState({});
	const onSelect = (choosenCategory) => {
		setFilter(choosenCategory);
	};

	const filterTasks = (tasksList) => {
		const filteredTasks = filter.sphere
			? tasksList.filter((task) => task.category_sphere === filter.sphere)
			: filter.size
			? tasksList.filter((task) => task.category_size === filter.size)
			: filter.priority
			? tasksList.filter((task) => task.priority === filter.priority)
			: tasksList;
		return filteredTasks;
	};

	const filteredTasks = filterTasks(tasks);

	return (
		<DataLoader>
			<Filters onSelect={onSelect} />
			<TasksList tasks={filteredTasks} listForAllProjects={false} />
			<PriorityMatrix />
			<CompletedTasks />
		</DataLoader>
	);
};

export default Analytics;
