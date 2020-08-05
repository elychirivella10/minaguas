import React, {Fragment} from 'react'

//font awesome
import '@fortawesome/fontawesome-free/css/all.css'

import Card from '../cards/Card'

//router dom
import {withRouter} from 'react-router-dom'

//redux
import {connect} from 'react-redux'

const ListaProyectos = ({proyectosReducer}) =>{

  console.log(proyectosReducer)
    return (
    	<Fragment>

        
          
              <section className="section container-general margin-top-app">
                <div className ="container">
                  <div className ="columns is-multiline">
                  {proyectosReducer[0]?proyectosReducer[0].map(proyecto => 
                  { const solucion = proyecto.solucion.split([" o "]) 
                  return(
          <div className ="column  ">
          <Card
            header = {proyecto.solucion === "Local o Comunitaria"?solucion[1]:proyecto.solucion}
            id = {proyecto.id_proyecto}
            classIcon ="Notificacion"
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
                  contenido:proyecto.estatus
                }
              }
            ]
          }
          />
        </div>
        )}):null}
                    
                    
                    
                  </div>
                  
                </div>



                    

              </section>

                
            

    	</Fragment>
    )
}

const mapStateToProps = (state) => ({
  proyectosReducer: state.proyectosReducer.proyectos  
});

export default withRouter(connect (mapStateToProps)(ListaProyectos))

