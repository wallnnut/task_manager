import moment from "moment/moment";
import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

import DropDownButton from "../common/DropDownButton";
import useModal from "../../../hooks/useModal";
import "react-dropdown/style.css";
import TextField from "../common/TextField";
import { useDispatch } from "react-redux";
import { createTask } from "../../../store/slices/tasks";

const CreateTaskForm = ({ spheres, sizes, priorities }) => {
	const dispatch = useDispatch();
	const [data, setData] = useState({
		title: "",
		description: "",
		expires_date: "",
		priority: "",
		category_sphere: "",
		category_size: "",
		time: "",
		completed: false,
		focused_time: 0,
	});
	const [errors, setErrors] = useState({});
	const { setCreateTaskModal } = useModal();
	const [value, onChange] = useState(new Date());
	const [isCalendar, setIsCalendar] = useState(false);
	const [isAlarm, setIsAlarm] = useState(false);
	const handleClick = (e) => {
		e.stopPropagation();
		if (e.target.name === "calendar") {
			setIsCalendar((prevState) => !prevState);
		}
		if (e.target.name === "alarm") {
			setIsAlarm((prevState) => !prevState);
		}
	};
	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(data);
		dispatch(createTask(data));
	};

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				label="Название задачи"
				name="title"
				value={data.title}
				onChange={handleChange}
				error={errors.email}
			/>
			<TextField
				label="Описание задачи"
				name="description"
				value={data.description}
				onChange={handleChange}
				error={errors.email}
			/>
			<Stack
				className="d-flex mb-5 mx-auto"
				direction="horizontal"
				gap={2}
			>
				<Button name="calendar" onClick={handleClick}>
					<i className="bi bi-calendar"></i>
				</Button>
				<Button name="alarm" onClick={handleClick}>
					<i className="bi bi-alarm"></i>
				</Button>

				<DropDownButton
					actions={priorities}
					onChange={handleChange}
					name="priority"
					children={<i className="bi bi-flag"></i>}
				/>
				<DropDownButton
					actions={spheres}
					onChange={handleChange}
					name="category_sphere"
					children={<i className="bi bi-tag"></i>}
				/>
				<DropDownButton
					actions={sizes}
					onChange={handleChange}
					name="category_size"
					children={<i className="bi bi-rulers"></i>}
				/>
			</Stack>
			<Stack className="mb-5">
				{isCalendar && (
					<Stack className="mx-auto mb-5">
						<label className="text-light">Выбирите дату</label>
						<Calendar
							onClickDay={() => {
								setData((prevState) => ({
									...prevState,
									expires_date:
										moment(value).format("DD-MM-yyyy"),
								}));
								setIsCalendar(false);
							}}
							onChange={onChange}
							value={value}
						/>
					</Stack>
				)}
				{isAlarm && (
					<TextField
						name="time"
						value={data.time}
						onChange={handleChange}
						error={errors.time}
						label="Установите время"
						type="time"
					/>
				)}
				{/* <SelectField /> */}
			</Stack>
			<Button
				onClick={() => setCreateTaskModal((prevState) => !prevState)}
				className=" bg-primary-subtle w-100 mb-3"
				type="submit"
			>
				Создать
			</Button>
		</form>
	);
};

export default CreateTaskForm;
