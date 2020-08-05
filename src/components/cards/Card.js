import React, {Fragment} from 'react'

import {Line} from 'rc-progress'
import  is_float  from 'locutus/php/var/is_float'

import '@fortawesome/fontawesome-free/css/all.css'

import { Card, Heading, Icon, Content } from 'react-bulma-components/dist'

import {Link} from 'react-router-dom'

const CardCom  = ({contenidos, id, header, classIcon, altTitle, cabeceraStyle, colorIcon}) =>{
  
  const formatter = new Intl.NumberFormat('es-VE', {
		style: 'currency',
		currency: 'VEF',
		minimumFractionDigits: 0
    })
    
  const formatterDecimal = new Intl.NumberFormat('es-VE', {
		style: 'decimal',
		
		minimumFractionDigits: 0
	  })
  
    return (
    	<Fragment>
        <Card>
          <Card.Header>
            <Card.Header.Title>
              {header}
            </Card.Header.Title>
            <Card.Header.Icon>
              {classIcon === "Notificacion"?
                <Icon>
                  <i className="fas fa-check-circle text-tercer-color" aria-hidden="true"></i>
                </Icon>
              :
                <Icon title={altTitle}>
                  <i className={classIcon} style={{color:colorIcon}} aria-hidden="true"></i>
                </Icon>
              }
            </Card.Header.Icon>
          </Card.Header>
          <Card.Content className="card-content">
            <Content>
              {contenidos?contenidos.map(contenido=>(
                <Fragment>
                <p><span><strong>{contenido.contenido.titulo}{contenido.contenido.titulo? ":" :null} </strong></span>{contenido.contenido.tipo==="moneda" && Number.isInteger(contenido.contenido.contenido) || is_float(contenido.contenido.contenido) ?formatter.format(contenido.contenido.contenido):contenido.contenido.contenido}</p>
                {contenido.contenido.tipo ==="Bar-progreso"?<Line percent="50" strokeWidth="4" strokeColor="#584FB6" />:null}
                
                </Fragment>
              )):null}

            </Content>
          </Card.Content>
          {id?<Card.Footer className="card-footer">
            <Card.Footer.Item><Link to={`proyectos/${id}`}>Ver</Link></Card.Footer.Item>
          </Card.Footer>:null}
        </Card>
    	</Fragment>
    )
}


export default CardCom 