import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SelectField from "../forms/common/selectField";
import SetTimerForm from "../forms/setTimerForm/setTimerForm";
import useModal from "../hooks/useModal";
import ModalWindow from "../ModalWindow";
import { getLoadingStatusTasks, getTaskList } from "../store/slices/tasks";
import CountDown from "../timer/timer";
const Main = () => {
	const tasks = useSelector(getTaskList());
	const isLoading = useSelector(getLoadingStatusTasks());
	const taskList = tasks
		? tasks.map((task) => ({
				value: task._id,
				label: task.title,
		  }))
		: [];
	const [timer, setTimer] = useState({
		hours: "0",
		minutes: "0",
		seconds: "0",
	});
	const [data, setData] = useState({
		tasks: "",
	});
	const { timerModal, setTimerModal } = useModal();

	const handleSubmit = (data) => {
		setTimer(data);
	};

	const handleChange = (target) => {
		console.log(target);
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};
	const time = new Date();
	time.setSeconds(time.getSeconds() + timer);

	return (
		<>
			{!isLoading ? (
				<div className="container mt-5 ">
					<div className="row">
						<div className="col-md-6 offset-md-3  p-4">
							<CountDown
								setTimer={setTimerModal}
								hours={timer.hours}
								minutes={timer.minutes}
								seconds={timer.seconds}
							/>
							<ModalWindow
								modalHeader="Установить таймер"
								modalBody={
									<SetTimerForm onSubmit={handleSubmit} />
								}
								modalButton="Установить"
								show={timerModal}
								handleClose={() =>
									setTimerModal((prevState) => !prevState)
								}
							/>
							<SelectField
								label="Выбери задачу"
								defaultOption="Choose..."
								options={taskList}
								name="tasks"
								onChange={handleChange}
								value={data.tasks}
							/>
							<textarea rows="4" cols="30" name="text"></textarea>
						</div>
					</div>
				</div>
			) : (
				"Loading..."
			)}
		</>
	);
};

export default Main;
