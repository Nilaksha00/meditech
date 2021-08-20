import React from "react";
import logo from "../Images/logo.png";
import user from "../Images/user.png";
import Sidebar from "./sideBar";
import logout from "../Images/logout.png";

function MainContainer() {
	return (
		<div className='MainContainer'>
			<div className='containermini'>
				<img src={logo} className='logo' alt="meditech-logo" />
				<img src={user} className='user' alt="meditech-user-profile-icon"/>
				<Sidebar />
				<img src={logout} className='logout' alt="logout-icon" />
			</div>
		</div>
	);
}

export default MainContainer;
