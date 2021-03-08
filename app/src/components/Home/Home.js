import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="principal">
                <div>
                    <h1>Página principal</h1>

                    <div id="submenu">
                        <h4>Personas</h4>
                        <Link to="/Cardspersonas" >
                            <button>Ver todas las personas</button>
                        </Link>
                        <Link to="/postPersonas" >
                            <button>Agregar una persona</button>
                        </Link>
                    </div>


                    <div id="submenu">
                    <h4>Generos</h4>
                        <Link to="/Cardsgeneros" >
                            <button>Ver todos los generos</button>
                        </Link>
                        <Link to="/postGeneros" >
                            <button>Agregar un genero</button>
                        </Link>
                    </div>


                    <div id="submenu">
                    <h4>Libros</h4>
                        <Link to="/Cardslibros" >
                            <button>Ver todos los libros</button>
                        </Link>
                        <Link to="/PostLibro" >
                            <button>Agregar un libro</button>
                        </Link>
                    </div>

                </div>
            </div>
        )
    }
}



export default connect(null, null)(Home);