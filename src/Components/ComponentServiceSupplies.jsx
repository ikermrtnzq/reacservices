import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../Global'

export default class ComponentServiceSupplies extends Component{
    cajaID= React.createRef();
    state={
        suppliers: [],
        supplier : null
    }
    loadSuppliers = () => {
        console.log("Antes")
        let request="suppliers"
        axios.get(Global.url + request).then((response) => {
            console.log("leyendo")
            //LOS DATOS VIENEN DENTRO  DE data.
            this.setState({
                suppliers: response.data.value
            })
        })
        console.log("Despues")
    }
    buscarPorID = (event) => {
        event.preventDefault();
        let request="suppliers"
        axios.get(Global.url + request).then((response) => {
            for(var supplier of response.data.value ){
                //console.log(supplier.SupplierID)
                if(supplier.SupplierID == this.cajaID.current.value){
                    console.log("ENCONTRADO");
                    this.supplier = supplier;
                    this.setState({
                        supplier: supplier
                    })
                }
            }
        })
    }
    componentDidMount=() =>{
        this.loadSuppliers();
    }
    render(){
        return(
            <div>
                <h1>Suppliers</h1>
                <form onSubmit={this.buscarPorID}>
                    <label>Buscar por ID</label>
                    <input type="number" ref={this.cajaID}></input>
                    <button>BUSCAR</button>
                </form>
                {
                    this.supplier  &&
                        (<h4 style={{color :"red"}}>BUSCADO : ID = {this.supplier.SupplierID} Contact Name: {this.supplier.ContactName}</h4>) 
                }
                {
                    this.state.suppliers.map((supplier, index) => {
                        return(
                            <h4 key ={index}>ID: {supplier.SupplierID} Contact Name: {supplier.ContactName}</h4>
                        )
                    })
                }
            </div>
        )
    }
}