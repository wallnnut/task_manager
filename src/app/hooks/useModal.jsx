import React, { useContext, useState } from "react";

export const ModalContext = React.createContext();

export const useModal = () => {
	return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
	const [createTaskModal, setCreateTaskModal] = useState(false);
	const [timerModal, setTimerModal] = useState(false);
	return (
		<ModalContext.Provider
			value={{
				timerModal,
				setTimerModal,
				createTaskModal,
				setCreateTaskModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default useModal;
