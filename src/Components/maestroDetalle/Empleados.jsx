import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../../Global'

export default class Empleados extends Component {
    componentDidMount =() =>{
        //console.log(this.props.idDept)
        this.buscarEmpledos();
    }
    state = {
        empleados: []
    }

    buscarEmpledos = () => {
        let idDept = this.props.idDept;
        let url = Global.urlEmpleados;
        let endPoint ="api/Empleados/EmpleadosDepartamento/" +idDept;

        axios.get(url + endPoint).then((response) => {
            console.log(response.data)
            this.setState({
                empleados: response.data
            })
        })
    }

    //SE EJEVCUTA CADA VEZ QU SE ACTUALIZA 
    componentDidUpdate = (oldProps) => {
        console.log("Current: "+this.props.idDept)
        console.log("old: "+oldProps.idDept)

        //SOLAMENTE ACTUALIZAMOS SI PROPS HA CAMBIADO
        if (oldProps.idDept != this.props.idDept) {
            this.buscarEmpledos();
        }
        
    }
    
    render(){
        return(
            <div>
                <h1>Empleados Componentes</h1>
                {
                    this.state.empleados.map((emp, index) => {
                        return(<h3 key={index}>{emp.apellido}, Oficio: {emp.oficio}</h3>)
                    })
                }
            </div>
        )
    }
}