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
import update from './Components/updateInvoice'; 
import report from './Components/Report';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
	return (
		<Router>
			<div className='App'>
				<Switch>									
					<Route exact path ='/' component={home}/>
					<Route path ='/pharmacist/home' component={home}/>
					<Route path='/pharmacist/orders' component={order} />
					<Route path='/pharmacist/stock' component={stock} />				
					<Route path='/pharmacist/invoices' component={invoice} />					
					<Route path='/pharmacist/history' component={history} />
					<Route path='/pharmacist/leaves' component={MainContainer} />
					<Route path='/pharmacist/salary' component={MainContainer} />
					<Route path='/pharmacist/invoice/create/:id' component={Create_Invoice} />
					<Route path='/pharmacist/order/:id' component={vieworder} />
					<Route path='/pharmacist/invoice/view/:id' component={viewinvoice} />
					<Route path='/pharmacist/invoice/delete/:id' component={deleteinvoice} />
					<Route path='/pharmacist/invoice/update/:id' component={update} />
					<Route path='/pharmacist/report' component={report} />
				</Switch>
			</div>
		</Router>
	);
}

export default App;
