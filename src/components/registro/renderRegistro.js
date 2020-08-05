import React, {useState, Fragment} from 'react';

import 'animate.css'


import '../../css/step-bulma.css'

import Swal from 'sweetalert2'

import {Intervenciones, Unidades} from './accionesEspecificas'

import '@fortawesome/fontawesome-free/css/all.css'

import Step from '../Bulma/Step'

import Calendar from '../Bulma/Calendar'


import {Icon} from 'react-bulma-components/dist'

import Mapa from '../mapa/MapaMuestra'

//router-dom
import {withRouter} from 'react-router-dom'

//redux
import {connect} from 'react-redux'
import {firebaseGuardar} from '../../actions/firebaseActions'

//axios 
import axios from 'axios'

//funcion
import {enviarRegistro} from '../../helpers/funciones'


const accionInicial = {
  intervencion:0,
  cantidad:0,
  unidad:0, 
  descripcionAccion: ""
}

const RenderRegistro = ({usuario, firebaseGuardar}) => {
    const [registroActive, guardarActiveRegistro]= useState(false)
    const [etapaRegistro, guardarEtapaRegistro]= useState(0)
    const [etapaAccionEspecifica, guardarEtapaAccionEspecifica]= useState("")
    const [stateRegistro, guardarStateRegistro]= useState({
      nombre:"", solucion:"", descripcion:"",
      accion_general:"",acciones_especificas:[],
      estado:"", municipio:"", parroquia:"", coordenadas_obra:"", coordenadas_setor:"",
      poblacion:0,
      tiempo_estimado_inicio:"", tiempo_estimado_final:"", cicloMedida:"", cicloCantidad:""
    })
    const [accion_especifica, guardarAccionEspecifica] = useState({
      intervencion:0,
      cantidad:0,
      unidad:0,
      descripcionAccion: ""
    })

    const [ubicacionTemporal, guardarUbicacionTemporal] = useState({
      municipios:[],
      parroquias:[]
    })

    const activeRegistro = (e) =>{
        if (registroActive===true) {
          guardarActiveRegistro(false)
        } else{
          guardarActiveRegistro(true)
        }
    }

    const onSubmitAccion = () =>{
      const {intervencion, cantidad, unidad, descripcionAccion} = accion_especifica
      if (intervencion !== 0 && cantidad !== 0 && unidad !==0) {
        console.log(stateRegistro.acciones_especificas)
        const newStateAcciones = stateRegistro.acciones_especificas.push({intervencion, cantidad, unidad, descripcionAccion})
        guardarAccionEspecifica(accionInicial)
      }
    }

    const onSubmit = async (e)  =>{
      e.preventDefault()
      if (etapaRegistro === 3) {
        const {nombre, solucion, descripcion, accion_general, acciones_especificas, estado, municipio, parroquia, coordenadas_obra, coordenadas_setor, poblacion, tiempo_estimado_inicio, tiempo_estimado_final, cicloMedida, cicloCantidad} = stateRegistro
        if (nombre && solucion && descripcion && accion_general && acciones_especificas && coordenadas_obra && coordenadas_setor && poblacion && tiempo_estimado_inicio && tiempo_estimado_final && cicloMedida && cicloCantidad) {
          
          const myHeaders = new Headers()
          myHeaders.append('Content-type', 'application/json')
    
          const body = enviarRegistro(nombre, solucion, descripcion, accion_general, acciones_especificas, coordenadas_obra, coordenadas_setor, poblacion, tiempo_estimado_inicio, tiempo_estimado_final, cicloMedida, cicloCantidad, usuario)
          console.log(body)
          
          const myConfig = {
            headers: myHeaders,
            body : JSON.stringify(body)  
          }

          const respuesta = await axios.post('http://10.0.13.118/Mapa_soluiones/mapa_soluciones/public/api/registro/proyetos', myConfig)
          console.log(respuesta.data)

          const firebaseAgregar = {
            "id": respuesta.data.id_proyecto,
            "nombre":respuesta.data.Proyecto,
            "hidrologica": usuario[0].hidrologica,
            "estado":respuesta.data.Estado, 
            "municipio":respuesta.data.Municipio,
            "solucion":respuesta.data.Solucion

          }
          firebaseGuardar(firebaseAgregar)

        }
      } else {
        guardarEtapaRegistro(parseInt(etapaRegistro+1,10))
      }
    }

    const cargarEstatus = (e) => {
      guardarEtapaRegistro(parseInt(e.target.classList[1]))
    }

    const handleChange = async (e) =>{
      if (e.target.name === "acciones_especificas") {
            guardarAccionEspecifica({...accion_especifica, [e.target.classList[0]]:e.target.value}) 
            
      } else if(e.target.name !== "acciones_especificas"){
        
        guardarStateRegistro({...stateRegistro, [e.target.name]:e.target.value})


        if (e.target.name === "estado") {

          const body = {
            id_estado : e.target.value
          }
          const myHeaders = new Headers()
          myHeaders.append('Content-type', 'application/json')

          const myConfig = {
            headers: myHeaders,
            body : JSON.stringify(body)  
          }

          const respuesta = await axios.post('http://10.0.13.118/Mapa_soluiones/mapa_soluciones/public/api/municipios', myConfig)

          
          guardarUbicacionTemporal({...ubicacionTemporal, ["municipios"]:respuesta.data})
 
        } else if (e.target.name === "municipio") {
          
          const body = {
            id_municipio : e.target.value
          }
          const myHeaders = new Headers()
          myHeaders.append('Content-type', 'application/json')

          const myConfig = {
            headers: myHeaders,
            body : JSON.stringify(body)  
          }

          const respuesta = await axios.post('http://10.0.13.118/Mapa_soluiones/mapa_soluciones/public/api/parroquias', myConfig)

          guardarUbicacionTemporal({...ubicacionTemporal, ["parroquias"]:respuesta.data})
          
        }
      }
      
    }


    //evento para agregar los datos del mapa
    const handleChangeMapa = (e) =>{
      const type = e.layerType;
     const layer = e.layer;
     console.log(type)

     let shape = layer.toGeoJSON()
     
     shape.properties["nombre"]="ely"
     const shape_for_db = JSON.stringify(shape)
     const Geojson = {type, ["features"]:[shape]}
     console.log(JSON.stringify(Geojson))
     if (Geojson.type === "polygon") {
      guardarStateRegistro({...stateRegistro, ["coordenadas_obra"]:Geojson})
     }
     else{
      guardarStateRegistro({...stateRegistro, ["coordenadas_setor"]:Geojson})
     }
    }
    

  if (registroActive === true && etapaRegistro !== false) {
    if (document.getElementById("estatusRegistroPanel")) {
      setTimeout(function(){
        for (let index = 0; index < 4; index++) {

          document.getElementById("estatusRegistroPanel").childNodes[index].classList.remove("is-active")
          document.getElementById("estatusRegistroPanel").childNodes[index].classList.remove("has-gaps")

          

          if (document.getElementById("estatusRegistroPanel").childNodes[index].classList[0] == etapaRegistro) {
            document.getElementById("estatusRegistroPanel").childNodes[index].classList.add("is-active")
            document.getElementById("estatusRegistroPanel").childNodes[index].classList.add("has-gaps")
          }
          
          
        }

      }, 100);
      
    }
    
  }


  //filtro para acciones especificas
  let FilterSpecific = ""

	if (accion_especifica.intervencion == "1" || accion_especifica.intervencion == "2" || accion_especifica.intervencion == "3" || accion_especifica.intervencion == "4" || accion_especifica.intervencion == "5") {
		FilterSpecific = Unidades.filter(uni => uni.idIntervencion == 1 )
    FilterSpecific.push(...Unidades.filter(uni => uni.idIntervencion == 5 ))
	}else if (accion_especifica.intervencion == "6" || accion_especifica.intervencion == "7"){
    FilterSpecific = Unidades.filter(uni => uni.idIntervencion == 2 )
    FilterSpecific.push(...Unidades.filter(uni => uni.idIntervencion == 5 ))
	}else if (accion_especifica.intervencion == "8"){
    FilterSpecific = Unidades.filter(uni => uni.idIntervencion == 3)
    FilterSpecific.push(...Unidades.filter(uni => uni.idIntervencion == 5 ))
	}else if (accion_especifica.intervencion == "9") {
    FilterSpecific = Unidades.filter(uni => uni.idIntervencion == 4 )
    FilterSpecific.push(...Unidades.filter(uni => uni.idIntervencion == 5 ))
  }

    return (
        <Fragment>
        <div className="layout-logo centrar-vertical align-items-center fondo-morado pointer animate__backInRight animate__animated animate__bounce animate__fast" onClick={activeRegistro}>
            <Icon>
                  <i className="fas fa-plus text-white animate__tada" aria-hidden="true" ></i>
            </Icon>
        </div>

        <div>
          
          {registroActive? 
            <div className="columns modal-registro" >
              <div className = " is-size-7-desktop column is-two-fifths-fullhd is-three-fifths-desktop modal-registro animate__backInRight animate__animated animate__bounce animate__faster">
                <div className = "box">
                  
                  <div className="columns is-multiline">
                  
                  <div className="column">
                    <Step cargarEstatus= {cargarEstatus}/>
                  </div>

                    <div className="column is-full">
                        <div className="box">
                          <p><strong>Datos proyecto</strong></p>
                          <br/>
                          <form>

                          {etapaRegistro === 0?
                            <Fragment>
                            <div className="columns is-multiline">
                              
                                  <div className="column is-half ">
                                <div className="field">
                                  <label className="label">Nombre proyecto</label>
                                  <div className="control">
                                    <input className="input" type="text" placeholder="Nombre proyecto" name="nombre" value={stateRegistro.nombre} onChange = {handleChange} />
                                  </div>
                                </div>
                              </div>

                            <div className="column is-half">
                              <div className="field">
                                <label className="label">Tipo solucion</label>
                                  <p className="control has-icons-left">
                                    <span className="select">
                                      <select name = "solucion" defaultValue={stateRegistro.solucion} onChange = {handleChange}>
                                        <option selected value="">--Soluciones--</option>
                                        <option value="1">Convencionales</option>
                                        <option value="2">Estructurantes</option>
                                        <option value="3">Comunitarias</option>
                                        <option value="4">Fuentes</option>
                                      </select>
                                    </span>
                                    <span className="icon is-small is-left">
                                      <i className="fas fa-globe"></i>
                                    </span>
                                  </p>
                                </div>
                            </div>
                            
                            <div className="column">
                              <div className="field">
                                <label className="label">Nombre proyecto</label>
                                <div className="control">
                                  <textarea className="textarea is-hovered" type="text" placeholder="Hovered textarea" name="descripcion" value={stateRegistro.descripcion} onChange = {handleChange}></textarea>
                                </div>
                              </div>
                            </div>
                                
                          </div>
                          </Fragment>
                          :null}

                          {etapaRegistro === 1?
                            <div className = "vh50">
                              <div className="field has-addons has-addons-centered">
                            
                            <p className="control">
                              <span className="select">
                                <select name = "estado" onChange={handleChange} value ={stateRegistro.estado}>
                                  <option selected value="">--Estado--</option>
                                  {usuario?usuario[0].estados.map(estado => (
                                    <option value ={estado.id_estado}>{estado.estado}</option>
                                  )):null}
                                        
                                  
                                </select>
                              </span>
                            </p>
                          
                            <p className="control">
                            <span className="select">
                                <select  name = "municipio" onChange={handleChange} value ={stateRegistro.municipio}>
                                  <option>---Municipio---</option>
                                  {ubicacionTemporal.municipios?ubicacionTemporal.municipios.map(municipios => (
                                    <option value ={municipios.id_municipio}>{municipios.municipio}</option>
                                  )):null}
                                  
                                </select>
                              </span>
                            </p>

                          <p className="control">
                            <span className="select">
                              <select name ="parroquia" value ={stateRegistro.parroquia} onChange={handleChange}>
                              <option>---Parroquia---</option>
                                {ubicacionTemporal.parroquias?ubicacionTemporal.parroquias.map(parroquia => (
                                    <option value ={parroquia.id_parroquia}>{parroquia.parroquia}</option>
                                  )):null}
                                
                              </select>
                            </span>
                          </p>
                          
                          
                        </div>
                        
                              <Mapa type = "registro" handleChangeMapa ={handleChangeMapa} coordenadas_obra = {stateRegistro.coordenadas_obra} coordenadas_setor = {stateRegistro.coordenadas_setor}/>
                            </div>
                          :null}

                          {etapaRegistro === 2?
                          <Fragment>
                            
                            <div className="column">
                              <div className="field">
                                <label className="label">Accione General</label>
                                <div className="control is-loading">
                                  <input className="input" type="text" placeholder="Normal input" name="accion_general" onChange={handleChange}/>
                                </div>
                              </div>
                            </div>

                            <div className="column">
                            <label className="label">Acciones Especificas</label>
                              <div className="field">
                                <label className="label">Detalle</label>
                                <div className="control">
                                  <textarea className="descripcionAccion textarea is-hovered" type="text" placeholder="Hovered textarea" name="acciones_especificas"   onChange = {handleChange}></textarea>
                                </div>
                              </div>
                            
                            
                            <div className="field has-addons has-addons-centered">
                            
                              <p className="control">
                                <span className="select">
                                  <select className="intervencion" name = "acciones_especificas" onChange={handleChange} value ={accion_especifica.intervencion}>
                                    <option>Seleccione intervencion</option>
                                    {Intervenciones.map(intervercion => 
                                    
                                      (<option className={`${intervercion.idIntervencion}`} value = {intervercion.id}>{intervercion.nombre}</option>)
                                    

                                    )}
                                    
                                  </select>
                                </span>
                              </p>
                            
                              <p className="control">
                                <input className="cantidad input" type="number" placeholder="Cantidad" name = "acciones_especificas"  value={accion_especifica.cantidad} onChange={handleChange}/>
                              </p>

                            <p className="control">
                              <span className="select">
                                <select className = "unidad" name ="acciones_especificas" value ={accion_especifica.unidad} onChange={handleChange}>
                                  {FilterSpecific?FilterSpecific.map(unidad => 
                                    (<option value = {unidad.id}>{unidad.Unidad}</option>)
                                  

                                  ):null}
                                  
                                </select>
                              </span>
                            </p>
                            
                            <p className="control">
                              <a className="button is-primary" onClick = {onSubmitAccion}>
                                Agregar
                              </a>
                            </p>
                          </div>
                          </div>
                        </Fragment>
                        :null}

                        {etapaRegistro === 3?
                        <Fragment>
                          <div className="column">
                            <Calendar guardarStateRegistro={guardarStateRegistro} stateRegistro={stateRegistro} label="Lapso de tiempo estimado"/>
                            <div className="field">
                              <label className="label">Poblacion beneficiada</label>
                              <p className="control">
                                    <input className="poblacion input" type="number" onChange={handleChange} placeholder="poblacion" name = "poblacion"  value={stateRegistro.poblacion} onChange={handleChange}/>
                              </p>
                            </div>
                          </div>

                            <div className="column">
                                <label className="label">Ciclo Actual</label>
                              <div className="field has-addons has-addons-centered">
                                <p className="control">
                                  <span className="select">
                                    <select name="cicloMedida" onChange={handleChange}>
                                      <option >---</option>
                                      <option value="Dia">Dia</option>
                                      <option value="Semana">Semana</option>
                                      <option value="Mes">Mes</option>
                                    </select>
                                  </span>
                                </p>
                                <p className="control">
                                  <input className="input" type="text"  onChange={handleChange} placeholder="" name="cicloCantidad"/>
                                </p>
                                
                              </div>
                            </div>
                          </Fragment>
                          
                          
                          
                        
                        :null}



                          

                          

                          <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                              <a className="button is-primary" onClick = {onSubmit}>
                                  {etapaRegistro===3?"Enviar":"Avanzar"}
                              </a>
                            </p>
                          </div>
                          
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          :null}
        </div>
        </Fragment>
    );
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuarios  
});

export default withRouter(connect (mapStateToProps, {firebaseGuardar})(RenderRegistro))