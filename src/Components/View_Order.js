import React, {Component} from 'react'
import { Link} from "react-router-dom";
import back from "../Images/back.png"
import pre from "../Images/sample_prescription.jpg"
import axios from './axios'; 

export default class View_Order extends Component { 

    constructor(props) {
        super(props);
         this.state = { 
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

render(){
    const { id } = this.props.match.params;
    return (
        <div style={{height: "950px"}}>
            <div className="pre-main-container">
                <input type="image" src={back} className="back-icon" alt="meditech-back-icon"/>                           
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
            
                <Link to={'/create-invoice/'+this.state.id}><button className="pre-submit-button">create invoice</button></Link>
            </div>
        </div>
    )
} }


