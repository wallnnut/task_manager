import { createAction, createSlice } from "@reduxjs/toolkit";
import taskService from "../../services/task.service";
import { nanoid } from "nanoid";

const tasksSlice = createSlice({
	name: "tasks",
	initialState: {
		entities: null,
		isLoading: true,
		error: null,
		lastFetch: null,
	},
	reducers: {
		tasksRequested: (state) => {
			state.isLoading = true;
		},
		tasksReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
			state.lastFetch = Date.now();
		},
		tasksRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
		taskCreated: (state, action) => {
			if (!Array.isArray(state.entities)) {
				state.entities = [];
			}
			state.entities.push(action.payload);
		},
		taskCreateFailed: (state, action) => {
			state.error = action.payload;
		},
		taskRemoved: (state, action) => {
			state.entities = state.entities.filter(
				(task) => task._id !== action.payload
			);
		},
		taskRemoveFailed: (state, action) => {
			state.error = action.payload;
		},
		taskCompleted: (state, action) => {
			state.entities = state.entities.map((task) => {
				if (task._id === action.payload._id) {
					return {
						...task,
						...action.payload,
					};
				}
				return task;
			});
		},
	},
});
const taskCreateRequested = createAction("tasks/taskCreateRequested");
const taskDeleteRequested = createAction("tasks/taskDeleteRequested");
const taskEditRequested = createAction("tasks/taskEditRequested");

const { reducer: tasksReducer, actions } = tasksSlice;
const {
	tasksRequested,
	tasksReceived,
	tasksRequestFailed,
	taskCreated,
	taskCreateFailed,
	taskRemoved,
	taskRemoveFailed,
	taskCompleted,
} = actions;

export const loadTaskList = () => async (dispatch) => {
	dispatch(tasksRequested());
	try {
		const { content } = await taskService.get();
		dispatch(tasksReceived(content));
	} catch (error) {
		dispatch(tasksRequestFailed(error.message));
	}
};

export const createTask = (data) => async (dispatch) => {
	dispatch(taskCreateRequested());
	const taskToPut = {
		...data,
		_id: nanoid(),
		created_at: Date.now(),
	};
	try {
		const { content } = await taskService.create(taskToPut);
		dispatch(taskCreated(content));
	} catch (error) {
		dispatch(taskCreateFailed(error.message));
	}
};

export const removeTask = (taskId) => async (dispatch) => {
	dispatch(taskDeleteRequested());
	try {
		const { content } = await taskService.remove(taskId);
		if (content === null) {
			dispatch(taskRemoved(taskId));
		}
	} catch (error) {
		dispatch(taskRemoveFailed(error.message));
	}
};
export const completeTask = (data) => async (dispatch) => {
	dispatch(taskEditRequested());
	dispatch(taskCompleted(data));

	try {
		const { content } = await taskService.edit(data);
		console.log(content);
	} catch (error) {}
};

export const getTaskList = () => (state) => state.tasks.entities;
export const getLoadingStatusTasks = () => (state) => state.tasks.isLoading;
export const getTaskById = (id) => (state) =>
	state.tasks.entities.find((task) => task._id === id);

export default tasksReducer;
