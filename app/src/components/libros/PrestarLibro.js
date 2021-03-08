import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import './stylelibros.css';


class PrestarLibro extends React.Component {

    componentDidMount() {
        this.props.onRemove();
    }

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.location.state.libro.libro_id,
            persona_id: ''
        };
        console.log(this.state.id);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        this.setState({ persona_id: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.confirmar();
    }

    async confirmar() {
        const persona_id = this.state.persona_id;
        const id = this.state.id;
        const body = { persona_id }
        console.log(this.state.id);
        this.props.onRemove();
        try {
            let respuesta = await axios.put('http://localhost:3001/libro/prestar/' + id,
                body    //enviar persona_ids
            );
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
                <div className="containerdeleter">
                    <h3>¿Seguro que querés prestar {libro.nombre} ?</h3>
                    <Link to="/" id="button"><button>No prestar</button></Link>
                    <p>Advertencia del programador: no se garantiza que la persona vaya a devolverte el libro algún dia...</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Ingrese el id de la persona
                        <input onChange={this.handleChange} type="text" value={this.state.persona_id} />
                        </label>
                        <input type="submit" value="Prestar este libro" />
                    </form>
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

export default connect(mapStateToProps, mapActionsToProps)(PrestarLibro);