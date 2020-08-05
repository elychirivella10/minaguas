import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Comunitaria', value: 50 },
  { name: 'Convencional', value: 50 },
  { name: 'Estructurante', value: 50 },
  { name: 'De fuente', value: 50 }
];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
  payload, percent, value,graficosReducer
  } = props;

  const fill = '#7569F0'
  const fillText = "#777"
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 15) * cos;
  const my = cy + (outerRadius + 15) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  
  return (
    <g>
      {payload.solucion.length ===19?<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fillText}>{payload.solucion.split(" o ")[1]}</text>:<text x={cx} y={cy} dy={8} textAnchor="middle" fill={fillText}>{payload.solucion}</text>}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        stroke = {fill}
        strokeWidth = "2"
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
        stroke = {fill}
        strokeWidth = "2"
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill}  strokeWidth = "2" fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 20} y={ey} textAnchor={textAnchor} style={{fontWeight:600}} fill={fillText}> {` ${(percent * 100).toFixed(2)}%`}</text>
    </g>
  );
};


export default class Soluciones extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/hqnrgxpj/';

  state = {
    activeIndex: 0,
  };

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  render() {
    return (
    <ResponsiveContainer width="100%" aspect={4.0/1.9}>
      <PieChart >
        <Pie
        
          activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={this.props.graficosReducer}
          innerRadius={60}
          outerRadius={60}
          fill="#ececec"
          stroke="#d0d0d0"
          strokeWidth="2"
          dataKey="cantidad"
          onMouseEnter={this.onPieEnter}
        />
      </PieChart>
    </ResponsiveContainer>
    );
  }
}
