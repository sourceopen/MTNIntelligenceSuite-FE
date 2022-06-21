import logo from './logo.svg';
import "react-vis/dist/main.scss"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import React from 'react';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
//import { Bar } from 'react-chartjs-2';
//import faker from 'faker';




import './App.css';
//import React from 'react';

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" 
    },
    title: {
      display: true,
      text: "Container Yard Occupancy Prediction"
    }
  }
};

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data1 = {
  labels,
  datasets: [
    {
      label: "Prediction",
      data: labels.map(() => 130),
      backgroundColor: "rgba(92, 92, 92, 0.2)",
      hoverBackgroundColor: "rgba(92, 92, 92, 1)"
      
    },
    {
      label: "Actual",
      //data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
      data: labels.map(() => 122),
      backgroundColor: "rgba(255, 165, 0, 0.2)",
      hoverBackgroundColor: "rgba(255, 165, 0, 1)"
    }
  ]
};

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
  return <Bar width={500}  height={190} options={options} data={data1} />;
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
