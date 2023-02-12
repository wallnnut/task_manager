import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { signIn } from "../../store/slices/user";
import { validatorLogin } from "./validators/loginSchema";
import { CheckBoxField, TextField } from "components";

const LoginForm = () => {
	const history = useHistory();
	const dispatch = useDispatch();
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
		const { email, password } = data;
		dispatch(signIn({ email, password }));
		history.push("/");
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
