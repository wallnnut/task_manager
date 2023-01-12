import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "./app/hooks/useModal";
import AllProjects from "./app/layouts/allProjects";
import EditTaskPage from "./app/layouts/editTaskPage";
import Main from "./app/layouts/Main";
import RegisterLogin from "./app/layouts/RegisterLogin";
import NavBar from "./app/NavBar";
import { loadTaskList } from "./app/store/slices/tasks";
import { nanoid } from "nanoid";
import { loadCategorySizes } from "./app/store/slices/categorySize";
import { loadCategorySphere } from "./app/store/slices/categorySphere";
import { loadPriorities } from "./app/store/slices/priority";
function App() {
	console.log(nanoid());
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadTaskList());
		dispatch(loadCategorySizes());
		dispatch(loadCategorySphere());
		dispatch(loadPriorities());
	}, []);
	return (
		<div className="app">
			<ModalProvider>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Main} />
					<Route exact path="/login" component={RegisterLogin} />
					<Route exact path="/projects" component={AllProjects} />
					<Route
						exact
						path="/edit/:taskId"
						component={EditTaskPage}
					/>
				</Switch>
			</ModalProvider>
		</div>
	);
}

export default App;
