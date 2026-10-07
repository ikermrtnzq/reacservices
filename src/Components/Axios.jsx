import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../Global'


export default class Axios extends Component{
    state={
        customers: []
    }
    loadCustomer = () => {
        console.log("Antes")
        let request ="Customers"
        axios.get(Global.url + request).then((response) => {
            console.log("leyendo")
            //LOS DATOS VIENEN DENTRO  DE data.
            this.setState({
                customers: response.data.value
            })
        })
        console.log("Despues")
    }

    componentDidMount=() =>{
        this.loadCustomer();
    }
    render(){
        return(
            <div>
                <h1>GET API</h1>
                <button onClick={this.loadCustomer}>Cargar</button>
                {
                    this.state.customers.map((customer, index) => {
                        return(
                        <h4 key={index}>contacto: {customer.ContactName} </h4>
                        )
                    })
                }
            </div>
        )
    }
}