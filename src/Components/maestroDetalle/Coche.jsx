import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../../Global';
import DetalleCoche from './DetalleCoche';


export default class Coche extends Component {

    state = {
        coches : [],
        idCoche : 0
    }

    selectCoche = React.createRef();

    obtenerCoches = () =>{
        let url = Global.urlCoches;
        let endpoint = "api/coches"

        axios.get(url + endpoint).then((response) => {
            console.log(response.data)
            this.setState({
                coches : response.data
            })
        })
    }

    seleccionarCoche = (event) =>  {
        event.preventDefault();

        let idCoche = this.selectCoche.current.value;

        this.setState({
            idCoche : idCoche
        })

    }

    componentDidMount = () => {
        this.obtenerCoches();
    }

  render() {
    return (
      <div>
        <h1>Selecciona un Coche</h1>
        <form>
            <select ref={this.selectCoche}  name="" id="">
                {
                    this.state.coches.map((coche, index) => {
                        return(<option value={coche.idCoche} key={index}>{coche.marca} {coche.modelo}</option>)
                    })
                }
            </select>
            <button onClick={this.seleccionarCoche}>BUSCAR</button>
        </form>

        {
            this.state.idCoche != 0 && (<DetalleCoche idCoche={this.state.idCoche}/>)
        }
      </div>
    )
  }
}
