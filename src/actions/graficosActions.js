import {GRAFICO_ARRIBA_IZQUIERDA, GRAFICO_ARRIBA_CENTRO, GRAFICO_ARRIBA_DERECHA, GRAFICO_ABAJO_IZQUIERDA, GRAFICO_ABAJO_CENTRO, RESET_GRAFICO} from '../actions/types'

//importar store general
import store from '../store'

//importar axios
import axios from 'axios'

//
import {rutaAxios} from '../variablesGoblales'

export const graficoArribaIzquierda = (body) => async dispatch => {
    const myHeaders = new Headers()

	    myHeaders.append('Content-type', 'application/json')

	    const myConfig = {
            headers: myHeaders,  
        }

        const respuesta = await axios.get(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/api/informacion/proyectos/hidrologicas`, myConfig)
        
        setTimeout(function(){ dispatch ({
            type:GRAFICO_ARRIBA_IZQUIERDA, 
            payload: respuesta.data
        }) },1000);
} 
 
export const graficoArribaCentro = (body) => async dispatch => {

    const myHeaders = new Headers()

	    myHeaders.append('Content-type', 'application/json')

	    const myConfig = {
            headers: myHeaders,  
        }

        const respuesta = await axios.get(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/api/estadistica/tipos/soluciones`, myConfig)
        
        setTimeout(function(){ dispatch ({
            type:GRAFICO_ARRIBA_CENTRO, 
            payload: respuesta.data
        }) },1000);
};

export const graficoArribaDerecha = (body) => async dispatch => {

    const myHeaders = new Headers()

	    myHeaders.append('Content-type', 'application/json')

	    const myConfig = {
            headers: myHeaders,  
        }

        const respuesta = await axios.get(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/api/estadistica/tipos/unidades`, myConfig)
        
        setTimeout(function(){ dispatch ({
            type:GRAFICO_ARRIBA_DERECHA, 
            payload: respuesta.data
        }) },1000);
};

export const graficoAbajoIzquierda = (body) => async dispatch => {

    const myHeaders = new Headers()

	    myHeaders.append('Content-type', 'application/json')

	    const myConfig = {
            headers: myHeaders,  
        }

        const respuesta = await axios.get(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/api/estadistica/proyecto`, myConfig)
        console.log(respuesta.data)
        
        setTimeout(function(){ dispatch ({
            type:GRAFICO_ABAJO_IZQUIERDA, 
            payload: respuesta.data
        }) },1000);
};


export const graficoAbajoCentro = (body) => async dispatch => {

    const myHeaders = new Headers()

	    myHeaders.append('Content-type', 'application/json')

	    const myConfig = {
            headers: myHeaders,  
        }

        const respuesta = await axios.get(`http://${rutaAxios}Mapa_soluiones/mapa_soluciones/public/api/estadistica/situacion/servicio`, myConfig)
        
        setTimeout(function(){ dispatch ({
            type:GRAFICO_ABAJO_CENTRO, 
            payload: respuesta.data
        }) },1000);
};

export const resetGrafico = (body) => async dispatch => {

    
        
        dispatch ({
            type:RESET_GRAFICO
        }) 
};