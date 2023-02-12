import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AllProjects from "./pages/allProjects";
import Main from "pages/Main";
import RegisterLogin from "./pages/Auth";
import Analytics from "./pages/analytics";
import LogOut from "./components/logOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./hoc/protectedRoute";
import EditUser from "./pages/editUser";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./modules/navBar/NavBar";
import Loader from "./hoc/Loader";

function App() {
	return (
		<div className="app">
			<Loader>
				<NavBar />
				<Switch>
					<ProtectedRoute exact path="/" component={Main} />
					<Route exact path="/login" component={RegisterLogin} />
					<ProtectedRoute
						exact
						path="/projects/:taskId?/:edit?"
						component={AllProjects}
					/>
					<ProtectedRoute
						exact
						path="/analytics"
						component={Analytics}
					/>
					<ProtectedRoute
						exact
						path="/profile"
						component={EditUser}
					/>

					<Route path="/logout" component={LogOut} exact />
				</Switch>
			</Loader>
			<ToastContainer theme="dark" />
		</div>
	);
}

export default App;
