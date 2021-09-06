import React, {Component} from "react";
import back from "../Images/back.png"
import InvoiceMedList from "./Create_Invoice_Med_List"

class Create_Invoice extends Component{

    render(){ 
        return (
        <div style={{height: "950px"}}>
            <div className="invoice-main-container">
            <input type="image" src={back} className="back-icon" alt="meditech-back-icon"/>                           
                <p className="create-invoice-title">Create Invoice</p>
                <div className="invoice-details-container1">
                    <p className="invoice-details-title">Order ID</p>       
                </div>
                <div className="invoice-details-container2">
                    <p className="invoice-details-title">Amount</p>       
                </div>

                <p className="invoice-medicine-form-title">Medicine</p>
                <p className="invoice-quantity-form-title">Quantity</p>
            
                {/* <InvoiceMedForm/> */}
                <InvoiceMedList/>
                {/* <form>
                <input type="text" className="invoice-medicine-form" id="med_name" ></input>
                <input type="text" className="invoice-quantity-form" id="med_qty" ></input>
                
                <input type="image" src={add} className="add-icon" alt="meditech-add-icon"/>
                </form> */}
                {/* <div className="invoice-medicine-list-container">
                <div className="invoice-medicine-list-scroll">
                    <table>
                        <tr className="invoice-medicine-list">
                            <td className="invoice-medicine-list-name" ><p >Panadol</p></td>
                            <td className="invoice-medicine-list-qty"><p>28</p></td>
                            <td><input type="image" src={cancel} className="cancel-icon" alt="meditech-cancel-icon"/></td>
                        </tr>
                        
                    </table>
                </div>
                </div> */}
                <button type="submit" className="invoice-submit-button">submit</button>
            </div>

        </div>

    )}
}

export default Create_Invoice