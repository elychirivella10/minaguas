import React, {useState, Fragment} from 'react'
import { Map, TileLayer,  GeoJSON, FeatureGroup} from 'react-leaflet'
import { EditControl } from 'react-leaflet-draw'
import "leaflet-draw/dist/leaflet.draw.css"

const MapaMuestra = ({geojson, geojson2, handleChangeMapa, coordenadas_setor, coordenadas_obra, type})=> {
  const [datos, guardarDatos] = useState({
      lat:6.6181996,
      lng:-65.6477033,
      zoom:5.5,
      control: true
      
    })

  let position = [datos.lat, datos.lng]

  return (

    <Map center={position} zoom={datos.zoom} zoomControl={datos.control}>
    
    <TileLayer
      url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      maxZoom = {19}
    />

    {type === "registro"?
    <Fragment>
      <GeoJSON
        data={coordenadas_obra}
      />
      <GeoJSON
        data={coordenadas_setor}
      />
      </Fragment>
    :null
    }

    
    {geojson && geojson2?
    <Fragment>
      <GeoJSON
        data={geojson}
      />
      <GeoJSON
        data={geojson2}
      />
      </Fragment>:null
    }

<FeatureGroup>
    <EditControl
      position='topright'
      
      onCreated={handleChangeMapa}
      
      draw={{
        rectangle: false
      }}
    />
  </FeatureGroup>
  </Map>

  );
}

export default MapaMuestra


