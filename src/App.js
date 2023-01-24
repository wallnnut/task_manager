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
import { loadCategorySizes } from "./app/store/slices/categorySize";
import { loadCategorySphere } from "./app/store/slices/categorySphere";
import { loadPriorities } from "./app/store/slices/priority";
import Analytics from "./app/layouts/analytics";
import { receiveUserData } from "./app/store/slices/user";
import LogOut from "./app/components/logOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./app/components/protectedRoute";
import EditUserPage from "./app/components/editUserPage";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./app/components/navBar/NavBar";
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
					<ProtectedRoute
						exact
						path="/projects/:taskId?"
						component={AllProjects}
					/>
					<ProtectedRoute
						exact
						path="/analytics"
						component={Analytics}
					/>
					<ProtectedRoute
						exact
						path="/users/:userId?"
						component={EditUserPage}
					/>
					{/* <Route
						exact
						path="/edit/:taskId"
						component={EditTaskPage}
					/> */}
					<Route path="/logout" component={LogOut} exact />
				</Switch>
			</ModalProvider>
			<ToastContainer theme="dark" />
		</div>
	);
}

export default App;
