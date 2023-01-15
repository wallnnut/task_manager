import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const Analytics = () => {
	return (
		<Container className="mt-5">
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
						<Card.Footer>ВСего задач</Card.Footer>
					</Card>
				</Col>
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
					</Card>
				</Col>
			</Row>
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
					</Card>
				</Col>
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
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Analytics;
