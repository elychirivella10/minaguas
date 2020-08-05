import React, {useState} from 'react'
import {Panel} from 'react-bulma-components'
import {Icon} from 'react-bulma-components/dist'
import {Button} from "react-bulma-components/dist";



const PanelCom = ({header, subTitleOne, generalContent, subTitleTwo, specificsContent}) => {
	const [filter, changeFilter] = useState(false)
	const [actualizacion, guardarActualizacion] = useState(specificsContent)

	console.log(specificsContent)

	const active = (e) =>{
		const panel = document.getElementById("panel-active")
		for (let i = 0; i < panel.childNodes.length; i++) {
			if (panel.childNodes[i].classList.value === "is-active") {
				panel.childNodes[i].classList.remove("is-active")
		}
	}

		e.target.classList.add("is-active")
		changeFilter(e.target.name)
		
	}

	const handleChange = (e)=>{
		for (let index = 0; index < specificsContent.length; index++) {
			if (e.target.name == specificsContent[index].id) {
				if (e.target.value && specificsContent[index].cumplida === false) {
					let index = actualizacion.findIndex(el=> el.id ==e.target.name);
					actualizacion.splice(index, 1)
					actualizacion.push({["cumplida"]:1,["id"]:e.target.name, ["nombre"]:e.target.value})
					console.log(actualizacion)
					return actualizacion
					
				}else if(e.target.value && specificsContent[index].cumplida === 1){
					let index = actualizacion.findIndex(el=> el.id ==e.target.name);
					actualizacion.splice(index, 1)
					actualizacion.push({["cumplida"]:false,["id"]:e.target.name, ["nombre"]:e.target.value})
					console.log(actualizacion)
					return actualizacion
				}
			}
			
		}
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		console.log(e)
	}

	let FilterSpecific = ""

	if (filter === "cumplidas") {
		FilterSpecific = specificsContent.filter(specific => specific.cumplida === 1)
	}else if (filter === "no cumplidas"){
		FilterSpecific = specificsContent.filter(specific => specific.cumplida === 1)
	}else {
		FilterSpecific = specificsContent
	}

		

	return (
		<Panel className="is-primary">
			<Panel.Header>
				{header}
				{filter==="editar"?<Button className = "button is-primary float-right bottom-05rem pointer" onClick={handleSubmit} value="Enviar" color="#fff">Actualizar</Button>:null}
			</Panel.Header>
				

			<Panel.Tabs id="panel-active">
				<Panel.Tabs.Tab active onClick ={active}>Todas</Panel.Tabs.Tab>
				<Panel.Tabs.Tab name = "cumplidas" onClick ={active}>Cumplidas</Panel.Tabs.Tab>
				<Panel.Tabs.Tab name = "no cumplidas" onClick ={active}>No cumplidas</Panel.Tabs.Tab>
				<Panel.Tabs.Tab name = "editar" onClick ={active}>Editar</Panel.Tabs.Tab>
			</Panel.Tabs>


			<Panel.Block>
				{subTitleOne}
			</Panel.Block>

			<Panel.Block>
			<Icon>
                  <i className="fas fa-check-circle" aria-hidden="true"></i>
                </Icon>
				{generalContent}
			</Panel.Block>

			<Panel.Block>
				{subTitleTwo}
			</Panel.Block>

			{specificsContent ? FilterSpecific.map(specific => (
				  <Panel.Block> 
				      { specific.cumplida === 1?
				      	<Icon>
						  <i className="fas fa-check-circle text-tercer-color" aria-hidden="true"></i>
						</Icon>
				      	:
				      	
						  <Icon >
                  <i className="fas fa-check-circle"  aria-hidden="true"></i>
                </Icon>
				      }
				    <p>{specific.nombre}</p>
					{filter==="editar"?<span className="pos-absolute right-0">{specific.valor===1?<input type="checkbox" checked="true" value={specific.nombre}  onClick={handleChange} name={specific.id} id={specific.id}/>:<input type="checkbox" value={specific.nombre} onChange={handleChange} name={specific.id} id={specific.id}/>}</span>:null}
					
				</Panel.Block>
		  	)) :null}
		</Panel>
	)

}

export default PanelCom