import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../Global'

export default class EmpleadosDepartamento extends Component {
    state = {
        empleados : [],
        departamentos : []
    }
    cajaDep = React.createRef();
    selectDept =React.createRef();
    conseguirEmpleados = (event) => {
        event.preventDefault();
        let id = this.selectDept.current.value;
        let url = Global.urlEmpleados;
        let endPoint ="api/Empleados/EmpleadosDepartamento/" +id;

        axios.get(url + endPoint).then((response) => {
            console.log(response.data)
            this.setState({
                empleados: response.data
            })
        })
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
    componentDidMount =() =>{
        this.conseguirDepartamentos();
    }
    
    render(){
        return(
            <div>
                <h1>Empleados Departamento</h1>
                <form onSubmit={this.conseguirEmpleados}>
                    <label>Introduzca el ID del departamento</label>
                    <select ref={this.selectDept}>
                        {this.state.departamentos.map((dep, index) => {
                            return(<option>{dep.numero}</option>)
                        })}
                    </select>
                    <button>BUSCAR</button>
                </form>
                {
                    this.state.empleados.map((empleado, index) => {
                        return(
                            <div>
                                <h3 key={index}>{empleado.apellido}, {empleado.oficio}</h3>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}