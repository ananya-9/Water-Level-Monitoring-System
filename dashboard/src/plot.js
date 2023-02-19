
import { Chart } from "react-google-charts";

var ip = "10.11.0.42:9123";

function Plot(){
  return(
    <div className="Plot">
    <Plot
    width={400}
    height={'300px'}
    chartType="AreaChart"
    loader={<div>Loading Chart</div>}
    data={[
      ['Year', 'Sales', 'Expenses'],
      ['2013', 1000, 400],
      ['2014', 1170, 460],
      ['2015', 660, 1120],
      ['2016', 1030, 540],
    ]}
    options={{
      title: 'Company Performance',
      hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
      vAxis: { minValue: 0 },
      // For the legend to fit, we make the chart area smaller
      chartArea: { width: '50%', height: '70%' },
      // lineWidth: 25
    }}
    />
    </div>
  );
}

export {Plot};

// class App extends Component{
//   constructor(props){
//     super(props);
//     this.state = {
//       level: 45,
//       water_levels: [],
//       motor_state: false
//     };
//   }
//   componentDidMount(){
 

//   fetch('http://'+ip+'/dashboard/get_last_day_water_levels/')
//   .then(response => response.json()).then(data=>data['levels']).then(data => 
//      //this.setState({water_levels: data[0]}))
   
//     console.log(data))
//   }
//   render() {
//     return (
//       <div className="App">
//         <Chart
          
//           width={'500px'}
//           height={'500px'}
//           chartType="PieChart"
//           loader={<div>Loading Chart</div>}
//           data={[
//             ['Level', 'data'],
//             ['Full', this.state.level],
//             ['Empty', 100-this.state.level],
            
//           ]}
//           options={{
//             title: 'Water level',
//             // Just add this option
//             pieHole: 0.3,
//             slices: {
//               0: { color: 'blue' },
//               1: { color: '#32a8a0' },
//             }
//           }}
//           rootProps={{ 'data-testid': '3' }}
//         />
      
//       </div>
      
//     );
//   }
// }


// export default App;