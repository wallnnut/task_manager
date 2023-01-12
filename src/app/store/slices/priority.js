import { createSlice } from "@reduxjs/toolkit";
import priorityService from "../../services/priorities.servise";

const prioritySlice = createSlice({
	name: "priorities",
	initialState: {
		entities: null,
		isLoading: null,
		error: null,
	},
	reducers: {
		prioritiesRequested: (state) => {
			state.isLoading = true;
		},
		prioritiesReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
		},
		prioritiesRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: prioritiesReducer, actions } = prioritySlice;
const { prioritiesRequested, prioritiesReceived, prioritiesRequestFailed } =
	actions;

export const loadPriorities = () => async (dispatch) => {
	dispatch(prioritiesRequested());
	try {
		const { content } = await priorityService.get();
		dispatch(prioritiesReceived(content));
	} catch (error) {
		dispatch(prioritiesRequestFailed());
	}
};

export default prioritiesReducer;
