import React, {useState, useEffect}  from 'react'

//Mapa
import MapaMuestra from '../mapa/MapaMuestra'

//Card
import CardCom from '../cards/Card'

//Panel
import PanelCom from '../panels/Panel'

//redux 
import {connect} from 'react-redux'
import {obtenerProyecto} from '../../actions/proyectosActions'

//react router dom
import {withRouter} from 'react-router-dom'


const Proyecto = ({obtenerProyecto, match, proyecto}) =>{

	
  useEffect(() => {
	  obtenerProyecto(match.params.id)
	  console.log(match.params.id)
  }, [obtenerProyecto])
	  

  
	  if (!proyecto) {
		  return null
	  }

	const specificsContent = [
		{
			id:0, nombre: "tarea1", cumplida:true
		},
		{
			id:1, nombre: "tarea2", cumplida:false
		},
		{
			id:2, nombre: "tarea3", cumplida:false
		}
	]



	return(
		<section className="section container-general margin-top-app">
            <div className ="container">
              <div className ="columns">
	              <div className ="column is-two-fifths is-background-transparent is-shadow-none">
	              	<div className="leaflet-container">
		                <MapaMuestra
							type = "proyecto"
							geojson={proyecto.obras?proyecto.obras:null}
							geojson2={proyecto.sector?proyecto.sector[0]:null}
							
		                />
	                </div>
                </div>
                <div className ="column background-transparent is-shadow-none">
	              	<div className="columns">
						<div className="column is-background-transparent is-shadow-none">
							<CardCom
							header = "Datos"
							classIcon = "fas fa-thermometer-three-quarters text-color-por-iniciar"
	              			altTitle="Por iniciar"
								contenidos= {[
									{
										contenido:{
											titulo:"Nombre",
											contenido:proyecto.nombre
										}
									}, 
									{
										contenido:{
											titulo:"Solucion",
											contenido:proyecto.solucion
										}
									},
									{
										contenido:{
											titulo:"Hidrologica",
											contenido:proyecto.hidrologica
										}
									}
								]
							}
							/>
						</div>
						<div className="column is-background-transparent is-shadow-none">
							<CardCom
								
								contenidos= {[
									{
										contenido:{
											titulo:"Estado",
											contenido:proyecto.estado
										}
									}, 
									{
										contenido:{
											titulo:"Municipio",
											contenido:proyecto.municipio
										}
									},
									{
										contenido:{
											titulo:"Parroquia",
											contenido:proyecto.parroquia
										}
									}
								]
							}
								
							/>
						</div>
						</div>

						<div className="columns">
						<div className="column is-background-transparent is-shadow-none">
							<CardCom
								header = "Descripcion del problema"
								contenidos= {[
									{
										contenido:{
											
											contenido:proyecto.descripcion
										}
									} 
								]
							}
							/>
						</div>
						</div>


						<div className="columns">
							<div className="column is-background-transparent is-shadow-none">
								<PanelCom
									header = "Acciones"
									subTitleOne = "Accion General"
									generalContent = {proyecto.accion_general}
									subTitleTwo = "Acciones Especificas"
									specificsContent = {proyecto[0]}
								/>
							</div>
						</div>

						<div className="columns">
						<div className="column column is-background-transparent is-shadow-none">
							<CardCom
								header = "Ejecucion Financiera Inicial"
								contenidos= {[
									{
										contenido:{
											titulo:"Ejecucion Financiera Inicial",
											contenido:proyecto.ejecucion_bolivares,
											tipo:"moneda"	
										}
									}, 
									{
										contenido:{
											titulo:"Ejecucion Financiera Final",
											contenido:proyecto.ejecucion_bolivares_final,
											tipo:"moneda"
										}
									},
									{
										contenido:{
											titulo:"Inversion",
											contenido:parseFloat(200),
											tipo:"moneda"
										}
									}
									
								]
							}
								classIcon = "fas fa-money-check-alt"
								colorIcon = "#584FB6" 
							/>
						</div>

						<div className="column column is-background-transparent is-shadow-none">
							<CardCom
								header = "Lapso De Ejecucion Inicio"
								contenidos= {[
									{
										contenido:{
											titulo:"Ejecucion Inicio-Inicio",
											contenido:proyecto.lapso_estimado_inicio
										}
									}, 
									{
										contenido:{
											titulo:"Ejecucion Inicio-Final",
											contenido:proyecto.lapso_estimado_culminacion
										}
									},
									{
										contenido:{
											titulo:"Ejecucion Final-Inicio",
											contenido:proyecto.lapso_culminación_inicio
										}
									},
									{
										contenido:{
											titulo:"Ejecucion Final-Final",
											contenido:proyecto.lapso_culminación_final
										}
									}
								]
							}
							/>
						</div>
						</div>

						<div className="columns">
						<div className="column column is-background-transparent is-shadow-none">
							<CardCom
								header = "Impacto"
								contenidos= {[
									{
										contenido:{
											titulo:"Antes",
											contenido: `${proyecto.ciclo_inicial} ${proyecto.opcion_ciclo_inicial}`
										}
									}, 
									{
										contenido:{
											titulo:"Despues",
											contenido:`${proyecto.ciclo_final} ${proyecto.opcion_ciclo_final}`
										}
									},
									{
										contenido:{
											titulo:"Poblacion",
											contenido:proyecto.poblacion_inicial
										}
									}
								]
							}
								classIcon = "fas fa-stopwatch"
								colorIcon = "#584FB6"
							/>
						</div>
						
						<div className="column column is-background-transparent is-shadow-none">
							<CardCom
								header = "Progreso"
								contenidos= {[
									{
										contenido:{
											titulo:"Estatus",
											contenido:proyecto.estatus
										}
									},
									{
										contenido:{
											titulo:"Progreso",
											contenido:52,
											tipo:"Bar-progreso"
										}
									}
									
								]
							}
								classIcon = "fas fa-tasks"
								colorIcon = "#584FB6"
							/>
						</div>

	              	</div>
                </div>
              </div>
            </div>
          </section>
		)
}

const mapStateToProps = (state) => ({
	proyecto: state.proyecto.proyecto
});

export default withRouter (connect(mapStateToProps, {obtenerProyecto})(Proyecto))