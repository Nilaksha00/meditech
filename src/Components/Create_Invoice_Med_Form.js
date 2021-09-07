import React, {Component} from 'react'
import add from "../Images/add_icon.png"


export default class  InvoiceMedForm extends Component {
    
    constructor(props){
        super(props);

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeQty = this.handleChangeQty.bind(this);
        this.handleAdd = this.handleAdd.bind(this);

        this.state ={
            name: "",
            qty:null
        }
    }

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

    handleAdd = e => {
        e.preventDefault();

        this.setState({
            name:"",
            qty:""
        });

        console.log('Form submited');
        console.log(this.state.name)
        console.log(this.state.qty);
    
    
        this.props.onClick({
             medName: this.state.name,
             medQty:this.state.qty
        });
    };

    render(){
        return (
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
            
            <input type="image" src={add} className="add-icon" alt="meditech-add-icon" onClick={this.handleAdd}/>
        </form>
    )
}}

