import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './components/Home/Home';

import Cardspersonas from './components/personas/CardsPersonas';
import postPersonas from './components/personas/PostPersonas';
import editarPersona from './components/personas/editarPersona';
import deletePersona from './components/personas/deletePersona';
import verLibrosPrestados from './components/personas/verLibrosPrestados';

import Cardsgeneros from './components/generos/CardGeneros';
import postGeneros from './components/generos/PostGeneros';
import deleteGenero from './components/generos/deleteGenero';
import editarGenero from './components/generos/editarGenero'
import verLibrosAsociados from './components/generos/verLibrosAsociados';

import Cardslibros from './components/libros/CardsLibros';
import deleteLibro from './components/libros/DeleteLibro';
import devolver from './components/libros/DevolverLibro';
import editarLibro from './components/libros/EditarLibro';
import PostLibro from './components/libros/PostLibro';
import prestar from './components/libros/PrestarLibro';

import * as serviceWorker from './serviceWorker';

import {Provider} from 'react-redux';
import  { createStore } from 'redux';
import tpReducer from './Reducers/tpReducer';
import { BrowserRouter as Router, Route } from 'react-router-dom'

var store = createStore(tpReducer);


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route exact path="/" component={Home} />

            <Route exact path="/Cardspersonas"      component={Cardspersonas} />
            <Route exact path="/postPersonas"       component={postPersonas} />
            <Route exact path="/editarPersona"      component={editarPersona} />
            <Route exact path="/deletePersona"      component={deletePersona} />
            <Route exact path="/verLibrosPrestados" component={verLibrosPrestados} />

            <Route exact path="/Cardsgeneros"       component={Cardsgeneros} />
            <Route exact path="/postGeneros"        component={postGeneros} />
            <Route exact path="/deleteGenero"       component={deleteGenero} />
            <Route exact path="/editarGenero"       component={editarGenero} />
            <Route exact path="/verLibrosAsociados" component={verLibrosAsociados} />

            <Route exact path="/Cardslibros"        component={Cardslibros} />
            <Route exact path="/DeleteLibro"        component={deleteLibro} />
            <Route exact path="/DevolverLibro"      component={devolver} />
            <Route exact path="/EditarLibro"        component={editarLibro} />
            <Route exact path="/PostLibro"          component={PostLibro} />
            <Route exact path="/PrestarLibro"       component={prestar} />


        </Router>
    </Provider>    
        , document.getElementById('root'));

serviceWorker.unregister();
