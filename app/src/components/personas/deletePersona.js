import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


import './style.css';
import { render } from '@testing-library/react';


class deletePersona extends React.Component {

    componentDidMount() {
        this.props.onRemove();
        
    }

    async confirmar(id) {
        this.props.onRemove();  
        try {
            let respuesta = await axios.delete('http://localhost:3001/persona/' + id);
            this.props.onAdd(respuesta.data);
        }
        catch (e) {
            this.props.onAdd(e.response.data);
            console.log(e.response.data);
        }
    }

    render() {
        let persona = this.props.location.state.persona;

        let mostrarRespuesta = this.props.listado.map(persona => {
            return (
                <div className="containerderespuesta">
                    <p>{persona}</p>
                </div>
            )
        });

        return (
            <div className="container">
                
                    <Link to="/" id="button">🏚️</Link>
                <div className="containerdelete">
                    <h3>Estás por a {persona.nombre}</h3>
                    <button onClick={this.confirmar.bind(this, persona.persona_id)}>Borrar esta persona!</button>
                    <Link to="/" id="button"><button>No borrar esta persona</button></Link>
                    <p>{mostrarRespuesta}</p>
                </div>
            </div>
        )
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
        onAdd: (nuevoElemento) => { dispatch({ type: 'ADD', data: nuevoElemento }) },
        onRemove: (id) => { dispatch({ type: 'REMOVE', data: id })},
    }
}

export default connect(mapStateToProps, mapActionsToProps)(deletePersona);
