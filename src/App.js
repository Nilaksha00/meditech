import "./App.css";
import MainContainer from "./Components/mainContainer";
import order from "./Components/order";
import home from "./Components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>					
					<Route exact path ='/' component={home}/>
					<Route path ='/home' component={home}/>
					<Route path='/order' component={order} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
