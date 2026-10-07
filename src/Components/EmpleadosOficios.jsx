import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../Global'

export default class EmpleadosOficios extends Component {

    cajaOficio = React.createRef();
    state = {
        empleados : null,
        oficios: [],
        buscados: []
    }

    obtenerEmpleados  = () => {
        let url = Global.urlEmpleados;
        let endPoint ="api/Empleados";

        axios.get(url + endPoint).then((response) => {
            //console.log(response.data)
            this.setState({
                empleados: response.data
            })
            let aux =[];
            let aux2 = [];
            let lista = new Set()
            for(var emp of response.data){
                aux2.push(emp.oficio)
                if(aux.includes(emp.oficio)){
                
                }else{
                    aux.push(emp.oficio)
                }
                
                
            }
            //console.log(aux2)

            //let lista = [...new Set(response.data.map(elem => elem.oficio))]; 
            this.setState({
                oficios: aux
            })
        })
    }

    buscarEmpleados = (event) => {
        event.preventDefault();
        let oficio = this.cajaOficio.current.value;
        let url = Global.urlEmpleados;
        let endPoint ="api/Empleados/EmpleadosOficio/" + oficio;

        axios.get(url + endPoint).then((response) => {
            console.log(response.data)
            this.setState({
                buscados: response.data
            })
        })
    }
    componentDidMount =() =>{
        this.obtenerEmpleados();
    }

   
    render(){
        return(
            <div>
                <h1>Empleados Oficios</h1>
                <form onSubmit={this.buscarEmpleados}>
                    <select ref ={ this.cajaOficio}>
                        {
                            this.state.oficios.map((oficio, index) => {
                                return(
                                    <option value={oficio}>{oficio}</option>
                                )
                            })
                        }
                    </select>
                    <button>Buscar</button>
                </form>
                <table>
                    <thead>
                        <tr>
                            <th>Apellido</th>
                            <th>Oficio</th>
                            <th>Salario</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.buscados.map((emp, index) => {
                                return(
                                    <tr>
                                        <td>{emp.apellido} </td>  
                                        <td>{emp.oficio} </td>
                                        <td>{emp.salario} </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                
            </div>
        )
    }
}