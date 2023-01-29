import React, { useEffect } from "react";
import { getLoadingStatusTasks, loadTaskList } from "../../store/slices/tasks";
import { loadCategorySizes } from "../../store/slices/categorySize";
import { loadCategorySphere } from "../../store/slices/categorySphere";
import { loadPriorities } from "../../store/slices/priority";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInStatus, receiveUserData } from "../../store/slices/user";
import Spinner from "react-bootstrap/Spinner";

const Loader = ({ children }) => {
	const dispatch = useDispatch();
	const loggedInStatus = useSelector(getLoggedInStatus());
	const tasksIsLoaded = useSelector(getLoadingStatusTasks());

	useEffect(() => {
		if (loggedInStatus) dispatch(receiveUserData());

		dispatch(loadTaskList());
		dispatch(loadCategorySizes());
		dispatch(loadCategorySphere());
		dispatch(loadPriorities());
	}, [loggedInStatus]);
	return (
		<div>
			{!tasksIsLoaded ? (
				children
			) : (
				<Spinner animation="border" variant="warning" />
			)}
		</div>
	);
};

export default Loader;
