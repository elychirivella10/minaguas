import React, {useState, Fragment, useEffect} from 'react';

//img
import Logo from './logo.png'
import LoginImg from './login.png'

//redux 
import {connect} from 'react-redux'
import {authUsuario} from '../../actions/authActions'
import {RenderMenu} from '../../actions/loginActions'
import {agregarUsuario} from '../../actions/usuarioActions'

//router
import {withRouter} from 'react-router-dom'

const Login = ({authUsuario, RenderMenu, history, agregarUsuario}) => {
	const [infoUser, guardarInfoUser] =useState({
		user:'',
		pass:''
	})

	const handleChange = (e) => {
		guardarInfoUser({
			...infoUser,
			[e.target.name]:e.target.value})
	}
	
	const handleSubmit =(e)=>{
		e.preventDefault()
		authUsuario(infoUser)
		agregarUsuario(infoUser.user)
		setTimeout(function(){ history.push('/dashboard')},500);
		
	}

	useEffect(() => {
        RenderMenu(false)
    }, [RenderMenu]);

    return (
    	<Fragment>
	    	<nav className="navbar is-fixed-top background-transparent" role="navigation" aria-label="main navigation">
	  			<div className="navbar-brand">
	     			<a className="navbar-item" href="https://bulma.io">
				      <img src={Logo} width="150" height="50" alt='img'/>
				    </a>
	  			</div>
			</nav>
			<section className = "section container-morado centrar-vertical">
				<div className="container">
					<div className="columns is-centered margin-bottom-none">
						<div className = "column is-one-third fondo-gris-degradado border-8 is-text-centered padding-3-top">
							
								<figure className="image is-48x48 is-flex is-horizontal-center margin-3">
								  <img className="is-rounded" src={LoginImg} alt='img'/>
								</figure>

								<form className="field is-one-third" >
									<div className="control margin-2 padding-9-lados">
										<input className="input  is-rounded" type="text" placeholder="Usuario" name="user" onChange={handleChange}/>
									</div>

									<div className="control margin-4 padding-9-lados">
										<input className="input  is-rounded" type="password" placeholder="Contraseña" name="pass" onChange={handleChange}/>
									</div>
									<button className = " bottom-0 is-horizontal-center full-w bottom-login" onClick={handleSubmit}>Ingresar</button>	
								</form>
							
						</div>
					</div>
				</div>
			</section>
		</Fragment>
    );
}



export default withRouter(connect (null, {authUsuario,RenderMenu, agregarUsuario}) (Login));