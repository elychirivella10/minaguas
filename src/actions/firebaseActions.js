import {OBTENER_PROYECTOS_FIREBASE} from './types'
import store from '../store'
import firebase from 'firebase'
import moment from 'moment'

const firebaseConfig = {
    apiKey: "AIzaSyAqLkf9cdM2egz0lK40derhtdUe4TBVKlk",
    authDomain: "mapa-de-soluciones.firebaseapp.com",
    databaseURL: "https://mapa-de-soluciones.firebaseio.com",
    projectId: "mapa-de-soluciones",
    storageBucket: "mapa-de-soluciones.appspot.com",
    messagingSenderId: "275514711895",
    appId: "1:275514711895:web:1cbc37f4ec885af3eca812",
    measurementId: "G-0S170BLLPB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig)

export const firebaseObtener = (body)  => async dispatch => {

    const ref =  firebase.database().ref().child('proyectos')

    ref.on('value', (datos) =>{

        if (datos.val()) {
            const array = Object.values(datos.val()).sort(function(a,b){ return new Date(b.date) - new Date(a.date)})
        
        setTimeout(function(){ dispatch ({
            type:OBTENER_PROYECTOS_FIREBASE, 
            payload: array
        }) },100);

        }
        
    })

    

}

export const firebaseGuardar = (body)  => async dispatch => {

    const fecha = moment().format('LTS');
    
    
    
        const ref =  firebase.database().ref('proyectos/' + body.id).set({
            "nombre": body.nombre,
            "hidrologica": body.hidrologica,
            "estado" : body.estado,
            "municipio" : body.municipio,
            "fecha" : fecha
    
          })
    

}
