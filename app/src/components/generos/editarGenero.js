import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import './stylegeneros.css';

//IMPORTANTE: PUT NO ESTA IMPLEMENTADO EN EL BACKEND!!
class editarGenero extends React.Component {

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
        const cat = {
            nombre: this.state.nombre,
            id: this.props.location.state.categoria.categoria_id
        }
        this.editar(cat);
    }
    componentDidMount() {
        this.props.onRemove();
    }

    async editar(cat) {
        this.props.onRemove();
        try {
            let respuesta = await axios.put('http://localhost:3001/categoria/' + {cat});
            this.props.onAdd(respuesta.data);
        }
        catch (e) {
            this.props.onAdd(e.response.data);
            console.log(e.response.data);
        }
    }

    render() {
        console.log(this.props.location.state.categoria);
        var id = this.props.location.state.categoria.categoria_id;
        let categoria = this.props.location.state.categoria;
        console.log(id);


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
                <div className="containereditar">
                    <h3>Estás por editar la categoria {categoria.nombre}</h3>
                    <p>No hay en el backend implementacion de put categoria</p>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Ingrese el nombre
                        <input onChange={this.handleChange} type="text" value={this.state.nombre} />
                        </label>
                        <input type="submit" value="Submit" />
                    </form>                    
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
        onRemove: (id) => { dispatch({ type: 'REMOVE', data: id })},
    }
}

export default connect(mapStateToProps, mapActionsToProps)(editarGenero);
