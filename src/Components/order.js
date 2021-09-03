import React from "react";
import "../App.css"
import { Link } from "react-router-dom";
import logo from "../Images/logo.png";
import user from "../Images/user.png";
import Sidebar from "./sideBar";
import logout from "../Images/logout.png";
import SearchBar from "./SearchBar"
import OrdersList from "./OrdersList"


function Order() {
	return (
		<div className='MainContainer'>
			<div className='containermini'>
				<img src={logo} className='logo' alt="meditech-logo" />
				<Link to="/home">                 
                    <img src={user} className='user' alt="meditech-user-profile-icon"/>
                </Link>	
				<Sidebar />
				<img src={logout} className='logout' alt="logout-icon" />
			</div>
            <div className="content-container">
                <p className="page-title">Orders</p>
				< SearchBar/>
				<OrdersList/>
            </div>	
		</div>
	);
}

export default Order;


  