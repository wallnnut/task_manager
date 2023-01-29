import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	editUserData,
	editUserEmail,
	getCurrentUserData,
	getLoggedInStatus,
	receiveUserData,
} from "../store/slices/user";
import { registerSchema } from "../validators/registerSchema";
import RadioField from "./forms/common/radioField";
import TextField from "./forms/common/TextField";

const EditUserPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	// const loggedInStatus = useSelector(getLoggedInStatus());

	const currentUser = useSelector(getCurrentUserData());

	const [data, setData] = useState({
		email: currentUser.email,
		birthDate: currentUser.birthDate,
		name: currentUser.name,
		sex: currentUser.sex,
	});
	const options = [
		{ name: "Male", value: "male" },
		{ name: "Female", value: "female" },
		{ name: "Other", value: "other" },
	];

	const handleChange = (target) => {
		if (target.name === "birthDate") {
			setData((prevState) => ({
				...prevState,
				[target.name]: moment(target.value, "yyyy-MM-DD").format("x"),
			}));
		} else {
			setData((prevState) => ({
				...prevState,
				[target.name]: target.value,
			}));
		}
	};
	const isValid = Object.keys(errors).length === 0;
	const handleSubmit = (e) => {
		e.preventDefault();
		// const isValid = validate();
		// if (!isValid) return;
		const { email, birthDate, name, sex } = data;
		if (currentUser.email !== data.email) {
			dispatch(editUserEmail({ email }));
		}
		dispatch(editUserData({ birthDate, name, sex }));
	};

	// useEffect(() => {
	// 	validate();
	// }, [data]);
	// const validate = () => {
	// 	registerSchema
	// 		.validate(data)
	// 		.then(() => {
	// 			setErrors({});
	// 		})
	// 		.catch((e) => setErrors({ [e.path]: e.message }));
	// 	return Object.keys(errors).length === 0;
	// };
	if (!currentUser) return <Spinner animation="border" variant="warning" />;

	return (
		<Container className="mt-5">
			<Row>
				<Col
					md={6}
					className="offset-md-3 shadow bg-dark rounded-3 p-4"
				>
					<h3>Редактировать</h3>
					<form onSubmit={handleSubmit}>
						<Container>
							<Row>
								<Col>
									<TextField
										label="Электронная почта"
										name="email"
										value={data.email}
										onChange={handleChange}
										error={errors.email}
									/>
								</Col>
								<Col>
									<TextField
										label="Имя"
										name="name"
										value={data.name}
										onChange={handleChange}
										error={errors.name}
									/>
								</Col>
							</Row>
							<Row>
								<Col>
									<TextField
										label="Дата рождения"
										type="date"
										name="birthDate"
										value={data.birthDate}
										onChange={handleChange}
										error={errors.birthDate}
									/>
								</Col>
								<Col>
									<RadioField
										options={options}
										value={data.sex}
										name="sex"
										onChange={handleChange}
										label="Выберите ваш пол"
									/>
								</Col>
							</Row>

							<Button
								className=" bg-primary-subtle w-100 mx-auto"
								type="submit"
								disabled={!isValid}
							>
								Submit
							</Button>
						</Container>
					</form>
				</Col>
			</Row>
		</Container>
	);
};

export default EditUserPage;