import httpService from "./http.service";

const taskEndPoint = "tasks/";

const taskService = {
	get: async () => {
		const { data } = await httpService.get(taskEndPoint);
		return data;
	},
	create: async (payload) => {
		const {data} = await httpService.put(taskEndPoint+payload._id, payload)
		return data
	},
	remove: async (taskId) => {
		const {data} = await httpService.delete(taskEndPoint+taskId)
		return data;
	},
	edit: async (payload) => {
const {data} = await httpService.edit(taskEndPoint+payload._id, payload)
return data
	}
};

export default taskService;
