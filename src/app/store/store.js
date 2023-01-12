import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categorySizeReducer from "./slices/categorySize";
import categorySphereReducer from "./slices/categorySphere";
import prioritiesReducer from "./slices/priority";
import tasksReducer from "./slices/tasks";

const rootReducer = combineReducers({
	tasks: tasksReducer,
	size: categorySizeReducer,
	sphere: categorySphereReducer,
	priority: prioritiesReducer,
});

export function createStore() {
	return configureStore({
		reducer: rootReducer,
	});
}
