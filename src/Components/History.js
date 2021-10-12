import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import user from "../Images/user.png";
import Sidebar from "./sideBar";
import SearchBar from "./SearchBar";
import logout from "../Images/logout.png";
import axios from "./axios";
import dateFormat from "dateformat";

const OrderHistory = (props) => {
	return (
		<tr className="history-table-content">
			<td>{props.history.id}</td>
			<td>{props.history.id}</td>
			<td> {props.history.NIC}</td>
			<td>{dateFormat(props.history.createdAt, "dd.mm.yyyy")}</td>
		</tr>
	);
};

export default class History extends Component {
	constructor(props) {
		super(props);
		this.state = { history: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:3083/order/")
			.then((response) => {
				this.setState({ history: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	historyList() {
		return this.state.history.map(function (currentOrder, i) {
			if (currentOrder.ph_status == "processing")
				return <OrderHistory history={currentOrder} key={i} />;
		});
	}

	render() {
		return (
			<div className="MainContainer">
				<div className="containermini">
					<img src={logo} className="logo" alt="meditech-logo" />
					<Link to="pharmacist/home">
						<img src={user} className="user" alt="meditech-user-profile-icon" />
					</Link>
					<Sidebar />
					<img src={logout} className="logout" alt="logout-icon" />
				</div>
				<div className="content-container">
					<p className="page-title">History</p>
					
					<SearchBar/>
					<table className="history-table-head">
						<thead>
							<tr>
								<th>Order ID</th>
								<th>Invoice ID</th>
								<th>NIC</th>
								<th>Date</th>
							</tr>
						</thead>
					</table>
					<div className="history-table-content">{this.historyList()}</div>
				</div>
			</div>
		);
	}
}
