import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './stylegeneros.css';

import { connect } from 'react-redux';


class PostCategoria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    handleChange(event) {
        this.setState({ nombre: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postCategoria(this.state.nombre);
    }

    async postCategoria(nombre) {
        try {
            let respuesta = await axios.post('http://localhost:3001/categoria/',{nombre});
            console.log(respuesta.data);
            if(respuesta.status = 200) {
                this.props.onUpdate("Se agregó la categoría"); 
            }
        } catch (e) {
            this.props.onUpdate(JSON.stringify(e.response.data));
        }
    }

    render() {
        let mostrarRespuesta = this.props.listado.map(categoria => {
                return (
                    <div className="containerderespuesta">
                        <p>{categoria}</p>
                    </div>
                )
            });

        return (
            <div className="container">
                <div id="top">
                    <Link to="/" id="button">🏚️</Link>
                    <h1>Crear una nueva categoria</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Ingrese el nombre
                        <input onChange={this.handleChange} type="text" value={this.state.nombre} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>
                    <h2>Respuesta del servidor: </h2>
                    {mostrarRespuesta}
                </div>
            </div>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        listado: state.listado,
        serverUrl: state.serverUrl
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        onUpdate: (elementoActualizado) => { dispatch({ type: 'UPDATE', data: elementoActualizado })}
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostCategoria);