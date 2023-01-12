import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error, mb, _id }) => {
	const handleChange = () => {
		if (name === "completed") {
			onChange({ _id: _id, [name]: !value });
		} else {
			onChange({ name: name, value: !value });
		}
	};
	const getInputClasses = () => {
		return "form-check-input" + (error ? " is-invalid" : "");
	};
	return (
		<div className={`form-check mb-${mb ? mb : 4}`}>
			<input
				className={getInputClasses()}
				type="checkbox"
				value=""
				id={name}
				onChange={handleChange}
				checked={value}
			/>
			<label className="form-check-label" htmlFor={name}>
				{children}
			</label>
			{error && <div className="invalid-feedback">{error}</div>}
		</div>
	);
};

export default CheckBoxField;
