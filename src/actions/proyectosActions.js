import {OBTENER_PROYECTOS_PREVIEW, RESET_PROYECTOS, OBTENER_PROYECTO} from './types'
import store from '../store'
import firebase from 'firebase'
import moment from 'moment'
import axios from 'axios'

import {rutaAxios} from '../variablesGoblales'


export const obtenerProyectosPreview = (body)  => async dispatch => {
  const myHeaders = new Headers()

  myHeaders.append('Content-type', 'application/json')

  const myConfig = {
        headers: myHeaders,  
    }

    const respuesta = await axios.get(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/api/informacion/general/proyectos`, myConfig)
    
    setTimeout(function(){ dispatch ({
        type:OBTENER_PROYECTOS_PREVIEW, 
        payload: respuesta.data
    }) },1000);

}

export const obtenerProyecto = (id_proyecto)  => async dispatch => {
  const myHeaders = new Headers()

  myHeaders.append('Content-type', 'application/json')

  const myConfig = {
        headers: myHeaders,  
    }

    const respuesta = await axios.get(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public//api/info/completa/proyecto/${id_proyecto}`, myConfig)
    
    setTimeout(function(){ dispatch ({
        type:OBTENER_PROYECTO, 
        payload: respuesta.data[0]
    }) },1000);

}

export const resetProyectos = (body) => async dispatch => {

    dispatch ({
        type:RESET_PROYECTOS
    }) 
}
