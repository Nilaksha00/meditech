import React, {useState} from 'react'
import MedForm from './Create_Invoice_Med_Form'
import cancel from "../Images/cancel-icon.png"

function Create_Invoice_Med_List() {
    const {meds, setMed}= useState([]);
        
    const removeMed = name => {
        const removedArr = [...meds].filter(med => med.name !== name);
    
        setMed(removedArr);
      };
      
    function addMed(med) {

        if(!med.medName || /^\s*$/.test(med.medName)){
             return
        }
        setMed([med,...meds]);
        console.log(meds);
    }

    return(
        <div>
        <MedForm
        onClick={addMed}/>  
        <div className="invoice-medicine-list-container">
        <div className="invoice-medicine-list-scroll">
            <table>
                <tr className="invoice-medicine-list">
                    <td className="invoice-medicine-list-name" ><p >{meds}</p></td>
                    {/* <td className="invoice-medicine-list-qty"><p>{meds}</p></td> */}
                    <td><input type="image" src={cancel} className="cancel-icon" alt="meditech-cancel-icon" onClick={()=> removeMed(meds.medName)}/></td>
                </tr>
                
            </table>
        </div>
        </div>
        </div>
    )
}

export default Create_Invoice_Med_List
