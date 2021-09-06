
import React, {Component} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'; 

const Order = props =>(
    <div>
    <tr>
    <Link to="/home" style={{ textDecoration: "none" }}>
    <td>{props.ord.id}</td>
    <td> {props.ord.NIC}</td>
    <>
        {props.ord.cus_status === "Accepted" && (
                <td><div className="circle" style={{ backgroundColor: "#92EF00" }}/></td>
        )} 
        {props.ord.cus_status === "Denied" && (
                <td><div className="circle" style={{ backgroundColor: "#FA1809" }}/></td>
        )} 
        {props.ord.cus_status === "Waiting" && (
                <td><div className="circle" style={{ backgroundColor: "#0464FC" }}/></td>
        )} 
    </> </Link>              
    <>              
        {props.ord.ph_status === "processing" && (
                <td><div className="status-container" style={{ backgroundColor: "#92EF00" }}>{props.ord.ph_status}
                </div></td>
        )} 
        {props.ord.ph_status === "unavailable" && (
                <td><div className="status-container" style={{ backgroundColor: "#FA1809" }}>{props.ord.ph_status}</div></td>
        )} 
        {props.ord.ph_status === "pending" && (
                <td>
                    <select className="status-dropdown" style={{ backgroundColor:"#F5FA09"  }} >  
                    <option style={{ backgroundColor: "#F5FA09" }} >pending</option>
                    <option style={{ backgroundColor: "#FA1809" }} >unavailable</option>
                    </select></td>
        )} 
    </>
    <td style={{ display:'flex' }}>
    <Link to="/invoice" style={{ textDecoration: "none" }}><button className="order-button">view</button></Link>
    <Link to="/home" style={{ textDecoration: "none" }}><button className="order-button">proceed</button></Link></td>
    </tr></div> 
   
)


export default class OrdersList extends Component {     
    constructor(props) {
        super(props);
         this.state = { order: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3005/order/')
        .then(response => {
            this.setState({order: response.data})
        }).catch(function (error){
            console.log(error);
        })
    }

    orderList(){
        return this.state.order.map(function(currentOrder, i){
            return <Order ord={currentOrder} key={i}/>
        });
    }
    
    render() {
    return (       
        <table className="order-table">    
            <thead>
             <tr>
                <th className="id">order ID</th>
                 <th className="nic">NIC</th>
                 <th className="res">response</th>
                 <th className="stat">status</th>
                 <th className="action">actions</th>
             </tr>
             </thead><div className="table-container"> 
                {this.orderList()}
            </div></table>)}} 


