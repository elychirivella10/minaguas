import React, { PureComponent } from 'react';
import {
  BarChart, Bar,  Tooltip,ResponsiveContainer, 
} from 'recharts';

const data = [
  {
    name: 'Page A', uv: 2500, pv: 2500, amt: 2400,
  },
  {
    name: 'Page B', uv: 3000, pv: 1590, amt: 2210,
  },
  {
    name: 'Page C', uv: 2500, pv: 2500, amt: 2290,
  },
  {
    name: 'Page D', uv: 1555, pv: 2000, amt: 2000,
  },
  {
    name: 'Page E', uv: 4000, pv: 4000, amt: 2181,
  },
  {
    name: 'Page F', uv: 1020, pv: 2500, amt: 2500,
  },
  {
    name: 'Page G', uv: 2500, pv: 3000, amt: 2100,
  },
  {
    name: 'Page X', uv: 4300, pv: 1800, amt: 2100,
  },
  {
    name: 'Page M', uv: 3200, pv: 2500, amt: 1500,
  },{
    name: 'Page Z', uv: 2500, pv: 4200, amt: 2100,
  },
  {
    name: 'Page W', uv: 1500, pv: 900, amt: 3000,
  },
  {
    name: 'Page H', uv: 2200, pv: 2500, amt: 1900,
  },
  {
    name: 'Page L', uv: 3000, pv: 1500, amt: 1000,
  },
  {
    name: 'Page N', uv: 4000, pv: 900, amt: 1250,
  },
  {
    name: 'Page P', uv: 1900, pv: 2050, amt: 2100,
  },
  {
    name: 'Page K', uv: 1400, pv: 5000, amt: 2100,
  },
  {
    name: 'Page Q', uv: 4200, pv: 1600, amt: 2100,
  },
  {
    name: 'Page S', uv: 3000, pv: 1500, amt: 2100,
  },
  {
    name: 'Page V', uv: 3500, pv: 2400, amt: 2100,
  },
];

const CustomTooltip = ({graficosReducer, active, payload, label, index, fill, fill_2}) => {
  if (active && payload) {
    console.log(fill)
    if (payload[1]) {
      
        if (
          document.getElementById('label1') &&
          document.getElementById('label2')
        ) {
          document.getElementById('label1').style.backgroundColor=fill
          document.getElementById('label2').style.backgroundColor=fill_2
        }
      
      return (
      <div className="box degradado-morado-transparent" id="box">
        <p className ="text-white">{payload[0].payload.hidrologica}</p>
        <p className="label text-white is-size-7"><span id="label1"></span>{`${payload[0].dataKey}: ${payload[0].payload.cantidad}`}</p>
        <p className="label text-white is-size-7"><span id="label2"></span>{`${payload[1].dataKey}: ${payload[1].value}`}</p>
      </div>
    )
    }else{
      return (
      <div className="box degradado-morado-transparent">
        <p className ="text-white">{payload[0].payload.hidrologica}</p>
        <p className="label text-white is-size-7"><span id="label1"></span>{`${payload[0].dataKey} : ${payload[0].value}`}</p>
      </div>
    );
    }
  }
  return null
}

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/q4eonc12/';

  render() {
    return (
    <ResponsiveContainer width={this.props.ancho} aspect={4.0/1.5}>
      <BarChart
        
        data={this.props.graficosReducer}
        margin={{
          top: 45, right:30 , left:30 , bottom: 45,
        }}
        barSize={20}
        innerRadius={100}
        outerRadius = {100}
      >
      
        
        
        <Tooltip content={<CustomTooltip fill= {this.props.fill} fill_2= {this.props.fill_2}/>} cursor={{stroke:this.props.fill, fill:"none"}}/>
        <Bar dataKey="proyectosFinalizados" stackId="a" fill={this.props.fill_2} radius={[0 ,0, 20, 20]} barSize={6} background={{ fill: this.props.background, radius:20}}/>
        <Bar dataKey="cantidad" stackId="a" fill={this.props.fill}  radius={[20, 20, 0, 0]} barSize={6}/>
      </BarChart>
      </ResponsiveContainer>
    );
  }
}




