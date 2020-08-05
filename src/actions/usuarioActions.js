import {AGREGAR_USUARIO} from '../actions/types'

//importar store general
import store from '../store'

//importar axios
import axios from 'axios'

//
import {rutaAxios} from '../variablesGoblales'

export const agregarUsuario = (body) => async dispatch => {
    const myHeaders = new Headers()

	    myHeaders.append('Content-type', 'application/json')

	    const myConfig = {
            headers: myHeaders,
            body : JSON.stringify(body)  
        }

        const respuesta = await axios.post(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/api/info/user`, myConfig)

        store.subscribe( () => {
            localStorage.setItem('infoUser', JSON.stringify(respuesta.data))
        });

        setTimeout(function(){ dispatch ({
            type:AGREGAR_USUARIO, 
            payload: respuesta.data
        }) },1000);
} 