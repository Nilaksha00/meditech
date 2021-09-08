import React from 'react'
import { Link } from "react-router-dom";
import back from "../Images/back.png"
import pre from "../Images/sample_prescription.jpg"

function View_Order (){
    return (
        <div style={{height: "950px"}}>
            <div className="pre-main-container">
                <input type="image" src={back} className="back-icon" alt="meditech-back-icon"/>                           
                <p className="create-invoice-title">Prescription</p>
                <div className="invoice-details-container1">
                    <p className="invoice-details-title">Order ID</p>  
                    <p className="invoice-details-id">{Math.floor(Math.random() * 10000)}</p>     
                </div>
                <div className="invoice-details-container2">
                    <p className="invoice-details-title">NIC</p> 
                    <p className="invoice-details-id">{Math.floor(Math.random() * 10000)}</p>  
                </div>

                <p className="invoice-medicine-form-title">description</p>
                <textarea className="order-view-desc" value="hey guys " readonly/>

                <div className="prescription-image-container"><img className="prescription-image" src={pre} alt="sample prescription"/></div>
            
                <Link to="/create-invoice" ><button className="pre-submit-button">create invoice</button></Link>
            </div>
        </div>
    )
}

export default View_Order
