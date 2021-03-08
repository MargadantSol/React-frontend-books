import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './stylelibros.css';

let personas=[];

class PersonList extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.obtenerLibros()
    }



    async obtenerLibros() {
        try {
            let respuesta = await axios.get('http://localhost:3001/libro');
            const respuestaPersonas = await axios.get('http://localhost:3001/persona');
            personas = respuestaPersonas.data;
            this.props.onRefresh(respuesta.data);
        }
        catch (e) {
            this.props.onRefresh(e.message);
        }
    }

    obtenerAlias(persona_id) {

        if (persona_id != null) {
            const found = personas.find(element => element.persona_id == persona_id);
            return found.alias;
        }
        else {
            return ("Este libro no está prestado");
        }

    }

    render() {
        let listadoLibros = this.props.listado.map(libro => {
            const personaID = this.obtenerAlias(libro.persona_id);
            return (
                <div className="libro">
                    <li>Id: {libro.libro_id}</li>
                    <li>Nombre: {libro.nombre}</li>
                    <li>Descripcion: {libro.descripcion}</li>
                    <li>Categoria: {libro.categoria_id}</li>
                    <li>Persona que lo tiene: {personaID}</li>
                    <li>
                        <Link to={{
                            pathname: '/DeleteLibro/',
                            state: {
                                libro
                            }
                        }} >
                            <button> Borrar este libro</button>
                        </Link>
                        <Link to={{
                            pathname: '/EditarLibro/',
                            state: {
                                libro
                            }
                        }} >
                            <button> Editar este libro</button>
                        </Link>
                        <Link to={{
                            pathname: '/PrestarLibro/',
                            state: {
                                libro
                            }
                        }} >
                            <button> Prestar este libro</button>
                        </Link>
                        <Link to={{
                            pathname: '/DevolverLibro/',
                            state: {
                                libro
                            }
                        }} >
                            <button> Devolver este libro</button>
                        </Link>
                    </li>
                </div>
            )
        }, this);

        return (
            <div className="container">
                <div id="top">
                    <Link to="/" id="button">🏚️</Link>
                    <h1>Listado de libros</h1>
                    <ul>
                        {listadoLibros}
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