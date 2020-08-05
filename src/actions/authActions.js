import {AUTHENTICAR_USUARIO, DESLOGEAR_USUARIO} from '../actions/types'
import store from '../store'

import axios from 'axios'

import {rutaAxios} from '../variablesGoblales'



export const authUsuario = (body)  => async dispatch => {
    const myHeaders = new Headers()
	    myHeaders.append('Content-type', 'application/json')

	    const myConfig = {
	      headers: myHeaders,
	      body : JSON.stringify(body)  
	    }
    const respuesta = await axios.post(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/authenticate`, myConfig)

    store.subscribe( () => {
        localStorage.setItem('Token', JSON.stringify(respuesta.data.Token))
    });
    

    setTimeout(function(){ dispatch ({
        type:AUTHENTICAR_USUARIO, 
        payload: true
    }) },1000);

    
}

export const desUsuario = () => {
    localStorage.removeItem("Token");
    return {
        type:DESLOGEAR_USUARIO
    }

    window.locate('/login')
}