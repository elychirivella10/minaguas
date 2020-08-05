import React, {Fragment} from 'react';
import {Polar} from 'react-chartjs-2';


const Poblacion = ({graficosReducer}) =>{
  let data = {}
  if (graficosReducer) {
    data ={
      datasets:[{
        data:[
          graficosReducer[0].cantidad,
          graficosReducer[1].cantidad,
          graficosReducer[2].cantidad,
          graficosReducer[3].cantidad,
          graficosReducer[4].cantidad,
          graficosReducer[5].cantidad,
          graficosReducer[6].cantidad,
          graficosReducer[7].cantidad,
          graficosReducer[8].cantidad,
          graficosReducer[9].cantidad,
          graficosReducer[10].cantidad,
          graficosReducer[11].cantidad,
          graficosReducer[12].cantidad,
          graficosReducer[13].cantidad
        ], 
        backgroundColor: [
          '#F6D955',
          '#CBEC10',
          '#EFEB9C',
          '#F8CB00',
          '#90F6E2',
          '#16F2AF',
          '#02F466',
          '#058570',
          '#0002FF',
          '#617EED',
          '#003586',
          '#77879F',
          '#B0C4E2',
          '#3F6DB4'
        ],
        label: 'My dataset' 
      }],
      labels: [
        'Red',
        'Green',
        'Yellow',
        'Grey',
        'Grey',
        'Grey',
        'Grey',
        'Grey',
        'Grey',
        'Grey',
        'Grey',
        'Grey',
        'Blue'
      ],
    }
  }
   
  return(<Fragment> {graficosReducer?
    <div>
        <Polar data={data} width={100}
          height={60} options={{legend:false, 
            scale: {
              gridLines:{
                color:'rgba(250, 250, 250, 0.2)',
                display:true,
                lineWidth:1 
              },
              ticks: {
                display:false,
                stepSize: 100,
                stepSize: 0.8
              },
              pointLabels: {
                display:false,
              }
            },
          }}/>
    </div>
  :null}
    
    </Fragment>)
}

export default Poblacion