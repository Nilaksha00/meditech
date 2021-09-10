import "./App.css";
import MainContainer from "./Components/mainContainer";
import order from "./Components/Order";
import home from "./Components/Home";
import stock from "./Components/Stock";
import invoice from "./Components/Invoice";
import history from "./Components/History";
import Create_Invoice from "./Components/Create_Invoice";
import vieworder from './Components/View_Order';
import viewinvoice from './Components/View_Invoice';
import deleteinvoice from './Components/Delete_Invoice';
import updateinvoice from './Components/Update_Invoice';  
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>									
					<Route exact path ='/' component={home}/>
					<Route path ='/home' component={home}/>
					<Route path='/order' component={order} />
					<Route path='/stock' component={stock} />				
					<Route path='/invoice' component={invoice} />					
					<Route path='/history' component={history} />
					<Route path='/leaves' component={MainContainer} />
					<Route path='/salary' component={MainContainer} />
					<Route path='/create-invoice:id' component={Create_Invoice} />
					<Route path='/view-order:id' component={vieworder} />
					<Route path='/view-invoice:id' component={viewinvoice} />
					<Route path='/delete-invoice:id' component={deleteinvoice} />
					<Route path='/update-invoice/:id' component={updateinvoice} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
