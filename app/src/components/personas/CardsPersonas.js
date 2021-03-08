import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';


class PersonList extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.obtenerPersonas()
    }

    async obtenerPersonas() {
        try {
            let respuesta = await axios.get('http://localhost:3001/persona');
            console.log(respuesta.data);
            this.props.onRefresh(respuesta.data);
        }
        catch (e) {
            console.log('sali por el catch ', e.message);
        }
    }

    render() {
        let listadopersonas = this.props.listado.map(persona => {
            return (
                <div className="persona">
                    <li>Id: {persona.persona_id}</li>
                    <li>Nombre: {persona.nombre}</li>
                    <li>Apellido: {persona.apellido}</li>
                    <li>e-mail: {persona.email}</li>
                    <li>Alias: {persona.alias}</li>
                    <li>
                    <Link to={{
                        pathname: '/deletePersona/',
                        state: {
                            persona
                        }
                    }} >
                        <button> Borrar esta persona</button>
                    </Link>

                        <Link to={{
                        pathname: '/editarPersona/',
                        state: {
                            persona
                        }
                    }} >
                        <button> Editar esta persona</button>
                    </Link>

                    <Link to={{
                        pathname: '/verLibrosPrestados/',
                        state: {
                            persona
                        }
                    }} >
                        <button> Ver libros prestados a esta persona</button>
                    </Link>
                    </li>
                </div>
            )
        },this);

        return (
            <div className="container">
                <div id="top">
                    <Link to="/" id="button">🏚️</Link>
                    <h1>Todas las personas registradas</h1>
                    <ul>
                        {listadopersonas}
                    </ul>
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
        onRefresh: (nuevoListado) => { dispatch({ type: 'REFRESH', data: nuevoListado }) },
        onAdd: (nuevoElemento) => { dispatch({ type: 'ADD', data: nuevoElemento }) },
        onRemove: (id) => { dispatch({ type: 'REMOVE', data: id }) },
        onUpdate: (elementoActualizado) => { dispatch({ type: 'UPDATE', data: elementoActualizado }) }
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PersonList);