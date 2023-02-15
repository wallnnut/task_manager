import React, { useState } from "react";
import { useParams } from "react-router-dom";
import LoginForm from "../modules/loginForm/LoginForm";
import RegisterForm from "../modules/registerForm/registerForm";
const RegisterLogin = () => {
	const { type } = useParams();
	const [formType, setFormType] = useState(
		type === "register" ? type : "login"
	);
	const toggleFormType = () => {
		setFormType((prevState) =>
			prevState === "register" ? "login" : "register"
		);
	};

	return (
		<div className="container mt-5">
			<div className="row">
				<div className="col-md-6 offset-md-3 shadow bg-dark rounded-3 p-4">
					{formType === "register" ? (
						<>
							<h3 className=" text-center mb-4">Регистрация</h3>
							<RegisterForm />
							<p>
								Уже есть аккаунт?
								<span role="button" onClick={toggleFormType}>
									Войти
								</span>
							</p>
						</>
					) : (
						<>
							<h3 className="text-center mb-4">Войти</h3>
							<LoginForm />
							<p>
								Нет аккаунта
								<span role="button" onClick={toggleFormType}>
									Зарегестрироваться
								</span>
							</p>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default RegisterLogin;
