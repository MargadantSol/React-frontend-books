import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


import './stylegeneros.css';
import { render } from '@testing-library/react';


class deleteGenero extends React.Component {

    componentDidMount() {
        this.props.onRemove();
        //Esto es para no arrastrar los props que se pueden generar si antes se usa el PostGenero!
    }

    async confirmar(id) {
        this.props.onRemove();  //Con esto me aseguro que no hayan montones de mensajes, solo uno.
        try {
            let respuesta = await axios.delete('http://localhost:3001/categoria/' + id);
            this.props.onAdd(respuesta.data);
        }
        catch (e) {
            this.props.onAdd(e.response.data);
        }
    }

    render() {
        let categoria = this.props.location.state.categoria;

        let mostrarRespuesta = this.props.listado.map(categoria => {
            return (
                <div className="containerderespuesta">
                    <p>{categoria}</p>
                </div>
            )
        });

        return (
            <div className="container">
                
                    <Link to="/" id="button">🏚️</Link>
                <div className="containerdelete">
                    <h3>Estás por borrar la categoria {categoria.nombre}</h3>
                    <button onClick={this.confirmar.bind(this, categoria.categoria_id)}>Borrar esta categoria!</button>
                    <Link to="/" id="button"><button>No borrar esta categoría</button></Link>
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

export default connect(mapStateToProps, mapActionsToProps)(deleteGenero);
