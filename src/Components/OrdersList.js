import React, {Component, useState} from 'react'
import { Link } from "react-router-dom";
import axios from './axios'; 

//display order
const Order = (props) =>{

    const [responce, setResponce] = useState();

    const handleResponce = (e) => {        

        let value = e.target.value;
        setResponce(e.target.value);
        
        //change status to unavailable
        let data = {
            id:props.ord.id,
            ph_status: value
        }

        axios.patch("/order/update/", data)
        .then(console.log("Status uploaded"))
        .catch(console.log("error"))      
    
        //change dropdown background colour
        if(value === "unavailable"){
            e.target.style.backgroundColor = "red";
        } else if(value === "pending"){
            e.target.style.backgroundColor = "#F5FA09";
        } else {
            e.target.style.backgroundColor = "#F5FA09";
        }
    }

    return(
        
        <tr key={props.ord.id}>
        <Link to="/home" style={{ textDecoration: "none" }}>
        <td>{props.ord.id}</td>
        <td> {props.ord.NIC}</td>
        <>
            {props.ord.cus_status === "approved" && (
                    <td><div className="circle" style={{ backgroundColor: "#92EF00" }}/></td>
            )} 
            {props.ord.cus_status === "denied" && (
                    <td><div className="circle" style={{ backgroundColor: "#FA1809" }}/></td>
            )} 
            {props.ord.cus_status === "waiting" && (
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
                        <select style={{ backgroundColor: "#F5FA09" }} onChange={handleResponce} className="status-dropdown" id="statusDropdown" >  
                        <option style={{ backgroundColor: "#F5FA09" }} >pending</option>
                        <option style={{ backgroundColor: "#FA1809" }} >unavailable</option>
                        </select></td>
            )} 
        </>
        <td style={{ display:'flex' }}>
        <Link to={"/view-order/"+props.ord.id} style={{ textDecoration: "none" }}><button className="order-button" >view</button></Link>
        <Link to="/home" style={{ textDecoration: "none" }}><button className="order-button">proceed</button></Link></td>
        </tr>

    )
}

export default class OrdersList extends Component {     
    constructor(props) {
        super(props);
         this.state = { order: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:3083/order/')
        .then(response => {
            this.setState({order: response.data})
        }).catch(function (error){
            console.log(error);
        })
        }   
   
    //iterate and display orders
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
             </thead>
             <div className="table-container"> 
             <div className="search-bar-container">
                {this.orderList()} 
                </div>
            </div></table>)}} 




