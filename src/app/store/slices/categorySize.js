import { createSlice } from "@reduxjs/toolkit";
import categorySizeService from "../../services/categorySize.service";

const categorySizeSlice = createSlice({
	name: "categorySize",
	initialState: {
		entities: null,
		isLoading: null,
		error: null,
	},
	reducers: {
		categorySizesRequested: (state) => {
			state.isLoading = true;
		},
		categorySizesReceived: (state, action) => {
			state.isLoading = false;
			state.entities = action.payload;
		},
		categorySizesRequestFailed: (state, action) => {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

const { reducer: categorySizeReducer, actions } = categorySizeSlice;
const {
	categorySizesRequested,
	categorySizesReceived,
	categorySizesRequestFailed,
} = actions;

export const loadCategorySizes = () => async (dispatch) => {
	dispatch(categorySizesRequested());
	try {
		const { content } = await categorySizeService.get();
		dispatch(categorySizesReceived(content));
	} catch (error) {
		dispatch(categorySizesRequestFailed());
	}
};

export const getSizes = () => (state) => state.size.entities;


export default categorySizeReducer;