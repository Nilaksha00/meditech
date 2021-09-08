import React from 'react'
import cancel from "../Images/cancel-icon.png"

function Create_Invoice_Med_List(props) {

   const items = props.items;
   const listItems = items.map(items =>{
        return(
            <tr  key={items.name} className="invoice-medicine-list">
                <td className="invoice-medicine-list-name"><p >{items.name}</p></td>
                <td className="invoice-medicine-list-qty"><p>{items.qty}</p></td>
                <td className="invoice-medicine-list-price"><p>{items.price}</p></td>
                <td>
                <input type="image" src={cancel} className="cancel-icon" alt="meditech-cancel-icon" onClick = { () => props.deleteItem(items.name)}/></td>
            </tr>
        )
   })

    return(
        <div> 
        <div className="invoice-medicine-list-container">
        <div className="invoice-medicine-list-scroll">
            <table>
                {listItems}               
            </table>
        </div>
        </div>
        </div>
    )
}

export default Create_Invoice_Med_List
