import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './stylegeneros.css';


class ListaDeLibros extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let categoria = this.props.location.state.categoria;
        this.obtenerLibros(categoria.categoria_id)
    }

    async obtenerLibros(categoria_id) {
        try {
            let respuesta = await axios.get('http://localhost:3001/libro/categoria/'+categoria_id);
            this.props.onAdd(respuesta.data);
        }
        catch (e) {
            this.props.onAdd(e.response.data);
        }
    }


    render() {

        let listadoLibros = this.props.listado.map(libro => {
            return (
                <div className="categoria">
                    <li>Id: {libro.libro_id}</li>
                    <li>Nombre: {libro.nombre}</li>
                    <li>Descripcion: {libro.descripcion}</li>
                    <li>Categoria: {libro.categoria_id}</li>
                    <li>Persona que lo tiene: {libro.persona_id}</li>
                </div>
            )
        }, this);

        return (
            <div className="container">
                <div id="top">
                    <Link to="/" id="button">🏚️</Link>
                    <h1>Listado de libros</h1>
                    <h3>No hay en el backend implementación de ver libros por categoría</h3>
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

export default connect(mapStateToProps, mapActionsToProps)(ListaDeLibros);