import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
	editTask,
	getLoadingStatusTasks,
	getTaskById,
} from "../store/slices/tasks";
import TaskCategoryCard from "../components/taskCategoryCard";
import TaskPriorityCard from "../components/taskPriorityCard";
import TaskTitleCard from "../components/taskTitleCard";
import { Button, Stack } from "react-bootstrap";
import DropDownButton from "../components/forms/common/DropDownButton";
import TextField from "../components/forms/common/TextField";
import moment from "moment";
import useModal from "../hooks/useModal";
import { Calendar } from "react-calendar";
const EditTaskPage = ({ spheres, sizes, priorities }) => {
	const isLoading = useSelector(getLoadingStatusTasks());
	const { taskId, edit } = useParams();
	const dispatch = useDispatch();
	const currentTask = useSelector(getTaskById(taskId));
	const [data, setData] = useState({
		...currentTask,
	});

	const handleClick = (e) => {
		e.stopPropagation();
		if (e.target.name === "calendar") {
			setIsCalendar((prevState) => !prevState);
		}
		if (e.target.name === "alarm") {
			setIsAlarm((prevState) => !prevState);
		}
	};
	const [errors, setErrors] = useState({});
	const { setCreateTaskModal } = useModal();
	const [value, onChange] = useState(new Date());
	const [isCalendar, setIsCalendar] = useState(false);
	const [isAlarm, setIsAlarm] = useState(false);
	const handleChange = (target) => {
		if (target.name === "time") {
			setData((prevState) => ({
				...prevState,
				[target.name]: moment(target.value, "HH:mm").format("x"),
			}));
		} else {
			setData((prevState) => ({
				...prevState,
				[target.name]: target.value,
			}));
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(editTask(data));
	};
	return (
		<>
			{!isLoading ? (
				<div className="container mt-5">
					<div className="row gutters-sm">
						<div className="col-md-4">
							<div>
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
										<Button
											name="calendar"
											onClick={handleClick}
										>
											<i className="bi bi-calendar"></i>
										</Button>
										<Button
											name="alarm"
											onClick={handleClick}
										>
											<i className="bi bi-alarm"></i>
										</Button>

										<DropDownButton
											actions={priorities}
											onChange={handleChange}
											name="priority"
											children={
												<i className="bi bi-flag"></i>
											}
										/>
										<DropDownButton
											actions={spheres}
											onChange={handleChange}
											name="category_sphere"
											children={
												<i className="bi bi-tag"></i>
											}
										/>
										<DropDownButton
											actions={sizes}
											onChange={handleChange}
											name="category_size"
											children={
												<i className="bi bi-rulers"></i>
											}
										/>
									</Stack>
									<Stack className="mb-5">
										{isCalendar && (
											<Stack className="mx-auto mb-5">
												<label className="text-light">
													Выбирите дату
												</label>
												<Calendar
													onClickDay={(value) => {
														setData(
															(prevState) => ({
																...prevState,
																expires_date:
																	moment(
																		value
																	).format(
																		"x"
																	),
															})
														);
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
										onClick={() =>
											setCreateTaskModal(
												(prevState) => !prevState
											)
										}
										className=" bg-primary-subtle w-100 mb-3"
										type="submit"
									>
										Создать
									</Button>
								</form>
							</div>
						</div>
						<div className="col-md-7 mb-3 ">
							<TaskTitleCard task={currentTask} />
							<TaskPriorityCard task={currentTask} />
							<TaskCategoryCard task={currentTask} />
						</div>
					</div>
				</div>
			) : (
				"Loading"
			)}
		</>
	);
};

export default EditTaskPage;
