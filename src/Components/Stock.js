import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import user from "../Images/user.png";
import Sidebar from "./sideBar";
import logout from "../Images/logout.png";
import SearchBar from "./SearchBar";
import axios from "./axios";

const Stocks = (props) => {
	return (
		<tr>
			<td>{props.stock.id}</td>
			<td> {props.stock.med_name}</td>
			<td> {props.stock.bio_name}</td>
			<td>{props.stock.quantity}</td>
			<td> {props.stock.selling_price}</td>
		</tr>
	);
};

export default class Stock extends Component {
	constructor(props) {
		super(props);
		this.state = { stock: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:3083/stock/")
			.then((response) => {
				this.setState({ stock: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	stockList() {
		return this.state.stock.map(function (currentStock, i) {
			return <Stocks stock={currentStock} key={i} />;
		});
	}


					render() {
		return (
			<div className="MainContainer">
				<div className="containermini">
					<img src={logo} className="logo" alt="meditech-logo" />
					<Link to="/pharmacist/home">
						<img src={user} className="user" alt="meditech-user-profile-icon" />
					</Link>
					<Sidebar />
					<img src={logout} className="logout" alt="logout-icon" />
				</div>
				<div className="content-container">
					<p className="page-title">Stock</p>
					<SearchBar />
					<table className="stock-table-head">
						<thead>
							<tr>
								<th className="stock-table-head1">Stock ID</th>
								<th className="stock-table-head2">Bio name</th>
								<th className="stock-table-head3">Medicine name</th>
								<th className="stock-table-head4">Quantity</th>
								<th className="stock-table-head5">Unit price</th>
							</tr>
						</thead>
						</table>
					<div className="stock-table-content">{this.stockList()}</div>
				</div>
			</div>
		);
	}
}
