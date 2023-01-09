import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropDownButton = ({ children, name, onChange }) => {
	const actions = ["action1", "action2", "action3"];
	const handleSelect = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	return (
		<Dropdown>
			<Dropdown.Toggle variant="primary" id="dropdown-basic">
				{children}
			</Dropdown.Toggle>

			<Dropdown.Menu>
				{actions.map((act) => {
					return (
						<Dropdown.Item
							as="button"
							onClick={handleSelect}
							key={act}
							name={name}
							value={act}
						>
							{act}
						</Dropdown.Item>
					);
				})}
			</Dropdown.Menu>
		</Dropdown>
	);
};

export default DropDownButton;
