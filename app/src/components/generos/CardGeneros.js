import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './stylegeneros.css';


function App() {

    const [categorias, setCategorias] = useState([]);
    const [categoriasHtml, setCategoriasHtml] = useState(null);
    useEffect(() => {
        async function connect() {
            try {
                const respuesta = await axios.get('http://localhost:3001/categoria');
                setCategorias(respuesta.data);
            }
            catch (e) {
                setCategorias(JSON.stringify(e.response.data));
            }
        }

        connect();
    }, []);

    useEffect(() => {

        console.log(categorias);
        let categoriaCard = categorias.map(categoria => (
            <div className="categoria">
                <li>Id: {categoria.categoria_id}</li>
                <li>Nombre: {categoria.nombre}</li>
                <li>
                    <Link to={{
                        pathname: '/editarGenero/',
                        state: {
                            categoria
                        }
                    }} >
                        <button> Editar esta categoria</button>
                    </Link>


                    <Link to={{
                        pathname: '/verLibrosAsociados/',
                        state: {
                            categoria
                        }
                    }} >
                        <button> Ver libros de esta categoria</button>
                    </Link>

                    <Link to={{
                        pathname: '/deleteGenero/',
                        state: {
                            categoria
                        }
                    }} >
                        <button> Borrar esta categoria</button>
                    </Link>
                    <br />
                </li>
            </div>
        ));


        setCategoriasHtml(categoriaCard);
    }, [categorias]);


    return (
        <div className="container">
            <div id="top">
                <Link to="/" id="button">🏚️</Link>
                <h1>Listado de categorias</h1>
                <ul>
                    {categoriasHtml}
                </ul>
            </div>
        </div>
    );
}

export default App;