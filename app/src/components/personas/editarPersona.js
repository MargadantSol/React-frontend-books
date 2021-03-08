import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link} from 'react-router-dom';


import './style.css';

class editarPersona extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id:'',
            nombre:'',
            apellido:'',
            alias:'',
            email:''
        };
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeApellido = this.handleChangeApellido.bind(this);
        this.handleChangeAlias = this.handleChangeAlias.bind(this);
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


    handleSubmit(event) {
        event.preventDefault();
        this.putPersona(this.state.id,this.state.nombre,this.state.apellido,this.state.alias,this.state.email);
    }

    async putPersona(id,nombre,apellido,alias,email) {
        try {
            let respuesta = await axios.put('http://localhost:3001/persona/'+id,{nombre,apellido,alias,email});            
            this.props.onUpdate(JSON.stringify(respuesta.data)); 
        } catch (e) {
            this.props.onUpdate(JSON.stringify(e.response.data));
        }
    }

    render() {
       
        var id = this.props.location.state.persona.persona_id;
        this.state.id = id;
        let persona = this.props.location.state.persona;
        let email = persona.email;
        this.state.email = email;


        let mostrarRespuesta = this.props.listado.map(persona => {
            return (
                <div className="containerderespuesta">
                    <p>{persona}</p>
                </div>
            )
        });

        return (
            <div className="container">
                
                <Link to="/" id="button">🏚️</Link>
                <div className="containereditar">
                    <h3>Estás por editar la persona {persona.nombre}</h3>
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
                            No se puede modificar el email: {this.state.email}
                        </label>
                        <br/>
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
        onUpdate: (elementoActualizado) => { dispatch({ type: 'UPDATE', data: elementoActualizado })}
    }
}

export default connect(mapStateToProps, mapActionsToProps)(editarPersona);