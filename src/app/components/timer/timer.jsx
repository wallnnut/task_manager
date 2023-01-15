import React from "react";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CountDown = ({
	reset,
	setTimer,
	percentage,
	h,
	m,
	s,
	setPaused,
	paused,
	pushFocusedTime,
}) => {
	return (
		<div className="d-flex  align-items-center flex-column mb-4">
			<div style={{ width: 200, height: 200 }}>
				<CircularProgressbar
					styles={buildStyles({
						pathColor: "rgb(237, 113, 56)",
						textColor: "rgb(235,235,235)",
					})}
					value={percentage}
					text={`${h.toString().padStart(2, "0")}:${m
						.toString()
						.padStart(2, "0")}:${s.toString().padStart(2, "0")}`}
				/>
			</div>

			<div className="mt-4 mb-3">
				<Button
					variant="dark"
					className="me-2"
					onClick={() => setTimer(true)}
				>
					<i className="bi bi-alarm fs-4"></i>
				</Button>
				<Button
					name="pause"
					variant="dark"
					className="me-2"
					onClick={() => setPaused((prevState) => !prevState)}
				>
					{paused ? (
						<i className="bi bi-play fs-4"></i>
					) : (
						<i className="bi bi-pause fs-4"></i>
					)}
				</Button>
				<Button variant="danger" onClick={() => reset()}>
					<i className="bi bi-stop fs-4"></i>
				</Button>
			</div>
			<Button onClick={pushFocusedTime}>
				Закончить работу над задачей
			</Button>
		</div>
	);
};

export default CountDown;
