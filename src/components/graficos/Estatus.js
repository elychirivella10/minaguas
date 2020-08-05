import React from 'react';
import Chart from 'react-apexcharts'
import {reducer} from '../../helpers/funciones'

      class ApexChart extends React.Component {
        constructor(props) {
          super(props);

          this.state = {
          
            series: [0,0, 0, 0],
            options: {
              chart: {
                height: 350,
                type: 'radialBar',
              },
              plotOptions: {
                radialBar: {
                  dataLabels: {
                    name: {
                      fontSize: '22px',
                    },
                    value: {
                      fontSize: '16px',
                    },
                    total: {
                      show: true,
                      label: 'Total',
                      formatter: function (reducer, series) {
                        // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                        return 
                      }
                    }
                  }
                }
              },
              labels: ['Por iniciar', 'En ejecucion', 'Bananas', 'Berries'],
            },
          
          
          };
        }

         render() {
           let data = {}
          if (this.props.graficosReducer) {
            
            data = {
              series: [this.props.graficosReducer[3].porcentaje1, this.props.graficosReducer[3].porcentaje2, this.props.graficosReducer[3].porcentaje3],
              
                  options: {
                    chart: {
                      height: 350,
                      type: 'radialBar',
                      cantidad:this.props.graficosReducer[3].cantidad
                    },
                    plotOptions: {
                      radialBar: {
                        dataLabels: {
                          name: {
                            fontSize: '22px',
                          },
                          value: {
                            fontSize: '16px',
                            formatter: function (val, series) {
                              const suma = (series.config.chart.cantidad*val)/100
                              return Math.round(suma)
                            }
                          },
                          total: {
                            show: true,
                            label: 'Total',
                            formatter: function (series) {
                              return series.config.series.reduce(reducer)
                            }
                          }
                        }
                      }
                    },
                    labels: ['Por iniciar', 'En ejecucion', 'Finalizado'],
                  }
            }
          } else {
            return null
          }
    return (
      <div className="radialbar">
        {data?<Chart options={data.options} series={data?data.series:this.state.series} type="radialBar" height="210" />:null}
      </div>
    );
  }
}
      

      export default ApexChart;