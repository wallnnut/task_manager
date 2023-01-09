import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const NavBar = () => {
	return (
		<>
			<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
				<Container>
					<Navbar.Brand as="div">
						<Link to="/">TimeManagment</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav as="ul" className="me-auto">
							<Nav.Link as="li">
								<Link to="/projects">Проекты</Link>
							</Nav.Link>
							<Nav.Link as="li">
								<Link to="/analytics">Аналитика</Link>
							</Nav.Link>
						</Nav>
						<Nav as="ul">
							<Nav.Link as="li">
								<Link to="/login">Login</Link>
							</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default NavBar;
