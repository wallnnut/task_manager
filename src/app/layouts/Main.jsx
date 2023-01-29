import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../components/forms/common/selectField";
import SetTimerForm from "../components/forms/setTimerForm/setTimerForm";
import useModal from "../hooks/useModal";
import ModalWindow from "../components/ModalWindow";
import {
	editTask,
	getLoadingStatusTasks,
	getTaskById,
	getTaskList,
} from "../store/slices/tasks";
import CountDown from "../components/timer/timer";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import moment from "moment/moment";

const Main = () => {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		tasks: "",
	});

	const { timerModal, setTimerModal } = useModal();
	const tasks = useSelector(getTaskList());
	const isLoading = useSelector(getLoadingStatusTasks());
	const taskList = tasks
		? tasks.map((task) => ({
				value: task._id,
				label: task.title,
		  }))
		: [];

	const [[h, m, s], setTime] = useState([0, 0, 0]);
	const [totalSeconds, setTotalSeconds] = useState();

	const [paused, setPaused] = useState(true);
	const [over, setOver] = useState(false);

	const handleSubmit = (data) => {
		setTime(Object.values(data));
		setTotalSeconds(
			parseInt(data.hours) * 3600 +
				parseInt(data.minutes) * 60 +
				parseInt(data.seconds)
		);
	};

	const tick = () => {
		if (paused || over) {
			return;
		}
		if (h === 0 && m === 0 && s === 0) {
			if (data.tasks) {
				pushFocusedTime();
			}
			setOver(true);
		} else if (m === 0 && s === 0) {
			setTime([h - 1, 59, 59]);
		} else if (s === 0) {
			setTime([h, m - 1, 59]);
		} else {
			setTime([h, m, s - 1]);
		}
	};

	useEffect(() => {
		setTime([parseInt(h), parseInt(m), parseInt(s)]);
	}, [h, m, s]);
	const reset = () => {
		setTime([0, 0, 0]);
		setOver(false);
		setPaused(true);
	};
	over && reset();

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});
	const secondsLeft = [h, m, s].reduce((acc, value, index) => {
		if (index === 0) {
			return acc + value * 3600;
		}
		if (index === 1) {
			return acc + value * 60;
		}
		return acc + value;
	}, 0);

	const percentage = Math.round((secondsLeft / totalSeconds) * 100);
	const pushFocusedTime = () => {
		setPaused(true);
		setTime([0, 0, 0]);
		const currentTask = tasks.find((task) => task._id === data.tasks);
		toast.success("Вы завершили задачу");
		dispatch(
			editTask({
				_id: data.tasks,
				focused_time:
					totalSeconds - secondsLeft + currentTask.focused_time,
			})
		);
	};

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};

	return (
		<>
			{!isLoading ? (
				<div className="container mt-5 ">
					<div className="row">
						<div className="col-md-6 offset-md-3 p-4">
							<CountDown
								percentage={percentage}
								h={h}
								m={m}
								s={s}
								reset={reset}
								setPaused={setPaused}
								paused={paused}
								setTimer={setTimerModal}
								pushFocusedTime={pushFocusedTime}
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
							<Form>
								<Form.Group
									className="mb-3"
									controlId="exampleForm.ControlTextarea1"
								>
									<Form.Label>Добавьте описание</Form.Label>
									<Form.Control
										style={{ backgroundColor: "#2b3035" }}
										as="textarea"
										rows={3}
									/>
								</Form.Group>
							</Form>
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
