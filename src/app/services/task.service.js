import httpService from "./http.service";

const taskEndPoint = "tasks/";

const taskService = {
	get: async () => {
		const { data } = await httpService.get(taskEndPoint);
		console.log(data);
		return data;
	},
};

export default taskService;
