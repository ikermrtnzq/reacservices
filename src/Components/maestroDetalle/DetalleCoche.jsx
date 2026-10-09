import axios from 'axios'; 
import React, {Component} from 'react'; 
import Global from '../../Global';
import './styleCoche.css'


export default class DetalleCoche extends Component {

    state = {
        coche: []
    }

    obtenerCoche = () => {
        let url = Global.urlCoches;
        let endpoint = "api/coches/findcoche/"
        let id = this.props.idCoche;
        axios.get(url + endpoint + id).then((response) => {
            console.log(response.data)
            this.setState({
                coche: response.data
            })
        })
    }

    componentDidMount = () => {
        this.obtenerCoche();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.idCoche != this.props.idCoche) {
            this.obtenerCoche();
        }
    }

  render() {
    return (
      <div>
        <h1>COCHE</h1>
        <table>
            <thead>
                <tr>
                    <th>MARCA</th>
                    <th>MODELO</th>
                    <th>IMAGEN</th>
                </tr>
                
            </thead>
            <tbody>
                <td>
                    <th>{this.state.coche.marca}</th>
                </td>
                <td>
                    <th>{this.state.coche.modelo}</th>
                </td>
                <td>
                    <th><img src={this.state.coche.imagen} alt="" /></th>
                </td>
            </tbody>
        </table>
      </div>
    )
  }
}
