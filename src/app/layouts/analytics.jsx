import React from "react";
import { useSelector } from "react-redux";
import PriorityMatrix from "../components/priorityMatrix";
import { getPriorities } from "../store/slices/priority";
import { getTaskList } from "../store/slices/tasks";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
	labels: ['Лягушек съедено', "Лягушек всего"],
	datasets: [
	  {
		data: [12, 19,],
		backgroundColor: [
		  'rgba(255, 99, 132, 0.2)',
		  'rgba(54, 162, 235, 0.2)',
		  
		],
		borderColor: [
		  'rgba(255, 99, 132, 1)',
		  'rgba(54, 162, 235, 1)',
		  
		],
		borderWidth: 1,
	  },
	],
  };

const Analytics = () => {
	const tasks = useSelector(getTaskList())
	const priorities = useSelector(getPriorities())

	return (
	<>
	<div>
	
	<PriorityMatrix tasks={tasks} priority={priorities}/>
	<div style={{width: "300px", height: "300px", margin: "0 auto"}}>
<Doughnut data={data} />
	</div>
	</div>
	
	<p>Сколько лягушек съедено возможно в граффике</p>
	<p>Сколько всего выполнено задач за все время в граффике</p>
	<p>Прожито дней в граффике</p>
	<p>Список задач с пагницией с отображением сфокусированного времени</p></>)
};

export default Analytics;


{/* <Container className="mt-5">
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
				</Col> */}
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