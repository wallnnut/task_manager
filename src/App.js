import { Route, Switch } from "react-router-dom";
import "./App.css";
import { ModalProvider } from "./app/hooks/useModal";
import TaskProvider from "./app/hooks/useTask";
import AllProjects from "./app/layouts/allProjects";
import Main from "./app/layouts/Main";
import RegisterLogin from "./app/layouts/RegisterLogin";
import NavBar from "./app/NavBar";
function App() {
	return (
		<div className="app">
			<ModalProvider>
				<NavBar />
				<TaskProvider>
					<Switch>
						<Route exact path="/" component={Main} />
						<Route exact path="/login" component={RegisterLogin} />
						<Route exact path="/projects" component={AllProjects} />
					</Switch>
				</TaskProvider>
			</ModalProvider>
		</div>
	);
}

export default App;
