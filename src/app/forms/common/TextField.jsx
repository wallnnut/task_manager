import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const TextField = ({ label, type, name, value, onChange, error }) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	const getInputClasses = () => {
		return "form-control" + (error ? " is-invalid" : "");
	};
	const toggleShowPassword = () => {
		setShowPassword((prevState) => !prevState);
	};
	return (
		<div className="mb-4">
			<label className="text-light" htmlFor={name}>
				{label}
			</label>

			<div className="input-group has-validation">
				<input
					type={showPassword ? "text" : type}
					id={name}
					name={name}
					value={value}
					onChange={handleChange}
					className={getInputClasses()}
				/>
				{type === "password" && (
					<button
						className="btn btn-outline-secondary"
						type="button"
						onClick={toggleShowPassword}
					>
						<i
							className={
								"bi bi-eye" + (showPassword ? "-slash" : "")
							}
						></i>
					</button>
				)}
				{error && <div className="invalid-feedback">{error}</div>}
			</div>
		</div>
	);
};

export default TextField;
