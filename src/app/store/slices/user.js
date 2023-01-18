import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";
import localStorageService from "../../services/localStorage.service";
// import { authErrorGenerator } from "../utils/authErrorGenerator";

const initialState = {
	user: null,
	error: null,
	auth: null,
	isLoggedIn: false,
};

const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		authRequestSuccess: (state, action) => {
			state.user = action.payload;
			state.isLoggedIn = true;
		},
		authRequestFailed: (state, action) => {
			state.error = action.payload;
		},

		userLoggedOut: (state) => {
			state.entities = null;
			state.auth = null;
			state.isLoggedIn = false;
			state.dataLoaded = false;
		},
		userEdited: (state, action) => {
			const index = state.entities.findIndex(
				(u) => u._id === state.auth.userId
			);
			state.entities[index] = {
				...state.entities[index],
				...action.payload,
			};
		},
		editRequestFailed: (state, action) => {
			state.error = action.payload;
		},
		authRequested: (state) => {
			state.error = null;
		},
	},
});
const userCreateRequested = createAction("users/userCreateRequested ");
const createUserFailed = createAction("users/createUserFailed");
const editRequested = createAction("users/editRequested");
const { reducer: usersReducer, actions } = usersSlice;
const {
	authRequestSuccess,
	authRequestFailed,
	userCreated,
	userLoggedOut,
	userEdited,
	editRequestFailed,
	authRequested,
} = actions;
export const signUp =
	({ email, password, ...rest }) =>
	async (dispatch) => {
		dispatch(authRequested());
		try {
			const data = await authService.register({ email, password });
			localStorageService.setToken(data);
			dispatch(
				createUser({
					_id: data.localId,
					email,
					...rest,
				})
			);
		} catch (error) {
			dispatch(authRequestFailed(error.message));
		}
	};
	const createUser = (payload) => async (dispatch) => {
	dispatch(userCreateRequested());
	console.log(payload)
	try {
		const {content} = await authService.create(payload);
		dispatch(authRequestSuccess(content));

	} catch (error) {
		dispatch(createUserFailed(error.message));
	}
};

// export const signIn =
// 	({ payload, redirect }) =>
// 	async (dispatch) => {
// 		const { email, password } = payload;
// 		dispatch(authRequested());
// 		try {
// 			const data = await authService.login({ email, password });
// 			dispatch(authRequestSuccess({ userId: data.localId }));
// 			localStorageService.setToken(data);
// 			// history.push(redirect);
// 		} catch (error) {
// 			const { code, message } = error.response.data.error;
// 			if (code === 400) {
// 				// const errorMessage = authErrorGenerator(message);
// 				// dispatch(authRequestFailed(errorMessage));
// 			} else {
// 				dispatch(authRequestFailed(error.message));
// 			}
// 		}
// 	};

// export const logOut = () => (dispatch) => {
// 	localStorageService.removeToken();
// 	dispatch(userLoggedOut());
// 	// history.push("/");
// };



// export const editUser = (data) => async (dispatch) => {
// 	dispatch(editRequested());
// 	try {
// 		const { content } = await authService.editUser(data);
// 		dispatch(userEdited(data));
// 		// history.goBack();
// 		return content;
// 	} catch (error) {
// 		dispatch(editRequestFailed(error.message));
// 	}
// };

export const getLoggedInStatus = () => (state) => state.user.isLoggedIn;
export const getDataStatus = () => (state) => state.user.dataLoaded;
export const getCurrentUserId = () => (state) => state.user.auth.userId;
export const getCurrentUserData = () => (state) => state.user.auth;
export const getLoginErrors = () => (state) => state.user.error;

export default usersReducer;
