import React from "react";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const CompletedTasks = () => {
	const data = {
		labels: [`Лягушек всего ${5}`, `Лягушек съедено ${0}`],
		datasets: [
			{
				data: [0, 5],
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
				],
				borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
				borderWidth: 1,
			},
		],
	};
	return <Doughnut data={data} />;
};

export default TimeTilTheEnd;
