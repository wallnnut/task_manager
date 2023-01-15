import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { validatorLogin } from "../../../validators/loginSchema";
import CheckBoxField from "../common/checkBoxField";
import TextField from "../common/TextField";

const LoginForm = () => {
	const [errors, setErrors] = useState({});
	const [data, setData] = useState({
		email: "",
		password: "",
		stayOn: false,
	});

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
		console.log(data);
	};
	useEffect(() => {
		validate();
	}, [data]);
	const validate = () => {
		validatorLogin
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
				label="Пароль"
				type="password"
				name="password"
				value={data.password}
				onChange={handleChange}
				error={errors.password}
			/>

			<CheckBoxField
				value={data.stayOn}
				onChange={handleChange}
				name="stayOn"
			>
				Оставаться в системе
			</CheckBoxField>
			<Button
				className="bg-primary-subtle w-100 mx-auto"
				type="submit"
				disabled={!isValid}
			>
				Войти
			</Button>
		</form>
	);
};

export default LoginForm;
