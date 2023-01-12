import { configureStore, combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasks";

const rootReducer = combineReducers({ tasks: tasksReducer });

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
