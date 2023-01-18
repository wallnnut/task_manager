import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { signUp } from "../../../store/slices/user";
import { registerSchema } from "../../../validators/registerSchema";
import CheckBoxField from "../common/checkBoxField";
import RadioField from "../common/radioField";
import TextField from "../common/TextField";
const RegisterForm = () => {
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
		dispatch(signUp(data));
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
				label="Пароль"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				error={errors.password}
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
			<CheckBoxField
				value={data.license}
				onChange={handleChange}
				name="license"
				error={errors.license}
			>
				Подтвердить <a>лицензионное соглашение</a>
			</CheckBoxField>
			<Button
				className=" bg-primary-subtle w-100 mx-auto"
				type="submit"
				disabled={!isValid}
			>
				Submit
			</Button>
		</form>
	);
};

export default RegisterForm;
