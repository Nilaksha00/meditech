import React, { Component } from "react";
import { Link } from "react-router-dom";
import back from "../Images/back.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "./axios";
import dateFormat from "dateformat";

const Med = (props) => {
	return (
		<tr key={props.medicine.id} className="view-invoice-med">
			<td><p>{props.medicine.med_name}</p></td>{" "}
			<td></td>
			<td><p>{props.medicine.quantity}</p></td>
			<td><p>{props.medicine.total}</p></td>
		</tr>
	);
};

export default class Delete_Invoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iid: "",
			isDeleted: 0,
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

	deleteInvoice = (e) => {
		e.preventDefault();
		const id = this.props.match.params.id;

		axios
			.delete("/invoice/" + id)
			.then((response) => {
				axios
					.delete("/invoice/med/" + id)
					.then((response) => {
						console.log(response.data);
					})
					.catch(function (error) {
						console.log(error);
					});
			})
			.catch(function (error) {
				console.log(error);
			});
		this.setState({ isDeleted: 1 });
	};

	render() {
		if (this.state.isDeleted === 1) {
			toast.success("Invoice deleted successfully");
			setTimeout(() => {
				this.props.history.push("/pharmacist/invoices");
			}, 2000);
		}
		return (
			<div className="delete-invoice-container">
				<ToastContainer
					position="top-center"
					autoClose={4000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					limit={1}
					pauseOnHover
				/>
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
						<p className="view-invoice-details-title">Amount</p>
						<p className="view-invoice-details-id">{this.state.amount}</p>
					</div>
				</div>

				<div class="flex-container-med-details-delete">
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
				<button className="invoice-delete-button" onClick={this.deleteInvoice}>
					delete
				</button>
			</div>
		);
	}
}
