import React, {Component} from 'react'
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import back from "../Images/back.png"
import pre from "../Images/sample_prescription.jpg"
import axios from './axios'; 

export default class View_Order extends Component { 

    constructor(props) {
        super(props);
         this.state = { 
             isAvailable:"none",
             id:'',
             NIC:'',    
             prescription:'',
             description:''
          };
    }

    componentDidMount() {
        const id=this.props.match.params.id;
        axios.get('http://localhost:3083/order/' + id)
        .then(response => {
                this.setState({
                    id:response.data.id,
                    NIC:response.data.NIC,
                    prescription:response.data.prescription,
                    description:response.data.description 
                })
        }).catch(function (error){
            console.log(error);
        })      
    }

    createInvoice = e => {      
        e.preventDefault();  
        
        axios.get('http://localhost:3083/invoice/' + this.state.id)
        .then(response=> this.setState({isAvailable:response.data}))
        .catch(console.log("No invoice created"))
      
    }

render(){
    const { id } = this.props.match.params;

    if(this.state.isAvailable===null){
        this.props.history.push("/create-invoice/"+this.state.id);
    }else if(this.state.isAvailable.id===this.state.id){  
        toast.warning("Sorry! Invoice already created");    
       // this.props.history.push("/invoice");
    }

    return (
        <div style={{height: "950px"}}>
            <ToastContainer
					position='top-center'
					autoClose={4000}
					hideProgressBar={true}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
                    limit={1}
					pauseOnHover
			/>

            <div className="pre-main-container">
                <Link to = "/order"><input type="image" src={back} className="back-icon" alt="meditech-back-icon"/></Link>                           
                <p className="create-invoice-title">Prescription</p>
                <div className="order-details-container1">
                    <p className="invoice-details-title">Order ID</p>  
                    <p className="invoice-details-id">{ id }</p>     
                </div>
                <div className="order-details-container2">
                    <p className="invoice-details-title">NIC</p> 
                    <p className="invoice-details-id">{this.state.NIC}</p>  
                </div>

                <p className="invoice-medicine-form-title">description</p>
                <textarea className="order-view-desc"  value={this.state.description}/>

                <div className="prescription-image-container"><img className="prescription-image" src={pre} alt="sample prescription"/></div>
            
                <button className="pre-submit-button" onClick={this.createInvoice}>create invoice</button>
            </div>
        </div>
    )
} }


