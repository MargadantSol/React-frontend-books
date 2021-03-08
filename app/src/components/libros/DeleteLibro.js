import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';


import './stylelibros.css';
import { render } from '@testing-library/react';

class DeleteLibro extends React.Component {

    componentDidMount() {
        this.props.onRemove();
    }

    async confirmar(id) {
        this.props.onRemove();
        try {
            let respuesta = await axios.delete('http://localhost:3001/libro/' + id);
            this.props.onAdd(respuesta.data);
        }
        catch (e) {
            this.props.onAdd(e.response.data);
            console.log(e.response.data);
        }
    }
    render() {
        console.log(this.props.location.state.libro);
        var id = this.props.location.state.libro.libro_id;
        let libro = this.props.location.state.libro;
        console.log(id);

        let mostrarRespuesta = this.props.listado.map(libro => {
            return (
                <div className="containerrespuestal">
                    <p>{libro}</p>
                </div>
            )
        });
        return (
            <div className="container">
                <Link to="/" id="button">🏚️</Link>
                <div className="containerdeleter">
                    <h3>Estas por borrar este libro {libro.nombre}</h3>
                    <button onClick={this.confirmar.bind(this, libro.libro_id)}>Eliminar este libro</button>
                    <Link to="/" id="button"><button>No eliminar este libro</button></Link>
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

export default connect(mapStateToProps, mapActionsToProps)(DeleteLibro);