import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './stylelibros.css';

import { connect } from 'react-redux';


class PostLibro extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            descripcion:'',
            categoria_id:'',
            persona_id:''
        };
        this.handleChangeNombre = this.handleChangeNombre.bind(this);
        this.handleChangeDescripcion = this.handleChangeDescripcion.bind(this);
        this.handleChangeCategoria_id = this.handleChangeCategoria_id.bind(this);
        this.handleChangePersona_id = this.handleChangePersona_id.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }    
    handleChangeNombre(event) {
        this.setState(
            { 
            nombre: event.target.value,            
         });
    }

    handleChangeDescripcion(event) {
        this.setState(
            { 
            descripcion: event.target.value,            
         });
    }
    handleChangeCategoria_id(event) {
        this.setState(
            { 
            categoria_id: event.target.value,            
         });
    }
    handleChangePersona_id(event) {
        this.setState(
            { 
            persona_id: event.target.value,
            
         });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postLibro(this.state.nombre,this.state.descripcion,this.state.categoria_id,this.state.persona_id);
    }

    async postLibro(nombre,descripcion,categoria_id,persona_id) {
        try {
            let respuesta = await axios.post('http://localhost:3001/libro/',{nombre,descripcion,categoria_id,persona_id});            
            this.props.onUpdate(JSON.stringify(respuesta.data)); 
        } catch (e) {
            this.props.onUpdate(JSON.stringify(e.response.data));
        }
    }

    render() {
        let mostrarRespuesta = this.props.listado.map(categoria => {
                return (
                    <div className="containerderespuestal">
                        <p>{categoria}</p>
                    </div>
                )
            });

        return (
            <div className="container">
                <div id="top">
                    <Link to="/" id="button">???????</Link>
                    <h1>A??adir un libro</h1>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Ingrese el nombre
                        <input onChange={this.handleChangeNombre} type="text" value={this.state.nombre} />
                        </label>
                        <br/>
                        <label>
                            Ingrese la descripcion, opcional.
                        <input onChange={this.handleChangeDescripcion} type="text" value={this.state.descripcion} />
                        </label>
                        <br/>
                        <label>
                            Ingrese el id de la categoria
                        <input onChange={this.handleChangeCategoria_id} type="text" value={this.state.categoria_id} />
                        </label>
                        <br/>
                        <label>
                            Ingrese el id de la persona que lo tiene. Si no est?? prestado, escriba NULL
                        <input onChange={this.handleChangePersona_id} type="text" value={this.state.persona_id} />
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

export default connect(mapStateToProps, mapActionsToProps)(PostLibro);