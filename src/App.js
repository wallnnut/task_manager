import { Route, Switch } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ModalProvider } from "./app/hooks/useModal";
import AllProjects from "./app/layouts/allProjects";
import Main from "./app/layouts/Main";
import RegisterLogin from "./app/layouts/RegisterLogin";
import Analytics from "./app/layouts/analytics";
import LogOut from "./app/components/logOut";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./app/components/protectedRoute";
import EditUserPage from "./app/components/editUserPage";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./app/components/navBar/NavBar";
import Loader from "./app/components/hoc/Loader";

function App() {
	return (
		<div className="app">
			<Loader>
				<ModalProvider>
					<NavBar />
					<Switch>
						<Route exact path="/" component={Main} />
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
							component={EditUserPage}
						/>

						<Route path="/logout" component={LogOut} exact />
					</Switch>
				</ModalProvider>
			</Loader>
			<ToastContainer theme="dark" />
		</div>
	);
}

export default App;
