import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalProvider } from "./app/hooks/useModal";
import AllProjects from "./app/layouts/allProjects";
import EditTaskPage from "./app/layouts/editTaskPage";
import Main from "./app/layouts/Main";
import RegisterLogin from "./app/layouts/RegisterLogin";
import { loadTaskList } from "./app/store/slices/tasks";
import { nanoid } from "nanoid";
import { loadCategorySizes } from "./app/store/slices/categorySize";
import { loadCategorySphere } from "./app/store/slices/categorySphere";
import { loadPriorities } from "./app/store/slices/priority";
import Analytics from "./app/layouts/analytics";
import NavBar from "./app/components/NavBar";
import { receiveUserData } from "./app/store/slices/user";
import LogOut from "./app/components/logOut";
function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadTaskList());
		dispatch(loadCategorySizes());
		dispatch(loadCategorySphere());
		dispatch(loadPriorities());
		dispatch(receiveUserData());
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
					<Route path="/logout" component={LogOut} exact />

					<Route exact path="/analytics" component={Analytics} />
				</Switch>
			</ModalProvider>
		</div>
	);
}

export default App;
