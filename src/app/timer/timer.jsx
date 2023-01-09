import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CountDown = ({ hours, minutes, seconds, setTimer }) => {
	const [paused, setPaused] = useState(true);
	const [over, setOver] = useState(false);
	const [[h, m, s], setTime] = useState([hours, minutes, seconds]);
	const tick = () => {
		if (paused || over) return;

		if (h === 0 && m === 0 && s === 0) {
			setOver(true);
		} else if (m === 0 && s === 0) {
			setTime([h - 1, 59, 59]);
		} else if (s === 0) {
			setTime([h, m - 1, 59]);
		} else {
			setTime([h, m, s - 1]);
		}
	};
	useEffect(() => {
		setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
	}, [hours, minutes, seconds]);
	const reset = () => {
		setTime([0, 0, 0]);
		setOver(false);
		setPaused(true);
	};
	over && reset();

	useEffect(() => {
		const timerID = setInterval(() => tick(), 1000);
		return () => clearInterval(timerID);
	});
	const totalSeconds =
		parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
	const secondsLeft = [h, m, s].reduce((acc, value, index) => {
		if (index === 0) {
			return acc + value * 3600;
		}
		if (index === 1) {
			return acc + value * 60;
		}
		return acc + value;
	}, 0);

	const percentage = Math.round((secondsLeft / totalSeconds) * 100);
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

			{/* <p className="fs-2">{`${h.toString().padStart(2, "0")}:${m
				.toString()
				.padStart(2, "0")}:${s.toString().padStart(2, "0")}`}</p> */}
			<div className="mt-4">
				<Button
					variant="dark"
					className="me-2"
					onClick={() => setTimer(true)}
				>
					<i className="bi bi-alarm fs-4"></i>
				</Button>
				<Button
					variant="dark"
					className="me-2"
					onClick={() => setPaused(!paused)}
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
		</div>
	);
};

export default CountDown;
