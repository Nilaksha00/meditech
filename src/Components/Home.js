import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../Images/logo.png";
import user from "../Images/user.png";
import Sidebar from "./sideBar";
import logout from "../Images/logout.png";
import medicine from "../Images/welcome_image.png";
import ellipse from "../Images/ellipse.png"
import  Calendar from 'react-calendar';
import "../calendar.css"

class Home extends Component{
    state = {
        dashboard: []
      }
    
    componentDidMount() {
        axios.get("https://jsonplaceholder.typicode.com/users?id=2")
          .then(res => {
            const dashboard = res.data;
            this.setState({ dashboard });
          })
    }
    
    render(){ 
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
                <div className='welcomeMessageContainer'>
                    <img src={medicine} className='welcome-med' alt="meditech-welcome-message-image"/>        
                    <img src={ellipse} className='welcome-med-shadow' alt="meditech-welcome-message-image-shadow"/> 
                    { this.state.dashboard.map(empName => <p className="welcome-name">Hello  {empName.name}</p>)}
                    <p className="welcome-desc">may every step you make be filled with happiness</p>   
                </div>
                <div className="calender-container">
                    <Calendar/>
                </div>
                <div className="order-count-container">
                    <p className="order-count-title">Orders</p>
                    { this.state.dashboard.map(order => <p className="order-count">{order.id}</p>  )}        
                </div>
            </div>           
        )
    }
}

export default Home