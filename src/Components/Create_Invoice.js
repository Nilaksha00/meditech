import React, {Component} from "react";
import { Link} from "react-router-dom";
import back from "../Images/back.png"
import InvoiceMedList from "./Create_Invoice_Med_List.js"
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
        
        const iid = Math.floor(Math.random() * 1000);

        this.state ={
            isButtonDisabled: false,
            iid:iid,
            id:'',
            NIC:'',
            items:[],
            tot:'',
            currentItem:{
                name: "",
                qty:null,
                price:null,
                total:0
            }
        }
    }

    componentDidMount() {
        const id=this.props.match.params.id;
        axios.get('http://localhost:3083/order/' + id)
        .then(response => {
                this.setState({
                    id:response.data.id,
                    NIC:response.data.NIC,
                })
        }).catch(function (error){
            console.log(error);
        })
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

        //add item to the below list
        const newItem = this.state.currentItem;
        if(newItem.name!==""){
            const newItems=[...this.state.items, newItem];
            this.setState({
                items:newItems,
                disable:"false"
            });
        };  
        
        //calculate and display total amount
        let tot = 0;
        tot = tot + this.state.total;                         
        this.setState({tot:tot})

        const medItem = {
            id: Math.floor(Math.random() * 1000),
            invoiceID: this.state.iid,
            med_name:this.state.name,
            quantity:this.state.qty,
            total:this.state.qty * this.state.price
        }     
        
        //backend
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
        const del = {
          med_name:name,
          invoiceID:this.state.iid
        }
        console.log(del)
        axios.delete('/invoice/med', del)
        .then(res => console.log("res.data")).catch("error:error")
        
        const filteredItems = this.state.items.filter(item => item.name !== name);

        this.setState({
           items:filteredItems 
        })
    };

    
    medTot(){
        let tot = 0;
        this.state.items.map(function(currentMed, i){
            tot = tot + currentMed.total;                         
        });
        return tot;       
    }
 
    submitInvoice = e => {      
        e.preventDefault();
    
        const invoice = {
            id:this.state.iid,
            NIC:this.state.NIC,
            order_id:this.state.id,
            amount:this.medTot()
        }     
    
        axios.post('/invoice', invoice)
        .then(res => console.log(res.data))

        this.setState({
            isButtonDisabled: true
          });
    }

    
    render(){    
        return (
        <div style={{height: "950px"}}>
            <div className="invoice-main-container">
            <Link to ="/invoice"><input type="image" src={back} className="back-icon" alt="meditech-back-icon"/></Link>
                <p className="create-invoice-title">Create Invoice</p>
                <div className="invoice-details-container1">
                    <p className="invoice-details-title">Order ID</p>  
                    <p className="invoice-details-id">{ this.state.id }</p>     
                </div>
                <div className="invoice-details-container2">
                    <p className="invoice-details-title">Invoice ID</p> 
                    <p className="invoice-details-id">{this.state.iid}</p>  
                </div>
                <div className="invoice-details-container3">
                    <p className="invoice-details-title">Amount</p> 
                    <p className="invoice-details-id">{this.medTot()}</p>  
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
                <button className="invoice-submit-button" disabled={this.state.isButtonDisabled} onClick={this.submitInvoice}>submit</button>
            </div>
        </div>
    )}
}

export default Create_Invoice