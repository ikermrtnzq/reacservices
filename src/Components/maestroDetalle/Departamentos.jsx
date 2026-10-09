import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../../Global'
import Empleados from './Empleados';

export default class Departamentos extends Component {
    selectDept=React.createRef();
    state = {
        departamentos : [],
        idDept : 0
    }
    conseguirDepartamentos = () => {
        let url = Global.urlDepartamentos;
        let endPoint ="webresources/departamentos";

        axios.get(url + endPoint).then((response) => {
            console.log(response.data)
            this.setState({
                departamentos: response.data
            })
        })
    }
    buscarEmpleados =(event) => {
        event.preventDefault();
        let id = this.selectDept.current.value;

        this.setState({
            idDept: id
        })

    }
    componentDidMount =() =>{
        this.conseguirDepartamentos();
    }
    
    
    render(){
        return(
            <div>
                <h1>Departamentos</h1>
                <form >
                    <label>Seleccione DEPARTAMENTO</label>
                    <select ref={this.selectDept}>
                        {this.state.departamentos.map((dep, index) => {
                            return(<option key={index} value={dep.numero}>{dep.nombre}</option>)
                        })}
                    </select>
                    <button onClick={this.buscarEmpleados}>BUSCAR</button>
                </form>
                {
                    this.state.idDept != 0 && (<Empleados idDept={this.state.idDept}/>)
                }
            </div>
        )
    }
}