import React, { Component } from "react";
import { Link } from "react-router-dom";
import back from "../Images/back.png";
import add from "../Images/add_icon.png";
import UpdateInvoiceMed from "./updateInvoiceMed";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "./axios";

export default class UpdateInvoice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			iid: "",
			oid: "",
			amount: "",
			id: "",
			name: "",
			qty: "",
			price: "",
			isUpdated: 0,
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
					amount: response.data.amount,
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

	//handles changes in text fields
	handleChangeName = (e) => {
		this.setState({
			name: e.target.value,
		});
	};

	handleChangeQty = (e) => {
		this.setState({
			qty: e.target.value,
		});
	};

	handleChangePrice = (e) => {
		this.setState({
			price: e.target.value,
		});
	};

	//handles new medicines items
	handleAdd = (e) => {
		e.preventDefault();

		this.setState({});
		const medItem = {
			id: 0,
			invoiceID: this.state.iid,
			med_name: this.state.name,
			quantity: this.state.qty,
			total: this.state.qty * this.state.price,
		};

		axios
			.post("/invoice/med", medItem)
			.then((res) => console.log(res.data))
			.catch(function (error) {
				console.log(error);
			});

		const items = this.state.med;

		this.setState({
			med: [...items, medItem],
			id: "",
			name: "",
			qty: "",
			price: "",
		});
	};

	handleSubmitUpdate = (e) => {
		e.preventDefault();

		const invoice = {
			invoiceID: this.state.iid,
			total: this.medTot(),
		};

		axios
			.patch("/invoice/", invoice)
			.then((res) => console.log(res.data))
			.catch(function (error) {
				console.log(error);
			});

			this.setState({ isUpdated: 1 });
	};

	medList() {
		return this.state.med.map(function (currentMed, i) {
			return <UpdateInvoiceMed medicine={currentMed} key={i} />;
		});
	}

	medTot() {
		let tot = 0;
		this.state.med.map(function (currentMed, i) {
			tot = tot + currentMed.total;
		});
		return tot;
	}

	render() {
		if (this.state.isUpdated === 1) {
			toast.success("Invoice updated successfully");
			setTimeout(() => {
				this.props.history.push("/pharmacist/invoices");
			}, 2000);
		}
		return (
			<div style={{ height: "950px" }}>
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
				<div className="invoice-main-container">
					<Link to="/pharmacist/invoices">
						<input
							type="image"
							src={back}
							className="back-icon"
							alt="meditech-back-icon"
						/>
					</Link>
					<p className="create-invoice-title">Update Invoice</p>

					<div className="invoice-details-container1">
						<p className="invoice-details-title">Order ID</p>
						<p className="invoice-details-id">{this.state.oid}</p>
					</div>

					<div className="invoice-details-container2">
						<p className="invoice-details-title">Invoice ID</p>
						<p className="invoice-details-id">{this.state.iid}</p>
					</div>

					<div className="invoice-details-container3">
						<p className="invoice-details-title">Amount</p>
						<p className="invoice-details-id">{this.medTot()} </p>
					</div>

					<p className="invoice-medicine-form-title">Medicine</p>
					<p className="invoice-quantity-form-title">Quantity</p>
					<p className="invoice-price-form-title">Price</p>

					<form>
						<input
							type="text"
							className="invoice-medicine-form"
							value={this.state.name}
							name="medName"
							onChange={this.handleChangeName}
						/>
						<input
							type="number"
							className="invoice-quantity-form"
							value={this.state.qty}
							name="medQty"
							onChange={this.handleChangeQty}
						/>
						<input
							type="number"
							className="invoice-price-form"
							value={this.state.price}
							name="medPrice"
							onChange={this.handleChangePrice}
						/>

						<input
							type="image"
							src={add}
							className="add-icon"
							alt="meditech-add-icon"
							onClick={this.handleAdd}
						/>
					</form>
					<div className="invoice-medicine-list-container">
						<div className="invoice-medicine-list-scroll">{this.medList()}</div>
					</div>

					<button
						className="invoice-submit-button"
						onClick={this.handleSubmitUpdate}
					>
						update
					</button>
				</div>
			</div>
		);
	}
}
