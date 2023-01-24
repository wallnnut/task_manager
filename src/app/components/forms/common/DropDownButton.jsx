import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

const DropDownButton = ({
	children,
	name,
	onChange,
	actions,
	bg,
	className,
}) => {
	const handleSelect = ({ target }) => {
		onChange({ name: target.name, value: target.value });
	};
	return (
		<Dropdown className={className}>
			<Dropdown.Toggle
				className={`d-flex align-items-center bg-${bg}`}
				variant="primary"
				id="dropdown-basic"
			>
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
								value={act._id}
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
