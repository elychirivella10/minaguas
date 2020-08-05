import React, {Fragment, useEffect} from 'react'

//graficos
import Soluciones from '../graficos/Soluciones'
import ApexChart from '../graficos/Estatus'
import Proyectos from '../graficos/Proyectos'
import Poblacion from '../graficos/Poblacion'

//multimedia
import Icono_Gota from './icon-gota-agua.svg'

//router dom
import {withRouter} from 'react-router-dom'

//moment
import moment from 'moment'

//redux
import {connect} from 'react-redux'
import {graficoArribaIzquierda} from '../../actions/graficosActions'
import {resetGrafico} from '../../actions/graficosActions'
import {graficoArribaCentro} from '../../actions/graficosActions'
import {graficoArribaDerecha} from '../../actions/graficosActions'
import {graficoAbajoIzquierda} from '../../actions/graficosActions'
import {graficoAbajoCentro} from '../../actions/graficosActions'
import {firebaseObtener} from '../../actions/firebaseActions'
import {obtenerProyectosPreview} from '../../actions/proyectosActions'
import {resetProyectos} from '../../actions/proyectosActions'




const Dashboard = ({firebaseDatos, resetProyectos,firebaseObtener, obtenerProyectosPreview ,graficoArribaIzquierda, graficoArribaCentro, resetGrafico, graficoArribaDerecha, graficosReducer, graficoAbajoIzquierda, graficoAbajoCentro}) =>{


	useEffect(() => {
		async function  graficos(){
			await resetProyectos()
			await resetGrafico()
			await graficoArribaIzquierda()
			await graficoArribaCentro()
			await graficoArribaDerecha()
			await graficoAbajoIzquierda()
			await graficoAbajoCentro()
			await firebaseObtener()
			await obtenerProyectosPreview()
		}
			graficos()
	}, [graficoArribaIzquierda, graficoArribaCentro, graficoArribaDerecha, graficoAbajoIzquierda, graficoAbajoCentro])

	if (!graficosReducer) {
		return null
	}

	console.log(graficosReducer)
    return (

              <section className="section container-general margin-top-app centrar-vertical is-size-7-desktop">
                <div className="container ">
                  <div className ="is-variable is-4-fullhd columns margin-4 is-full-mobile is-variable">
                  	<div className ="column is-two-fifths  fondo-morado text-white">
                  		<p>Proyectos</p>
                  		<p className ="is-size-7">Cantidad de proyectos por Hidrologicas</p>
                  		<Proyectos
                        ancho="100%"
                        fill="#fff"
                        fill_2="#62FCC6"
						background="rgba(98,252,198,0.2)"
						graficosReducer={graficosReducer[0]}
                      />
                  	</div>

                  	<div className ="column fondo-ciudad fondo-blanco">
                  		<p>Soluciones</p>
                  		<Soluciones 
							graficosReducer={graficosReducer[1]}
						/>
                  	</div>

                  	<div className ="column degradado-gris text-white">
                  		<p>Soluciones por Tipos</p>
                  		<p className ="is-size-7"></p>
                  		<Poblacion
                  			ancho="100%"
                  			fill="#62FCC6"
                  			fill_2="#fff"
							background="rgba(0, 157, 103, 0.17)"
							graficosReducer={graficosReducer[2]}  
                  		/>
                  	</div>

                  </div>

                  <div className ="is-variable is-4-fullhd columns" id="margin-1-5-top">
                  	<div className ="column fondo-blanco">
                  		<p>Estatus</p>
                  		<p className ="is-size-7">Estado de los servicios</p>
                  		<ApexChart
							graficosReducer={graficosReducer[3]}
						/>
                  		<div className ="is-size-full leyenda">
                  			<p className="por-iniciar">Por iniciar</p>
                  			<p className="en-ejecucion">En ejecucion</p>
                  			<p className="finalizado">Finalizado</p>
                  		</div>
                  	</div>

                  	<div className ="column fondo-ciudad fondo-blanco">
                  		<p>Servicios</p>
                  		<p className ="is-size-7">Estado de los servicios</p>
                  		<figure className="image is-48x48 is-flex is-horizontal-center margin-3">
        						    <img src={Icono_Gota} alt='icon'/>
          						</figure>

          						<div className = "is-flex is-flex-centered is-size-7">
          							<div>
          								<div className = "circulo-servicios is-flex is-flex-column is-flex-centered ">
          									<p>Buen Servicio</p>
											<p className = "is-size-4">{graficosReducer[4]?graficosReducer[4][0].poblacion:null}</p>
          								</div>
          							</div>
          							<div>
          								<div className = "circulo-servicios is-flex is-flex-column is-flex-centered ">
          									<p>Servicio Deficiente</p>
          									<p className = "is-size-4">{graficosReducer[4]?graficosReducer[4][1].poblacion:null}</p>
          								</div>
          							</div>
          							<div>
          								<div className = "circulo-servicios is-flex is-flex-column is-flex-centered">
          									<p>Sin servicio</p>
          									<p className = "is-size-4">{graficosReducer[4]?graficosReducer[4][2].poblacion:null}</p>
          								</div>
          							</div>
          						</div>
                  	</div>

                  	<div className ="column is-two-fifths fondo-blanco">
                  		<p>Ultimos reportes</p>

						  {firebaseDatos[0]?firebaseDatos[0].map(dato => 
							
							
							
							  (
							  <div class="box is-shadowless padding-bottom-0 padding-right left">
							  <article class="media">
								  <div class="media-left">
						  	<span className ="afterReporte backgroundGreen">{dato.municipio.slice(0, 1)}</span>	
								  </div>
								  <div class="media-content">
								  <div class="content">
									  <p className = "pos-relative">
						  				<strong>{dato.estado}</strong>  <small className="paddingReporte">{dato.nombre}</small> <small className = "derecha">{dato.fecha}</small>
									  <br/>
									  <small>{dato.municipio}</small>
									  
									  </p>
								  </div>
								  
								  </div>
							  </article>
						  	</div>
						  ))
						  
						 
						 :null}
						  
                  	</div>
                  </div>
                </div>
              </section>
    )
}

const mapStateToProps = (state) => ({
	graficosReducer: state.graficosReducer.graficos,
	firebaseDatos: state.firebaseDatos.proyectos
});

export default withRouter(connect (mapStateToProps, {resetGrafico, resetProyectos, firebaseObtener, obtenerProyectosPreview , graficoArribaIzquierda, graficoArribaCentro, graficoArribaDerecha, graficoAbajoIzquierda, graficoAbajoCentro})(Dashboard))