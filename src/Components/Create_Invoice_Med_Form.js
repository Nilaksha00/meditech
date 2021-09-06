import React,{useState} from 'react'
import add from "../Images/add_icon.png"

function InvoiceMedForm(props) {
    const [state, setState] = useState({
        name: "",
        qty:null
    });

    const handleChangeName = e => {
        setState({
            name:e.target.value
        });
    };

    const handleChangeQty = e => {
        setState({
            qty:e.target.value
        });
    };

    const handleAdd = e => {
        e.preventDefault();

        props.onClick({
            medName: state.name,
            medQty:state.qty
        });

        setState({
            name:"",
            qty:""
        });
    };

    return (
        <form >
            <input 
                type="text" 
                className="invoice-medicine-form" 
                value={state.name} 
                name="medName" 
                onChange={handleChangeName}
            />
            <input 
                type="number" 
                className="invoice-quantity-form" 
                value={state.qty} 
                name="medName" 
                onChange={handleChangeQty}
            />
            
            <input type="image" src={add} className="add-icon" alt="meditech-add-icon" onClick={handleAdd}/>
        </form>
    )
}

export default InvoiceMedForm
