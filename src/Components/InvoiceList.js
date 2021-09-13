import React, {Component} from 'react'
import { Link } from "react-router-dom";
import axios from './axios'; 

const Invoice = (props) =>{
    return(
        
        <tr key={props.inv.id}>
        <td>{props.inv.id}</td>
        <td> {props.inv.NIC}</td>
        <td> {props.inv.amount}</td>      
        <td style={{ display:'flex' }}>
            <Link to={"/view-invoice/"+props.inv.id} style={{ textDecoration: "none" }}><button className="order-button" >view</button></Link>
            <Link to={"/update/"+props.inv.id} style={{ textDecoration: "none" }}><button className="order-button">update</button></Link>
            <Link to={"/delete-invoice/"+props.inv.id} style={{ textDecoration: "none" }}><button className="order-button" >delete</button></Link>
        </td>
        </tr>
    )
}
//axios.delete('http://localhost:3083/invoice/')
export default class InvoiceList extends Component {     
    constructor(props) {
        super(props);
         this.state = { invoice: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3083/invoice/')
        .then(response => {
            this.setState({invoice: response.data})
        }).catch(function (error){
            console.log(error);
        })
    }
   
    invoiceList(){
        return this.state.invoice.map(function(currentInvoice, i){
        return <Invoice inv={currentInvoice} key={i}/>
        });   
    }

    render() {
    return (       
        <table className="invoice-table">    
            <thead>
             <tr>
                <th className="iid">invoice ID</th>
                 <th className="inic">NIC</th>
                 <th className="iamount">amount</th>
                 <th className="iaction">actions</th>
             </tr>
             </thead>
             <div className="table-container"> 
             <div className="search-bar-container">
                {this.invoiceList()} 
                </div>
            </div>
        </table>
        )
    }
} 

