import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import useModal from "../../hooks/useModal";
const Filters = ({ spheres, sizes, priorities, onSelect }) => {
	console.log(spheres);
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
				<Col md={10} className="offset-md-1 ">
					<div className="mb-4">
						<h5>Сфера</h5>
						<hr />
						<ul>
							{spheres.map((sphere) => (
								<li style={{ listStyle: "none" }}>
									<button
										className="text-light"
										value={sphere._id}
										onClick={(e) => handleClick(e)}
										name="sphere"
									>
										{sphere.name}
									</button>
								</li>
							))}
						</ul>
					</div>
					<div className="mb-4">
						<h5>Размер</h5>
						<hr />
						<ul>
							{sizes.map((size) => (
								<li style={{ listStyle: "none" }}>
									<button
										className="text-light"
										value={size._id}
										onClick={(e) => handleClick(e)}
										name="size"
									>
										{size.name}
									</button>
								</li>
							))}
						</ul>
					</div>

					<div className="mb-4">
						<h5>Приоритет</h5>
						<hr />
						<ul>
							{priorities.map((priority) => (
								<li style={{ listStyle: "none" }}>
									<button
										className="text-light"
										value={priority._id}
										onClick={(e) => handleClick(e)}
										name="priority"
									>
										{priority.name}
									</button>
								</li>
							))}
						</ul>
					</div>
					<Button className="w-100" onClick={(e) => handleClick(e)}>
						Сбросить фильтр
					</Button>
				</Col>
			</Row>
		</Container>
	);
};

export default Filters;
