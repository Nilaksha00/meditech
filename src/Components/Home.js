import React, {useState} from 'react'
import logo from "../Images/logo.png";
import user from "../Images/user.png";
import Sidebar from "./sideBar";
import logout from "../Images/logout.png";
import medicine from "../Images/welcome_image.png";

function Home() {
    const [empName] = useState("Nilaksha");
    const [orderCount] = useState("08");

    return (
    <div className='MainContainer'>
    <div className='containermini'>
        <img src={logo} className='logo' alt="meditech-logo" />
        <img src={user} className='user' alt="meditech-user-profile-icon"/>
        <Sidebar />
        <img src={logout} className='logout' alt="logout-icon" />       
    </div>
     <div className='welcomeMessageContainer'>
        <img src={medicine} className='welcome-med' alt="meditech-welcome-message-image"/> 
        <p className="welcome-name">Hello {empName}</p> 
        <p className="welcome-desc">may every step you make be filled with happiness</p>   
     </div>
     <div className="calender-container"></div>
     <div className="order-count-container">
     <p className="order-count-title">Orders</p>
     <p className="order-count">{orderCount}</p>          
     </div>
</div>
       
    )
}

export default Home
