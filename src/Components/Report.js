import React, { Component } from "react";
import axios from "./axios";
import dateFormat from "dateformat";
import ReactToPrint from "react-to-print";

const theadStyle = {
	fontFamily: "poppins",
	fontWeight: "bold",
	fontStyle: "normal",
};

const thStyle = {
	paddingLeft: "50px",
	paddingTop: "30px",
};

const heading = {
	left: "auto",
	paddingTop: "40px",
	paddingLeft: "50px",
	fontFamily: "Poppins",
	fontStyle: "normal",
	fontWeight: "500",
	fontSize: "37px",
	textAlign: "left",
	color: "#125465",
};

const trStyle = {
	fontFamily: "poppins",
	fontWeight: "normal",
	fontStyle: "normal",
};

const tdStyle = {
	paddingLeft: "50px",
	paddingTop: "10px",
};

const button = {
	left: "100px",
	width: "160px",
	padding: "8px",
	fontFamily: "Poppins",
	fontStyle: "normal",
	fontWeight: "500",
	fontSize: "17px",
	textAlign: "center",
	color: "white",
	backgroundColor: "#054fc7",
	border: "none",
	borderRadius: "12px",
};

const body = {
	backgroundColor: "white",
	width: "100vw",
	height: "100vh",
	paddingLeft: "40px",
	paddingTop:"40px"
};

const Invoice = (props) => {
	return (
		<tr key={props.inv.id} style={trStyle}>
			<td style={tdStyle}>{props.inv.id}</td>
			<td style={tdStyle}> {props.inv.NIC}</td>
			<td style={tdStyle}> {props.inv.amount}</td>
			<td style={tdStyle}> {dateFormat(props.inv.createdAt, "dd.mm.yyyy")}</td>
		</tr>
	);
};

class Example extends Component {
	constructor(props) {
		super(props);
		this.state = { invoice: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:3083/invoice/")
			.then((response) => {
				this.setState({ invoice: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	invoiceList() {
		return this.state.invoice.map(function (currentInvoice, i) {
			return <Invoice inv={currentInvoice} key={i} />;
		});
	}

	render() {
		return (
			<div>
				<p style={heading}>Invoice Report - Meditech</p>
				<table>
					<thead style={theadStyle}>
						<th style={thStyle}>Invoice ID</th>
						<th style={thStyle}>NIC</th>
						<th style={thStyle}>Amount(Rs.)</th>
						<th style={thStyle}>Date</th>
					</thead>
					<tbody>{this.invoiceList()}</tbody>
				</table>
			</div>
		);
	}
}

class Report extends Component {
	render() {
		return (
			<div style={body}>
				<ReactToPrint
					trigger={() => <button style={button}>Print</button>}
					content={() => this.componentRef}
				/>
				<Example ref={(el) => (this.componentRef = el)} />
			</div>
		);
	}
}

export default Report;
