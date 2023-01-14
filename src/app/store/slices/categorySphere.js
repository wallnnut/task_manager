import { createSlice } from "@reduxjs/toolkit";
import categorySphereService from "../../services/categorySphere.service";

const categorySphereSlice = createSlice({
	name: "categorySphere",
	initialState: {
		entities: null,
		isLoading: null,
		error: null,
	},
	reducers: {
		categorySphereRequested: (state) => {
			state.isLoading = true;
		},
		categorySphereReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
		},
		categorySphereRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: categorySphereReducer, actions } = categorySphereSlice;
const {
	categorySphereRequested,
	categorySphereReceived,
	categorySphereRequestFailed,
} = actions;

export const loadCategorySphere = () => async (dispatch) => {
	dispatch(categorySphereRequested());
	try {
		const { content } = await categorySphereService.get();
		dispatch(categorySphereReceived(content));
	} catch (error) {
		dispatch(categorySphereRequestFailed());
	}
};

export const getSpheres = () => (state) => state.sphere.entities;

export default categorySphereReducer;
