import React, { useState } from "react";
import { useSelector } from "react-redux";
import PriorityMatrix from "../components/priorityMatrix";
import { getPriorities } from "../store/slices/priority";
import { getTaskList } from "../store/slices/tasks";
import TasksList from "../components/tasksList/tasksList";
import ModalWindow from "../components/ModalWindow";
import Filters from "../components/filters";
import useModal from "../hooks/useModal";
import { Button } from "react-bootstrap";
import { getSpheres } from "../store/slices/categorySphere";
import { getSizes } from "../store/slices/categorySize";

const Analytics = () => {
	const tasks = useSelector(getTaskList());
	const priorities = useSelector(getPriorities());
	const spheres = useSelector(getSpheres());
	const sizes = useSelector(getSizes());
	const { filterModal, setFilterModal } = useModal();
	const [filter, setFilter] = useState({});

	const onSelect = (choosenCategory) => {
		setFilter(choosenCategory);
	};

	const filterTasks = (tasksList) => {
		const filteredTasks = filter.sphere
			? tasksList.filter((task) => task.category_sphere === filter.sphere)
			: filter.size
			? tasksList.filter((task) => task.category_size === filter.size)
			: filter.priority
			? tasksList.filter((task) => task.priority === filter.priority)
			: tasksList;
		return filteredTasks;
	};

	const filteredTasks = filterTasks(tasks);

	return (
		<>
			<div>
				<ModalWindow
					modalHeader="Фильтры"
					modalBody={
						<Filters
							spheres={spheres}
							sizes={sizes}
							priorities={priorities}
							onSelect={onSelect}
						/>
					}
					// modalButton="Установить"
					show={filterModal}
					handleClose={() =>
						setFilterModal((prevState) => !prevState)
					}
				/>
				<div className="d-flex flex-column align-items-end">
					<Button
						onClick={() =>
							setFilterModal((prevState) => !prevState)
						}
					>
						Фильтры
					</Button>
					<TasksList
						tasks={filteredTasks}
						listForAllProjects={false}
					/>
				</div>
				<PriorityMatrix tasks={tasks} priority={priorities} />

				<div
					style={{
						width: "300px",
						height: "300px",
						margin: "0 auto",
					}}
				></div>
			</div>

			<p>Сколько лягушек съедено возможно в граффике</p>
			<p>Сколько всего выполнено задач за все время в граффике</p>
			<p>Прожито дней в граффике</p>
		</>
	);
};

export default Analytics;

{
	/* <Container className="mt-5">
			<Row>
				<Col>
					<Card className="mb-2">
						<Card.Header>Header</Card.Header>
						<Card.Body>
							<Card.Title>Card Title </Card.Title>
							<Card.Text>
								Some quick example text to build on the card
								title and make up the bulk of the card's
								content.
							</Card.Text>
						</Card.Body>
						<Card.Footer>Вcего задач</Card.Footer>
					</Card>
				</Col> */
}
// 				<Col>
// 					<Card className="mb-2">
// 						<Card.Header>Header</Card.Header>
// 						<Card.Body>
// 							<Card.Title>Card Title </Card.Title>
// 							<Card.Text>
// 								Some quick example text to build on the card
// 								title and make up the bulk of the card's
// 								content.
// 							</Card.Text>
// 						</Card.Body>
// 					</Card>
// 				</Col>
// 			</Row>
// 			<Row>
// 				<Col>
// 					<Card className="mb-2">
// 						<Card.Header>Header</Card.Header>
// 						<Card.Body>
// 							<Card.Title>Card Title </Card.Title>
// 							<Card.Text>
// 								Some quick example text to build on the card
// 								title and make up the bulk of the card's
// 								content.
// 							</Card.Text>
// 						</Card.Body>
// 					</Card>
// 				</Col>
// 				<Col>
// 					<Card className="mb-2">
// 						<Card.Header>Header</Card.Header>
// 						<Card.Body>
// 							<Card.Title>Card Title </Card.Title>
// 							<Card.Text>
// 								Some quick example text to build on the card
// 								title and make up the bulk of the card's
// 								content.
// 							</Card.Text>
// 						</Card.Body>
// 					</Card>
// 				</Col>
// 			</Row>
// 		</Container>
