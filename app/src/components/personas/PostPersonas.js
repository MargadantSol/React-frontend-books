import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './style.css';

import { connect } from 'react-redux';


class PostCategoria extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            apellido:'',
            alias:'',
            email:''
        };
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangeAlias = this.handleChangeAlias.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    handleChangeNombre(event) {
        this.setState(
            { 
            nombre: event.target.value,            
         });
    }

    handleChangeApellido(event) {
        this.setState(
            { 
            apellido: event.target.value,            
         });
    }
    handleChangeAlias(event) {
        this.setState(
            { 
            alias: event.target.value,            
         });
    }
    handleChangeEmail(event) {
        this.setState(
            { 
            email: event.target.value,
         });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postPersona(this.state.nombre,this.state.apellido,this.state.alias,this.state.email);
    }

    async postPersona(nombre,apellido,alias,email) {
        try {
            let respuesta = await axios.post('http://localhost:3001/persona/',{nombre,apellido,alias,email});            
            this.props.onUpdate(JSON.stringify(respuesta.data)); 
        } catch (e) {
            this.props.onUpdate(JSON.stringify(e.response.data));
        }
    }

    render() {
        let mostrarRespuesta = this.props.listado.map(categoria => {
                return (
                    <div className="containerderespuesta">
                        <p>{categoria}</p>
                    </div>
                )
            });

        return (
            <div className="container">
                <div id="top">
                    <Link to="/" id="button">🏚️</Link>
                    <h1>Crear una nueva persona</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Ingrese el nombre
                        <input onChange={this.handleChangeNombre} type="text" value={this.state.nombre} />
                        </label>
                        <br/>
                        <label>
                            Ingrese el apellido
                        <input onChange={this.handleChangeApellido} type="text" value={this.state.apellido} />
                        </label>
                        <br/>
                        <label>
                            Ingrese el alias
                        <input onChange={this.handleChangeAlias} type="text" value={this.state.alias} />
                        </label>
                        <br/>
                        <label>
                            Ingrese el email
                        <input onChange={this.handleChangeEmail} type="text" value={this.state.email} />
                        </label>
                        <br/>
                        <input type="submit" value="Submit" />
                    </form>
                    <h2>Respuesta del servidor: </h2>
                    {mostrarRespuesta}
                </div>
            </div>
        );
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
        onUpdate: (elementoActualizado) => { dispatch({ type: 'UPDATE', data: elementoActualizado })}
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostCategoria);