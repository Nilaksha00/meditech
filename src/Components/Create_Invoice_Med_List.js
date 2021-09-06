import React, {useState} from 'react'
import MedForm from './Create_Invoice_Med_Form'
import cancel from "../Images/cancel-icon.png"

function Create_Invoice_Med_List() {
    const {meds, setMed}= useState([]);

    const addMed = med => {

        if(!med.name || /^\s*$/.test(med.name)){
             return
        }
        const newMed = [med,...meds];

        setMed(newMed);
        console.log(med,...meds);
    }

    return (
        <div>
        <MedForm onClick={addMed}/>
        <div className="invoice-medicine-list-container">
        <div className="invoice-medicine-list-scroll">
            <table>
                <tr className="invoice-medicine-list">
                    <td className="invoice-medicine-list-name" ><p >Panadol</p></td>
                    <td className="invoice-medicine-list-qty"><p>28</p></td>
                    <td><input type="image" src={cancel} className="cancel-icon" alt="meditech-cancel-icon"/></td>
                </tr>
                
            </table>
        </div>
        </div>
        </div>
    )
}

export default Create_Invoice_Med_List
