import React, { useState } from "react";
import { useSelector } from "react-redux";
import { getPriorities } from "../store/slices/priority";
import { getTaskList } from "../store/slices/tasks";
import TasksList from "../components/tasksList/tasksList";
import ModalWindow from "../components/ModalWindow";
import useModal from "../hooks/useModal";
import { Button } from "react-bootstrap";
import { getSpheres } from "../store/slices/categorySphere";
import { getSizes } from "../store/slices/categorySize";
import Filters from "../components/tasksList/filters";
import PriorityMatrix from "../components/priorityMatrix/priorityMatrix";
import DataLoader from "../components/hoc/dataLoader";
import CompletedTasks from "../components/taskCompleted";

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
			<DataLoader>
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
						show={filterModal}
						handleClose={() =>
							setFilterModal((prevState) => !prevState)
						}
					/>
					<div className="d-flex flex-column align-items-end mt-5">
						<Button
							className="mx-5 d-flex align-items-center bg-info"
							onClick={() =>
								setFilterModal((prevState) => !prevState)
							}
							variant="dark"
						>
							<span className="mx-3">Фильтры</span>
							<i className="fs-4 bi bi-filter"></i>
						</Button>
						<TasksList
							tasks={filteredTasks}
							listForAllProjects={false}
						/>
					</div>
					<PriorityMatrix tasks={tasks} priority={priorities} />

					<div
						style={{
							height: "300px",
							margin: "0 auto",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							marginTop: "20px",
							padding: "10px",
						}}
					>
						<h3>Статистика выполнения задач</h3>
						<CompletedTasks />
					</div>
				</div>
			</DataLoader>

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
