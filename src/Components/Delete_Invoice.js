import React, {Component, useState} from 'react'
import { Link} from "react-router-dom";
import back from "../Images/back.png"
import axios from './axios'; 
import dateFormat from "dateformat";

const Med = (props) =>{

    return(
        <tr  key={props.medicine.id} className="view-invoice-med">
            <td><p >{props.medicine.med_name}</p></td> <td></td>
            <td><p>{props.medicine.quantity}</p></td>
            <td><p>{props.medicine.total}</p></td>
        </tr>

    )
}

export default class Delete_Invoice extends Component { 
    constructor(props) {
        super(props);
         this.state = { 
            iid:'',
            oid:'',
            date:'',    
            amount:'',
            med: [] 
          };
    }

    componentDidMount() {
        const id=this.props.match.params.id;
        axios.get('http://localhost:3083/invoice/' + id)
        .then(response => {
                this.setState({
                    iid:response.data.id,
                    oid:response.data.order_id,
                    date:dateFormat(response.data.createdAt, "dd-mm-yyyy"),
                    amount:response.data.amount,
                    med: [] 
                })
        }).catch(function (error){
            console.log(error);
        })

        axios.get('http://localhost:3083/invoice/med/'+ id)
        .then(response => {
            this.setState({med: response.data})
        }).catch(function (error){
            console.log(error);
        })
    }

    medList(){
        return this.state.med.map(function(currentMed, i){
        return <Med medicine={currentMed} key={i}/>
        });   
    }

    deleteInvoice = e => {      
        e.preventDefault();
    
        const id=this.props.match.params.id; 
        
        axios.delete('/invoice/'+id)
    }

    render(){
        return (

            <div className='delete-invoice-container'>
               <Link to ="/invoice"><input type="image" src={back} className="back-icon" alt="meditech-back-icon"/></Link>
                <p className="create-invoice-title">Invoice</p>

                <div class="flex-container-invoice-details" style={{ marginTop: "80px" }}>
                    <div>
                        <p className="view-invoice-details-title">order ID</p>  
                        <p className="view-invoice-details-id">{this.state.oid}</p>     
                    </div>
                    <div>
                        <p className="view-invoice-details-title">invoice ID</p>  
                        <p className="view-invoice-details-id">{this.state.iid}</p>     
                    </div>
                </div>
                <div class="flex-container-invoice-details">
                    <div>
                        <p className="view-invoice-details-title">date</p>  
                        <p className="view-invoice-details-id">{this.state.date}</p>     
                    </div>             
                    <div>
                        <p className="view-invoice-details-title">amount</p>  
                        <p className="view-invoice-details-id">{this.state.amount}</p>     
                    </div>
                </div>

                <div class="flex-container-med-details"> 
                    <div class="view-invoice-med-details">
                        <div><p>medicine</p></div><div/> 
                        <div><p>quantity</p></div> 
                        <div><p>total</p></div>
                    </div>
                    {this.medList()} 
                </div>
                <button className="invoice-delete-button" onClick={this.deleteInvoice}>delete</button>
            </div>
        )
    }
}