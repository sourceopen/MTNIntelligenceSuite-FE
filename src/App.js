import logo from './logo.svg';
import "react-vis/dist/main.scss"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import React from 'react';
/*import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';*/


import './App.css';
//import React from 'react';

const NotImplementedComponent=(props)=>{
  const notImplementedPageLoad=()=> {
    props.setMode(3);
    
  }
  return (        
    <body>
    <div class="contentNewPage">
        <h1> Not Implemented!</h1>        
    </div>
    <button  id="myBtn" onClick={ notImplementedPageLoad }>  Go bak to home page </button>    
    </body>     
    

  );

}

const YardOccupancyComponent=(props)=>{
  console.log("properties=",props)
  return (        
    
    <div class="contentNewPage">
        <XYPlot
        xType='ordinal'
          width={700}
          height={700}>
          <HorizontalGridLines />
            <VerticalBarSeries
              data={[
              {x :'a', y: 10},
              {x: 'b', y: 5},
              {x: 'c', y: 15}
            ]}/>
          <XAxis />
          <YAxis />
        </XYPlot>
    </div>

  );

}
function App() {
  const [todos, setTodos] = React.useState([]);
  const [mode, setMode] = React.useState([]);

  const notImplementedPageLoad=()=> {
    setNotImplementedMode();
  }

  const yardOccupancyPageLoad= ()=> {    
    getYardOccupancyDataAndSetMode();
  }

  const setNotImplementedMode=() => {
    setMode(2);
  }
  const getYardOccupancyDataAndSetMode=async() => {

    //rest call here
    //const resp = await fetch("https://jsonplaceholder.typicode.com/todos",{   mode: 'no-cors'});
    //const resp = await fetch("http://localhost:5007/frontend/getOccupancyValues");

    /*fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(data => console.log(data));*/
            
    
    //const data=await resp.json();
    //console.log(data);
    //setTodos(data);
    setMode(1);


  }

  if(mode===1)
    return (<YardOccupancyComponent todos={todos}/>);
  else if(mode===2)
    return (<NotImplementedComponent mode={mode}/>);
  else
    return (        
    
    <div className="contentContainer">
    <div className="content">
      
      <button  id="myBtn" onClick={ yardOccupancyPageLoad }>  Yard Occupancy(Containers) </button>           
      <button  id="myBtn" onClick={ notImplementedPageLoad }>  Yard Occupancy(GC) </button>         
      <button  id="myBtn" onClick={ notImplementedPageLoad }>  Machine maintanance schedule  </button>         
      <button  id="myBtn" onClick={ notImplementedPageLoad }>  TZ Warnings </button>         
      
      

    </div>
    </div>

    );
}

export default App;
