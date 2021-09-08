import React, {Component} from "react";
import back from "../Images/back.png"
import InvoiceMedList from "./Create_Invoice_Med_List"
import add from "../Images/add_icon.png"
import axios from './axios';

class Create_Invoice extends Component{
    constructor(props){
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.state ={
            items:[],
            currentItem:{
                name: "",
                qty:null,
                price:null,
                total:0
            }
        }
    }

    //handles changes in text fields
    handleChangeName = e => {
         this.setState({
            name:e.target.value
        });
    };

    handleChangeQty = e => {
        this.setState({
            qty:e.target.value
        });
    };

    handleChangePrice = e => {
        this.setState({
            price:e.target.value
        });         
        
        this.setState({currentItem:{
            name:this.state.name,
            qty:this.state.qty,
            price:e.target.value,
            total:this.state.qty *  e.target.value
        }});     
    };
        
    //handles when pressing add button
    handleAdd = e => {      
        e.preventDefault();

        const newItem = this.state.currentItem;
        if(newItem.name!==""){
            const newItems=[...this.state.items, newItem];
            this.setState({
                items:newItems,
            });
        };    

        const id = Math.floor(Math.random() * 1000);

        const medItem = {
            id: Math.floor(Math.random() * 10000),
            invoiceID: id,
            med_name:this.state.name,
            quantity:this.state.qty,
            total:this.state.qty * this.state.price
        }      

        axios.post('/invoice/med', medItem)
        .then(res => console.log(res.data))

        this.setState({
                name:"",
                qty:"",
                price:""
            })
    }

    //handles deleting items
    deleteItem(name){
      const filteredItems = this.state.items.filter(item => item.name !== name);

        this.setState({
           items:filteredItems 
        })
    };
 
    submitInvoice = e => {      
        e.preventDefault();
    
        const invoice = {
            id: Math.floor(Math.random() * 10000),
            NIC:2009032,
            invoiceID: 77,
            order_id:23,
            amount:78,
        }      

        axios.post('/invoice', invoice)
        .then(res => console.log(res.data))
    }

    render(){    
        return (
        <div style={{height: "950px"}}>
            <div className="invoice-main-container">
            <input type="image" src={back} className="back-icon" alt="meditech-back-icon"/>                           
                <p className="create-invoice-title">Create Invoice</p>
                <div className="invoice-details-container1">
                    <p className="invoice-details-title">Order ID</p>  
                    <p className="invoice-details-id">{Math.floor(Math.random() * 10000)}</p>     
                </div>
                <div className="invoice-details-container2">
                    <p className="invoice-details-title">Amount</p> 
                    <p className="invoice-details-id">{Math.floor(Math.random() * 10000)}</p>  
                </div>
                
                <p className="invoice-medicine-form-title">medicine</p>
                <p className="invoice-quantity-form-title">quantity</p>
                <p className="invoice-price-form-title">price</p>

                <form >
                    <input 
                        type="text" 
                        className="invoice-medicine-form" 
                        value={this.state.name} 
                        name="medName" 
                        onChange={this.handleChangeName}
                    />
                    <input 
                        type="number" 
                        className="invoice-quantity-form" 
                        value={this.state.qty} 
                        name="medQty" 
                        onChange={this.handleChangeQty}
                    />
                    <input 
                        type="number" 
                        className="invoice-price-form" 
                        value={this.state.price} 
                        name="medPrice" 
                        onChange={this.handleChangePrice}
                    />
            
                    <input type="image" src={add} className="add-icon" alt="meditech-add-icon" onClick={this.handleAdd}/>
                </form>

                <InvoiceMedList 
                    items = {this.state.items}
                    deleteItem = {this.deleteItem}
                />
                <button type="submit" className="invoice-submit-button" onClick={this.submitInvoice}>submit</button>
            </div>
        </div>
    )}
}

export default Create_Invoice