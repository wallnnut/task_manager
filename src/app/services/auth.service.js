import axios from "axios";
import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
	baseURL: `https://identitytoolkit.googleapis.com/v1/`,
	params: {
		key: process.env.REACT_APP_FIREBASE_KEY,
	},
});
const userEndPoint = "/user";

const authService = {
	register: async ({ email, password }) => {
		const { data } = await httpAuth.post("accounts:signUp", {
			email,
			password,
			returnSecureToken: true,
		});
		return data;
	},
	login: async ({ email, password }) => {
		const { data } = await httpAuth.post("accounts:signInWithPassword", {
			email,
			password,
			returnSecureToken: true,
		});
		return data;
	},
	create: async (payload) => {
		const { data } = await httpService.put(
			userEndPoint + payload._id,
			payload
		);
		return data;
	},
	edit: async (payload) => {
		const { data } = await httpService.patch(
			userEndPoint + localStorageService.getUserId(),
			payload
		);

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
