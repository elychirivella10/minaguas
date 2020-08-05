import React from 'react'

//Mapa
import MapaMuestra from '../mapa/MapaMuestra'

//Card
import CardCom from '../cards/Card'

//Panel
import PanelCom from '../panels/Panel'

const Actualizacion = () =>{

    return(
        <section className="section container-general margin-top-app centrar-vertical">
            <div className ="container">
              <div className ="columns">
	              <div className ="column is-two-fifths is-background-transparent is-shadow-none">
	              	<div className="leaflet-container">
		                <MapaMuestra
		                	geojson={{"type": "FeatureCollection",
							  "features": [
							    {
							      "type": "Feature",
							      "properties": {},
							      "geometry": {
							        "type": "Polygon",
							        "coordinates": [
							          [
							            [
							              -68.1317138671875,
							              9.947208977327033
							            ],
							            [
							              -68.4832763671875,
							              9.893098633379584
							            ],
							            [
							              -68.45581054687499,
							              9.557417356841308
							            ],
							            [
							              -67.9833984375,
							              9.665738395188692
							            ],
							            [
							              -68.1317138671875,
							              9.947208977327033
							            ]
							          ]
							        ]
							      }
							    }
							  ]}}
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
											contenido:"nombre del proyecto"
										}
									}, 
									{
										contenido:{
											titulo:"Solucion",
											contenido:"Comunitaria"
										}
									},
									{
										contenido:{
											titulo:"Hidrologica",
											contenido:"Hidrolago"
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
											contenido:"Miranda"
										}
									}, 
									{
										contenido:{
											titulo:"Municipio",
											contenido:"Urdaneta"
										}
									},
									{
										contenido:{
											titulo:"Parroquia",
											contenido:"Cua"
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
											
											contenido:"Descripcion de todo el proyeto este"
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
									generalContent = "Accion gerenal 1"
									subTitleTwo = "Acciones Especificas"
									
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
											contenido:500.00,
											tipo:"moneda"	
										}
									}, 
									{
										contenido:{
											titulo:"Ejecucion Financiera Final",
											contenido:600000.00,
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
											contenido:"10/06/12"
										}
									}, 
									{
										contenido:{
											titulo:"Ejecucion Inicio-Final",
											contenido:"15/12/13"
										}
									},
									{
										contenido:{
											titulo:"Ejecucion Final-Inicio",
											contenido:"10/06/12"
										}
									},
									{
										contenido:{
											titulo:"Ejecucion Final-Final",
											contenido:"15/12/13"
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
											contenido:"1 semana"
										}
									}, 
									{
										contenido:{
											titulo:"Despues",
											contenido:"3 dias"
										}
									},
									{
										contenido:{
											titulo:"Poblacion",
											contenido:"250000"
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
											contenido:"En progreso"
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

export default Actualizacion