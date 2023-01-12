import httpService from "./http.service";

const sizeEndPoint = "category_size/";
const categorySizeService = {
	get: async () => {
		const { data } = await httpService.get(sizeEndPoint);
		return data;
	},
};

export default categorySizeService;
