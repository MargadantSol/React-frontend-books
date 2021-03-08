import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import './stylelibros.css';


class DevolverLibro extends React.Component {

    componentDidMount() {
        this.props.onRemove();
    }

    constructor(props) {
        super(props);

    }

    async confirmar(id) {
        this.props.onRemove();
        try {
            let respuesta = await axios.put('http://localhost:3001/libro/devolver/' + id);
            this.props.onAdd(JSON.stringify(respuesta.data));
        }
        catch (e) {
            this.props.onAdd(JSON.stringify(e.response.data));
            console.log(e.response.data);
        }
    }

    render() {
        let libro = this.props.location.state.libro;
        let id = libro.libro_id;

        let mostrarRespuesta = this.props.listado.map(libro => {
            return (
                <div className="containerderespuestal">
                    <p>{libro}</p>
                </div>
            )
        });

        return (
            <div className="container">
                <Link to="/" id="button">🏚️</Link>
                <div className="containeredit">
                    <h3>Devolución de: {libro.nombre}</h3>
                    <button onClick={this.confirmar.bind(this, libro.libro_id)}>Confirmar la devolución</button>
                    <Link to="/" id="button"><button>Cancelar</button></Link>
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
        onRemove: (id) => { dispatch({ type: 'REMOVE', data: id }) },
    }
}

export default connect(mapStateToProps, mapActionsToProps)(DevolverLibro);