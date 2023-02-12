import axios from "axios";
import httpService from "./http.service";
import localStorageService from "./localStorage.service";
import config from "../config.json";

const httpAuth = axios.create({
	baseURL: config.apiEndPoint + "auth/",
	// params: {
	// 	key: process.env.REACT_APP_FIREBASE_KEY,
	// },
});
const userEndPoint = "user/";

const authService = {
	register: async (payload) => {
		const { data } = await httpAuth.post("signUp", payload);
		return data;
	},
	login: async ({ email, password }) => {
		const { data } = await httpAuth.post("signInWithPassword", {
			email,
			password,
		});
		return data;
	},
	refresh: async () => {
		const { data } = await httpAuth.post("token", {
			refresh_token: localStorageService.getRefreshToken(),
		});
		return data;
	},
	// Теперь не нужно создавать пользователя вручную
	// create: async (payload) => {
	// 	const { data } = await httpService.put(
	// 		userEndPoint + payload._id,
	// 		payload
	// 	);
	// 	return data;
	// },
	edit: async (payload) => {
		const { data } = await httpService.edit(
			userEndPoint + localStorageService.getUserId(),
			payload
		);

		return data;
	},
	editEmail: async ({ email }) => {
		const { data } = await httpAuth.post("accounts:update", {
			idToken: localStorageService.getAccessToken(),
			email,
			returnSecureToken: true,
		});
		return data;
	},
	getCurrentUser: async () => {
		const { data } = await httpService.get(
			userEndPoint + localStorageService.getUserId()
		);
		return data;
	},
};

export default authService;