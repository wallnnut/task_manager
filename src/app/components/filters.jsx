import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import useModal from "../hooks/useModal";
const Filters = ({ spheres, sizes, priorities, onSelect }) => {
	const { setFilterModal } = useModal();
	const handleClick = ({ target }) => {
		setFilterModal((prevState) => !prevState);
		if (!target.value) {
			onSelect({});
		}
		onSelect({ [target.name]: target.value });
	};

	return (
		<Container>
			<Row>
				<Col>
					<div>
						<h5>Сфера</h5>
						<hr />
						<ul>
							{spheres.map((sphere) => (
								<li style={{ listStyle: "none" }}>
									<button
										value={sphere.name}
										onClick={(e) => handleClick(e)}
										name="sphere"
									>
										{sphere.name}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div>
						<h5>Размер</h5>
						<hr />
						<ul>
							{sizes.map((size) => (
								<li style={{ listStyle: "none" }}>
									<button
										value={size.name}
										onClick={(e) => handleClick(e)}
										name="size"
									>
										{size.name}
									</button>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h5>Приоритет</h5>
						<hr />
						<ul>
							{priorities.map((priority) => (
								<li style={{ listStyle: "none" }} role="button">
									<button
										value={priority.name}
										onClick={(e) => handleClick(e)}
										name="priority"
									>
										{priority.name}
									</button>
								</li>
							))}
						</ul>
						<Button onClick={(e) => handleClick(e)}>
							Сбросить фильтр
						</Button>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default Filters;
