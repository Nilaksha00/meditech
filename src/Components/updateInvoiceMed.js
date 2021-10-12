import React, { Component } from "react";
import update from "../Images/update_icon.png";
import cancel from "../Images/cancel-icon.png";
import axios from "./axios";

export default class UpdateInvoiceMed extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: props.medicine.id,
			iid: props.medicine.invoiceID,
			name: props.medicine.med_name,
			qty: props.medicine.quantity,
			price: props.medicine.total / props.medicine.quantity,
			isDisabled: false,
		};

		this.handleChangeQty = this.handleChangeQty.bind(this);
		this.handleChangePrice = this.handleChangePrice.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}

	//handles changes in text fields
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

	//handles updated field
	handleUpdate = (e) => {
		e.preventDefault();

		const data = {
			id: this.state.id,
			med_name: this.state.name,
			quantity: this.state.qty,
			total: this.state.qty * this.state.price,
		};

		axios
			.patch("http://localhost:3083/invoice/med/update", data)
			.then((response) => {
				//this.setState({med: response.data})
			})
			.catch(function (error) {
				console.log(error);
			});
		window.location.reload(false);
	};

	//handles deleted records
	handleDelete = (e) => {
		e.preventDefault();

		const data = {
			invoiceID: this.state.iid,
			med_name: this.state.name,
		};
		console.log(data);
		axios
			.delete("invoice/med/", { data: data })
			.then((response) => {
				this.setState({
					isDisabled: true,
				});
			})
			.catch(function (error) {
				console.log(error.response.data);
			});
		window.location.reload(false);
	};

	render() {
		return (
			<div className="update-invoice-form">
				<form>
					<input
						type="text"
						value={this.state.name}
						name="medName"
						disabled={this.state.isDisabled}
						readOnly
					/>
					<input
						type="number"
						value={this.state.qty}
						name="medQty"
						disabled={this.state.isDisabled}
						onChange={this.handleChangeQty}
					/>
					<input
						type="number"
						value={this.state.price}
						name="medPrice"
						disabled={this.state.isDisabled}
						onChange={this.handleChangePrice}
					/>
					<input
						type="image"
						src={update}
						className=""
						disabled={this.state.isDisabled}
						alt="meditech-add-icon"
						onClick={this.handleUpdate}
					/>
					<input
						type="image"
						src={cancel}
						className=""
						disabled={this.state.isDisabled}
						alt="meditech-add-icon"
						onClick={this.handleDelete}
					/>
				</form>
			</div>
		);
	}
}
