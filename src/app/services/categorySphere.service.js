import httpService from "./http.service";

const sphereEndPoint = "category_sphere/";
const categorySphereService = {
	get: async () => {
		const { data } = await httpService.get(sphereEndPoint);
		return data;
	},
};

export default categorySphereService;
