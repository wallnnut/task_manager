import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropDownButton = ({ children, name, onChange, actions }) => {
	const handleSelect = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	return (
		<Dropdown>
			<Dropdown.Toggle variant="primary" id="dropdown-basic">
				{children}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{actions &&
					actions.map((act) => {
						return (
							<Dropdown.Item
								as="button"
								type="button"
								onClick={handleSelect}
								key={act._id}
								name={name}
								value={act.name}
							>
								{act.name}
							</Dropdown.Item>
						);
					})}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropDownButton;
