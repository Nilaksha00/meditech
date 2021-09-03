
import React,{useState} from 'react'
import { Link } from "react-router-dom";
import {orderData} from '../data'

function OrdersList() {   
    return (       
        <table>    
            <thead>
             <tr>
                <th className="id">order ID</th>
                 <th className="nic">NIC</th>
                 <th className="res">response</th>
                 <th className="stat">status</th>
                 <th className="action">actions</th>
             </tr>
             </thead><div className="table-container"> 
            {orderData.map(orderData => {  
                       
            return (  
                <div>
                <tr>
                <Link to="/home" style={{ textDecoration: "none" }}>
                <td>{orderData.orderID}</td>
                <td> {orderData.NIC}</td>
                <>
                    {orderData.response === "Accepted" && (
                            <td><div className="circle" style={{ backgroundColor: "#92EF00" }}/></td>
                    )} 
                    {orderData.response === "Denied" && (
                            <td><div className="circle" style={{ backgroundColor: "#FA1809" }}/></td>
                    )} 
                    {orderData.response === "Waiting" && (
                            <td><div className="circle" style={{ backgroundColor: "#0464FC" }}/></td>
                    )} 
                </> </Link>              
                <>              
                    {orderData.status === "processing" && (
                            <td><div className="status-container" style={{ backgroundColor: "#92EF00" }}>{orderData.status}
                            </div></td>
                    )} 
                    {orderData.status === "unavailable" && (
                            <td><div className="status-container" style={{ backgroundColor: "#FA1809" }}>{orderData.status}</div></td>
                    )} 
                    {orderData.status === "pending" && (
                            <td>
                                <select className="status-dropdown" style={{ backgroundColor: "#F5FA09" }} >  
                                <option eventKey="pending">pending</option>
                                <option eventKey="unavailable">unavailable</option>
                                </select></td>
                    )} 
                </>
                <td style={{ display:'flex' }}>
                <Link to="/invoice" style={{ textDecoration: "none" }}><button className="order-button">view</button></Link>
                <Link to="/home" style={{ textDecoration: "none" }}><button className="order-button">proceed</button></Link></td>
                </tr></div>
            
            )
  })}</div></table>)}

  export default OrdersList;

