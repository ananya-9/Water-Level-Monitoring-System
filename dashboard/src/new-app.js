

import logo from './logo.svg';


// Wijmo imports
import 'wijmo/styles/wijmo.css';
import { FlexGrid, FlexGridColumn } from 'wijmo/wijmo.react.grid';
import { FlexChart, FlexPie, FlexChartSeries } from 'wijmo/wijmo.react.chart';
import { RadialGauge } from 'wijmo/wijmo.react.gauge';

import { Chart } from "react-google-charts";
import { Component } from 'react';
import NavBar from './NavBar';
import './App.css';
var ip = "10.11.0.42:9123";

const ChartPanel = ({ title, children }) => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12 mt-1">
      <div className="card dashboardPanel">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {children}
        </div>
      </div>
    </div>
  );
}


const DataPanel = ({ title, children }) => {
  return (
    <div className="col-sm-12">
      <div className="card dashboardRow">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          {children}
        </div>
      </div>
    </div>
  )
}



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      level: 45,
      water_levels: [],
      date: []
    };
  }


//   componentDidMount(){
//  fetch('http://'+ip+'/dashboard/get_latest_water_level/')
//   .then(response => response.json())
//   .then(data => data['level']).then(data => this.setState({level: Number(data)}))
//   fetch('http://'+ip+'/dashboard/get_last_day_water_levels/')
//   .then(response => response.json()).then(data=>data['levels']).then(data => 
//      //this.setState({water_levels: data[0]}))
   
//     console.log(data))
  //}


  render() {
    return (
    <>
        <NavBar title="Water-level Monitoring Dashboard" />
         
        <div className="gauge">
        <Chart title="Current water-level">
        width={500}
            height={'500px'}
            chartType="piechart"
            loader={<div>Loading Chart</div>}
            data={[
              ['Level', 'data'],
              ['Full', this.state.level],
              ['Empty', 100-this.state.level],
              
            ]}
            options={{
              title: 'Water level',
              // Just add this option
              pieHole: 0.3,
              slices: {
                0: { color: 'blue' },
                1: { color: '#32a8a0' },
              }
            }}
            rootProps={{ 'data-testid': '3' }}
          
        </Chart>
        </div>     
        <div className="guage">
       
        {/* <div className="col-lg-4 col-md-6 col-sm-12 mt-1">
         */}
          <div className="card dashboardPanel">
           
             <div className="card-body">
             
              <h5 className="card-title">WATER-LEVEL GRAPH</h5>
        <Chart title = "Current water-level"
          // width={400}
           height={'700px'}
          chartType="AreaChart"
          loader={<div>Loading Chart</div>}
          data={[
            ['Time', 'Water-level'],
            ['2013', 1000],
            ['2014', 1170],
            ['2015', 660],
            ['2016', 1030],
          ]}
          options={{
            // title: 'Water-level graph',
            hAxis: { title: 'Time', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            // For the legend to fit, we make the chart area smaller
            chartArea: { width: '50%', height: '70%' },
            // lineWidth: 25
          }}
          />
       
        {/* </div> */}

      </div>

    </div>
    
   </div>
        
    
      
          
       
      
      
     
    </>
    );
  }
}


export default App;