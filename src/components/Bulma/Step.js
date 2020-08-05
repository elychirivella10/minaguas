import React from 'react';

const Step =({cargarEstatus})=>{
    return(

        <ul className="steps  is-narrow  is-centered has-content-centered is-primary" id="estatusRegistroPanel">
            <li className="0 steps-segment is-active has-gaps" name="datos">
                <span className="steps-marker 0 pointer" onClick = {cargarEstatus} name = "datos">
                    
                </span>
                <div className="steps-content">
                    <p className="heading">Datos</p>
                </div>
            </li>
            <li className="1 steps-segment" name="ubicacion">
                <span className="steps-marker 1 pointer" onClick = {cargarEstatus} >
                    
                </span>
                <div className="steps-content">
                    <p className="heading">Ubicacion</p>
                </div>
            </li>
            <li className="2 steps-segment " name="acciones">
                <span className="steps-marker 2 pointer" onClick = {cargarEstatus} name = 'acciones' >
                
                </span>
                <div className="steps-content" >
                <p className="heading">Acciones</p>
                </div>
            </li>
            <li className="3 steps-segment " name="tiempo">
                <span className="steps-marker  3 is-hollow pointer" onClick = {cargarEstatus} name = "tiempo">
                
                </span>
                <div className="steps-content" >
                <p className="heading">Tiempo y Beneficio</p>
                </div>
            </li>
            </ul>
    )
}
export default Step


