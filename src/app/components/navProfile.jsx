import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../store/slices/user";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavProfile = () => {
	const currentUser = useSelector(getCurrentUserData());

	if (!currentUser) return "Loading...";
	return (
		<div className="d-flex align-items-center">
			{currentUser.image ? (
				<img src={currentUser.image} height="40px" />
			) : (
				<i className="fs-3 bi bi-person-circle"></i>
			)}
			<NavDropdown
				id="nav-dropdown-dark-example"
				title={currentUser.name}
				menuVariant="dark"
			>
				<NavDropdown.Item href="#action/3.1">
					<Link to={`/users/${currentUser._id}`}>Profile</Link>
				</NavDropdown.Item>
				<NavDropdown.Item href="#action/3.2">
					<Link to="/logout">Log out</Link>
				</NavDropdown.Item>
			</NavDropdown>
		</div>
	);
};

export default NavProfile;
