import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalWindow = ({
	show,
	handleClose,
	modalHeader,
	modalBody,
	modalButton,
}) => {
	return (
		<Modal
			centered
			size="sm"
			aria-labelledby="contained-modal-title-vcenter"
			show={show}
			onHide={handleClose}
		>
			<Modal.Header className=" bg-dark" closeButton="light">
				<Modal.Title className="text-light">{modalHeader}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{modalBody}</Modal.Body>
		</Modal>
	);
};

export default ModalWindow;
