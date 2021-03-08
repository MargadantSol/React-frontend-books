import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './style.css';


class ListaDeLibros extends React.Component {


    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.onRefresh(); //para borrar el listado de personas que traemos de la página cardsPersonas
        let persona = this.props.location.state.persona;
        this.obtenerLibros(persona.persona_id)
    }

    async obtenerLibros(persona_id) {
        try {
            let respuesta = await axios.get('http://localhost:3001/libro/persona/'+persona_id);
            this.props.onAdd(respuesta.data);
        }
        catch (e) {
            this.props.onAdd(e.response.data);
        }
    }


    render() {

        /*
        Nota: acá hay error porque no puede hacer el map de un listado, 
        ya que no hay implementación en el backend de lo solicitado para este punto.
        */
        let listadoLibros = this.props.listado.map(libro => {
            return (
                <div className="persona">
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
                    <h3>No hay en el backend implementación de ver libros por persona</h3>
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