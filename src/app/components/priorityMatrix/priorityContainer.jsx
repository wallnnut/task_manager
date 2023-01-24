import React from "react";
import Card from "react-bootstrap/Card";

const PriorityContainer = ({ header, list, bg }) => {
	const tasksLength = list.length;
	return (
		<Card className="mb-2" style={{ height: "300px" }}>
			<Card.Header className={`bg-${bg}`}>{header}</Card.Header>
			<Card.Body>
				<ul>
					{list.map((task) => (
						<li key={task._id}>{task.title}</li>
					))}
				</ul>
			</Card.Body>
			<Card.Footer>Всего задач - {tasksLength}</Card.Footer>
		</Card>
	);
};

export default PriorityContainer;
