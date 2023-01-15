import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../store/slices/user";

const NavProfile = () => {
	const currentUser = useSelector(getCurrentUserData());
	console.log(currentUser);
	const [isOpen, setOpen] = useState(false);
	const toggleMenu = () => {
		setOpen((prevState) => !prevState);
	};
	if (!currentUser) return "Loading...";
	return (
		<div className="dropdown text-light" onClick={toggleMenu}>
			<div className="btn dropdown-toggle d-flex align-items-center">
				<div className="me-2">{currentUser.name}</div>
				{currentUser.image ? (
					<img src={currentUser.image} height="40px" />
				) : (
					<i class="bi bi-person-circle"></i>
				)}
			</div>
			<div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
				<Link
					className="dropdown-item"
					to={`/users/${currentUser._id}`}
				>
					Profile
				</Link>
				<Link className="dropdown-item" to="/logout">
					Log out
				</Link>
			</div>
		</div>
	);
};

export default NavProfile;
