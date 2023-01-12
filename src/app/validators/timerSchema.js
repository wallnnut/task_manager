import * as yup from "yup";

export const timerSchema = yup.object().shape({
	seconds: yup
		.string()
		.min(0, "Минимально возможное значение 0")
		.max(59, "Максимально возможное значение 59"),
	minutes: yup
		.string()
		.min(0, "Минимально возможное значение 0")
		.max(59, "Максимально возможное значение 59"),
	hours: yup
		.string()
		.min(0, "Минимально возможное значение 0")
		.max(24, "Максимально возможное значение 24"),
});
