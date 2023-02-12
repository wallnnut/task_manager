import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getSizeExistStatus,
	loadCategorySizes,
} from "../store/slices/categorySize";
import {
	getSphereExistStatus,
	loadCategorySphere,
} from "../store/slices/categorySphere";
import {
	getPriorityExistStatus,
	loadPriorities,
} from "../store/slices/priority";
import { getTasksExistStatus, loadTaskList } from "../store/slices/tasks";
import { getLoggedInStatus } from "../store/slices/user";

import Spinner from "react-bootstrap/Spinner";

const DataLoader = ({ children }) => {
	const dispatch = useDispatch();
	const isLoggedIn = useSelector(getLoggedInStatus());
	const tasks = useSelector(getTasksExistStatus());
	const size = useSelector(getSizeExistStatus());
	const sphere = useSelector(getSphereExistStatus());
	const priority = useSelector(getPriorityExistStatus());
	const dataLoadedStatus = tasks && size && sphere && priority;
	useEffect(() => {
		if (isLoggedIn) {
			if (!tasks) dispatch(loadTaskList());
			if (!size) dispatch(loadCategorySizes());
			if (!sphere) dispatch(loadCategorySphere());
			if (!priority) dispatch(loadPriorities());
		}
	});
	return (
		<div>
			{dataLoadedStatus ? (
				children
			) : (
				<Spinner animation="border" variant="warning" />
			)}
		</div>
	);
};

export default DataLoader;
