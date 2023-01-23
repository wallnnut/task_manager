import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { registerSchema } from "../validators/registerSchema";
import CheckBoxField from "./forms/common/checkBoxField";
import RadioField from "./forms/common/radioField";
import TextField from "./forms/common/TextField";

const EditUserPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [errors, setErrors] = useState({});
	const [data, setData] = useState({
		email: "",
		password: "",
		birthDate: moment().format("yyyy-MM-DD"),
		name: "",
		sex: "male",
		license: false,
	});
	const options = [
		{ name: "Male", value: "male" },
		{ name: "Female", value: "female" },
		{ name: "Other", value: "other" },
	];

	const handleChange = (target) => {
		setData((prevState) => ({
			...prevState,
			[target.name]: target.value,
		}));
	};
	const isValid = Object.keys(errors).length === 0;
	const handleSubmit = (e) => {
		e.preventDefault();
		const isValid = validate();
		if (!isValid) return;
	};

	useEffect(() => {
		validate();
	}, [data]);
	const validate = () => {
		registerSchema
			.validate(data)
			.then(() => {
				setErrors({});
			})
			.catch((e) => setErrors({ [e.path]: e.message }));
		return Object.keys(errors).length === 0;
	};
	return (
		<Container className="mt-5">
			<Row>
				<Col
					md={6}
					className="offset-md-3 shadow bg-dark rounded-3 p-4"
				>
					<h3>Редактировать</h3>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Электронная почта"
							name="email"
							value={data.email}
							onChange={handleChange}
							error={errors.email}
						/>
						<TextField
							label="Имя"
							name="name"
							value={data.name}
							onChange={handleChange}
							error={errors.name}
						/>

						<TextField
							label="Дата рождения"
							type="date"
							name="birthDate"
							value={data.birthDate}
							onChange={handleChange}
							error={errors.birthDate}
						/>
						<RadioField
							options={options}
							value={data.sex}
							name="sex"
							onChange={handleChange}
							label="Выберите ваш пол"
						/>
						<Button
							className=" bg-primary-subtle w-100 mx-auto"
							type="submit"
							disabled={!isValid}
						>
							Submit
						</Button>
					</form>
				</Col>
			</Row>
		</Container>
	);
};

export default EditUserPage;
