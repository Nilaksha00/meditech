import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "./axios";
import logo from "../Images/logo.png";
import user from "../Images/user.png";
import Sidebar from "./sideBar";
import logout from "../Images/logout.png";
import medicine from "../Images/welcome_image.png";
import ellipse from "../Images/ellipse.png";
import Calendar from "react-calendar";
import "../calendar.css";

class Home extends Component {
	state = {
		order: [],
	};

	componentDidMount() {
		axios
			.get("http://localhost:3083/order/")
			.then((response) => {
				this.setState({ order: response.data });
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	orderCount() {
		let count = 0;
		this.state.order.map(function (currentOrder, i) {
			if (currentOrder.ph_status != "processing") {
				count = count + 1;
			}
		});
		return count;
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
				<div className="welcomeMessageContainer">
					<img
						src={medicine}
						className="welcome-med"
						alt="meditech-welcome-message"
					/>
					<img
						src={ellipse}
						className="welcome-med-shadow"
						alt="meditech-welcome-message-shadow"
					/>
					<p className="welcome-name">Hello Nilaksha</p>
					<p className="welcome-desc">
						may every step you make be filled with happiness
					</p>
				</div>
				<div className="calender-container">
					<Calendar />
				</div>
				<div className="order-count-container">
					<p className="order-count-title">Orders</p>
					<p className="order-count">{this.orderCount()}</p>
				</div>
			</div>
		);
	}
}

export default Home;
