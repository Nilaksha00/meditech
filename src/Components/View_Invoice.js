import React, { Component } from "react";
import { Link } from "react-router-dom";
import back from "../Images/back.png";
import axios from "./axios";
import dateFormat from "dateformat";

const Med = (props) => {
	return (
		// <div class="view-invoice-med" key={props.medicine.id}>
		//     <div><p>{props.medicine.med_name}</p></div><div/>
		//     <div><p>{props.medicine.quantity}</p></div>
		//     <div><p>{props.medicine.total}</p></div>
		// </div>
		<tr key={props.medicine.id} className="view-invoice-med">
			<td>
				<p>{props.medicine.med_name}</p>
			</td>{" "}
			<td></td>
			<td>
				<p>{props.medicine.quantity}</p>
			</td>
			<td>
				<p>{props.medicine.total}</p>
			</td>
		</tr>
	);
};

export default class View_Invoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iid: "",
			oid: "",
			date: "",
			amount: "",
			med: [],
		};
	}

	componentDidMount() {
		const id = this.props.match.params.id;
		axios
			.get("http://localhost:3083/invoice/" + id)
			.then((response) => {
				this.setState({
					iid: response.data.id,
					oid: response.data.order_id,
					date: dateFormat(response.data.createdAt, "dd-mm-yyyy"),
					amount: response.data.amount,
					med: [],
				});
			})
			.catch(function (error) {
				console.log(error);
			});

		axios
			.get("http://localhost:3083/invoice/med/" + id)
			.then((response) => {
				this.setState({ med: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	medList() {
		return this.state.med.map(function (currentMed, i) {
			return <Med medicine={currentMed} key={i} />;
		});
	}

	render() {
		return (
			<div className="MainContainer">
				<Link to="/pharmacist/invoices">
					<input
						type="image"
						src={back}
						className="back-icon"
						alt="meditech-back-icon"
					/>
				</Link>
				<p className="create-invoice-title">Invoice</p>

				<div
					class="flex-container-invoice-details"
					style={{ marginTop: "20px" }}
				>
					<div>
						<p className="view-invoice-details-title">Order ID</p>
						<p className="view-invoice-details-id">{this.state.oid}</p>
					</div>
					<div>
						<p className="view-invoice-details-title">Invoice ID</p>
						<p className="view-invoice-details-id">{this.state.iid}</p>
					</div>
				</div>
				<div class="flex-container-invoice-details">
					<div>
						<p className="view-invoice-details-title">Date</p>
						<p className="view-invoice-details-id">{this.state.date}</p>
					</div>
					<div>
						<p className="view-invoice-details-title">amount</p>
						<p className="view-invoice-details-id">{this.state.amount}</p>
					</div>
				</div>
				<div class="flex-container-view-med-details">
					<div class="view-invoice-med-details">
						<div>
							<p>Medicine</p>
						</div>
						<div />
						<div>
							<p>Quantity</p>
						</div>
						<div>
							<p>Total</p>
						</div>
					</div>
					{this.medList()}
				</div>
			</div>
		);
	}
}
