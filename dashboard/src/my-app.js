import React, { useState } from "react";
// Wijmo imports
import 'wijmo/styles/wijmo.css';
import Box from '@material-ui/core/Box';
import { FlexGrid, FlexGridColumn } from 'wijmo/wijmo.react.grid';
import { FlexChart, FlexPie, FlexChartSeries } from 'wijmo/wijmo.react.chart';
import { RadialGauge } from 'wijmo/wijmo.react.gauge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

import { Chart } from "react-google-charts";
import { Component } from 'react';
import NavBar from './NavBar';
import './App.css';
import DirectionLayout from './flex.js'
import { Column } from "wijmo/wijmo.grid";
var ip = "10.11.0.46:9123";
var x = [];
var y = [];
var z  = [];
var k  = 'ON';
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      l: 45,
      motor_state: true,
      motor_usage: 0,
      levels: [],
      dates: []
    };
  }
  componentDidMount(){
 fetch('http://'+ip+'/dashboard/get_latest_water_level/')
  .then(response => response.json())
  .then(data => data['level']).then(data => this.setState({l: Number(data)}))

  fetch('http://'+ip+'/dashboard/get_motor_status/')
  .then(response => response.json())
  .then(data => data['state']).then(
     data => this.setState({motor_state: data})
    //console.log(data)
      )
      fetch('http://'+ip+'/dashboard/get_motor_usage/')
      .then(response => response.json())
      .then(data => data['units']).then(
         data => this.setState({motor_usage: data*1000}))

  fetch('http://'+ip+'/dashboard/get_last_day_water_levels/')
  .then(response => response.json()).then(data=>data['levels']).then(data => 
    data.forEach(element =>{ x.push(element['level']); 
    //y.push(element['date'])
     let d = element['date'].split('.')[0];
     //let k = d.split('T')[0].split('-');
    console.log(d)
     let t = d.split('T')[1].split(':');
    // console.log(t)
  
     y.push(Number(t[0]))
    
    // console.log((21,Number(k[1]),Number(k[2]),Number(t[0]),Number(t[1]),Number(t[2])))
  }),
    this.setState({levels: x,dates:y}))
  
    //console.log(data))
  }
  render() {
    z = []
    z.push(['Time', 'Water']);
    console.log(y)
    for(let i = 0;i< y.length;i++)z.push([y[i],x[i]])
    if(this.state.motor_usage==false)
    {
      k = 'OFF';
    }
    else
    {
      k='ON';
    }
    return (
      // <div className="App">
      <>
      <NavBar title="WATER-LEVEL MONITORING DASHBOARD" />
      
      <div class='row'>
      <div class='col-sm-6'>  
       <div className="guage"> 
          {/* <div className="col-lg-4 col-md-6 col-sm-12 mt-1">  */}
            <div className="card dashboardPanel">
          
              <div className="card-body">
            
                <h5 className="card-title">Current Water-level</h5>
              
                  <Chart 
                    width={'715px'}
                    height={'350px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    
                    data={[
                      ['Level', 'data'],
                      ['Full', this.state.l],
                      ['Empty', 100-this.state.l],
                      
                    ]}
                    
                    options={{
                      // title: 'Water level',
                      // Just add this option
                      dataTextStyle:{
                        fontSize:'5em'
                      },
                      pieHole: 0.3,
                      slices: {
                        0: { color: '#080A36' },
                        1: { color: '#32a8a0' },
                        
                      }
                    }}
                    rootProps={{ 'data-testid': '2' }}
                  />
                </div>
              {/* </div> */}
            </div> 
          </div>
        </div>
        <div class='col-sm-2'>
        
        <div className="card dashboardPanel" >
          
          <div className="card-body"  >
        
            <h5 className="card-title">Current Water-level percentage</h5>
          
              <div className="water_level_box" >
              <Box color="white" bgcolor="#002244" p={2} height='325px' textAlign='center' >
                     <div className='h1-1'> {this.state.l}% </div> 
                </Box>
              </div>
            </div>
          </div>
        
         
        </div>
        <div class='col-sm-2'>
        <div className="card dashboardPanel">
          
          <div className="card-body"  >
        
            <h5 className="card-title">Motor Status</h5>
          
              <div className="motor_state_box" >
              <Box color="white" bgcolor="#002244" p={2} height='348px' >
                    <center><h1>{k}</h1></center>
                </Box>
              </div>
            </div>
          </div>
          
        </div>
        <div class='col-sm-2' >
        <div className="card dashboardPanel">
          
          <div className="card-body"  >
        
            <h5 className="card-title">Motor Usage</h5>
          
           < div className="water_level_box" >
              <Box color="white" bgcolor="#002244" p={2} height='348px' textAlign='center' justifyContent='center'>
              
              <h1> {this.state.motor_usage} Watt/hr </h1>              
                </Box>
                </div>
            </div>
          </div>
         
        </div>
      
      
    </div> 
       
      <div className="guage">
       
         {/* <div className="col-lg-4 col-md-6 col-sm-12 mt-1"> */}
        
         <div className="card dashboardPanel">
          
            <div className="card-body"> 
            
              <h5 className="card-title">WATER-LEVEL GRAPH</h5>
                        <Chart
              width={'600px'}
              height={'400px'}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
            
              data={z}
              options={{ 
                title: 'Water level',
                hAxis: {
                  title: 'Time',
                },
                vAxis: {
                  title: 'Water',
                },
              }}
              rootProps={{ 'data-testid': '1' }}
          />
            </div>
           {/* </div> */}
         </div> 
       </div>
       
    </>
      
    );
  }
}


export default App;
