import React, {Fragment} from 'react'

//react-router-dom
import {NavLink} from 'react-router-dom'

//redux
import {connect} from 'react-redux'
import {RenderMenuState} from '../../actions/loginActions'
import {desUsuario} from '../../actions/authActions'

import Logo from './logo.svg'
const Header = ({renderHeader, desUsuario}) =>{

  

    return(
      <Fragment>
        {renderHeader ===true ? 
          <div className ="pos-fixed full-w left-0 color-gris-fondo top-0 z-index-header">
           <nav className="navbar full-w margin-2" role="navigation" aria-label="main navigation">
              <div className="navbar-brand">
                <a className="navbar-item margin-2-left" href="https://bulma.io">
                  <img src={Logo} width="123" height="35" alt='img'/>
                </a>
              </div>
              <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-end margin-2-righ">
                    <div className="navbar-item has-dropdown is-hoverable">
                      <a className="navbar-link is-size-7 letra-gruesa" href="">
                        Nombre Hidrologica
                      </a>
                    <div className="navbar-dropdown is-boxed">
                      <a className="navbar-item" href="https://bulma.io/documentation/overview/start/" onClick= {desUsuario}>
                        Salir
                      </a>   
                  </div>
                </div>
              </div>
            </div>  

            
                      
          </nav>
          <div className ="columns padding-menu is-size-7">
            <div className="column is-1-mobile is-1-fullhd margin-left-0 flex-grow-none ">
              <NavLink to="/dashboard" activeClassName="active">
                Dashboard
              </NavLink>
            </div>
            <div className="column is-1-mobile  is-1-fullhd margin-left-0 flex-grow-none is-1-mobile">
              <NavLink to="/proyectos" activeClassName="active">
                Proyectos
              </NavLink>
            </div>
            <div className="column is-1-mobile is-1-fullhd margin-left-0 flex-grow-none is-1-mobile">
              <NavLink to="/otro" activeClassName="active">
                Mapa
              </NavLink>
            </div>
          </div>

          


        </div>
          : null}
          
        </Fragment>
    )
}

const mapStateToProps = (state) => ({
    renderHeader: state.renderHeader.renderHeader
})

export default connect (mapStateToProps, {RenderMenuState, desUsuario})(Header)