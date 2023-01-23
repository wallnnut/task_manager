import React, { useContext, useState } from "react";

export const ModalContext = React.createContext();

export const useModal = () => {
	return useContext(ModalContext);
};

export const ModalProvider = ({ children }) => {
	const [createTaskModal, setCreateTaskModal] = useState(false);
	const [timerModal, setTimerModal] = useState(false);
	const [filterModal, setFilterModal] = useState(false);

	return (
		<ModalContext.Provider
			value={{
				timerModal,
				setTimerModal,
				createTaskModal,
				setCreateTaskModal,
				filterModal,
				setFilterModal,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default useModal;
