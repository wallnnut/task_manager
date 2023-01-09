import React, { useContext, useState, useEffect } from "react";
import taskService from "../services/task.service";
import Spinner from "react-bootstrap/Spinner";

const TaskContext = React.createContext();

export const useTask = () => {
	return useContext(TaskContext);
};

const TaskProvider = ({ children }) => {
	const [tasks, setTasks] = useState([]);
	const [isloading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		getTasks();
	}, []);

	useEffect(() => {
		if (error !== null) {
			setError(null);
		}
	}, [error]);
	async function getTasks() {
		try {
			const { content } = await taskService.get();
			setTasks(content);
			setLoading(false);
		} catch (error) {
			errorCatcher(error);
		}
	}
	function errorCatcher(error) {
		const { message } = error.response.data;
		setError(message);
	}
	// function getUserById(userId) {
	// 	return users.find((user) => user._id === userId);
	// }
	return (
		<TaskContext.Provider value={{ tasks }}>
			{!isloading ? (
				children
			) : (
				<Spinner animation="border" variant="warning" />
			)}
		</TaskContext.Provider>
	);
};

export default TaskProvider;
