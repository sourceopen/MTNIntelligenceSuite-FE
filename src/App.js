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

import './App.css';

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

let yardContOccPredictionDataGlob = [];
const labels = ["1/1", "2/2", "3/3", "4/4", "5/5"];

export const data = {
  labels,
  datasets: [
    {
      label: "Prediction",
      
      data: [100,200,300,100,200,1000],
      backgroundColor: "rgba(92, 92, 92, 0.2)",
      hoverBackgroundColor: "rgba(92, 92, 92, 1)",
      borderWidth: 1,
      borderColor: [
        'rgb(92, 92, 92, 0.6)'
        ]
      },
    {
      label: "Actual",      
      data: [100,200,300,100,200,1000],
      backgroundColor: "rgba(255, 165, 0, 0.2)",
      hoverBackgroundColor: "rgba(255, 165, 0, 1)",
      borderWidth: 1,
      borderColor: [
        'rgb(255, 165, 0, 0.6)'
        ]
    },
    
  ]
};

const NotImplementedComponent=(props)=>{
  const notImplementedPageLoad=()=> {
    props.setMode(3);
    
  }  

  return (        
    
    
      <div className="contentComingSoon">
      <div className="content">
        
        <button  id="backBtn" onClick="history.back()">  Go back </button>           
        
        
  
      </div>
      </div>
  
      
  
  );

}

const YardOccupancyComponent=(props)=>{
  console.log("properties=",props)  
  var today = new Date();
  var yest = new Date();yest.setDate(today.getDate() - 1);
  //var yest = today.getDate()-1;
  var date2daysback = new Date();   date2daysback.setDate(today.getDate() - 2);
  var date3daysback = new Date();   date3daysback.setDate(today.getDate() - 3);  
  var tomorrow = new Date();   tomorrow.setDate(today.getDate() + 1);
  //var date2daysAhead = new Date();   date2daysAhead.setDate(today.getDate() + 2);

  var dateStringToday = today.getDate()+'/'+today.getMonth();
  var dateStringYest = yest.getDate()+'/'+yest.getMonth();
  var dateString2DaysBack = date2daysback.getDate()+'/'+date2daysback.getMonth();
  var dateString3DaysBack = date3daysback.getDate()+'/'+date3daysback.getMonth();  
  var dateStringtomorrow = tomorrow.getDate()+'/'+tomorrow.getMonth();
  //var dateString2DaysAhead = date2daysAhead.getDate()+'/'+date2daysAhead.getMonth();*/

  //data.labels=new Array(dateStringToday, dateString3DaysBack, dateString2DaysBack, dateStringYest, dateStringToday, dateString1DayAhead, dateString2DaysAhead);
  data.labels=new Array(dateString3DaysBack, dateString2DaysBack, dateStringYest, dateStringToday, dateStringtomorrow);
  data.datasets[0].data=[50,60,70,80,90,100];
  data.datasets[1].data=[50,60,70,80,90,100];
  console.log('set');
    return (
    <div>
      
    <Bar width={500}  height={190} options={options} data={data} />
    <div>
      <button  id="backBtn" onClick={ "google.com" }>  Back </button>           
      
    </div>
    
    </div>
    );
}

function App() {
  const [mode, setMode] = React.useState();  

  const notImplementedPageLoad=()=> {
    setNotImplementedMode();
  }

  const yardOccupancyPageLoad= ()=> {    
    getYardOccupancyData();
  }  

  const setNotImplementedMode=() => {
    setMode(2);
  }

  
  const getYardOccupancyData=async() => {
      const response = await fetch("http://localhost:5007/frontend/getOccupancyValues");
      const predictionData = await response.json();
      yardContOccPredictionDataGlob=predictionData;
      console.log('predictions = ', predictionData);
      
      yardContOccPredictionDataGlob = predictionData;

      setMode(1);      
  }

  if(mode===1)
    return (<YardOccupancyComponent todos={yardContOccPredictionDataGlob}/>);  
  else if(mode===2)
    return (<NotImplementedComponent mode={mode}/>);
  else
    return (        
    
    <div className="contentMain">
    <div className="content">
      
      <button  id="mainScreenBtn" onClick={ yardOccupancyPageLoad }>  Yard Occupancy(Containers) </button>           
      <button  id="mainScreenBtn" onClick={ notImplementedPageLoad }>  Yard Occupancy(GC) </button>         
      <button  id="mainScreenBtn" onClick={ notImplementedPageLoad }>  Machine maintanance schedule  </button>         
      <button  id="mainScreenBtn" onClick={ notImplementedPageLoad }>  TZ Warnings </button>   

    </div>
    </div>

    );
}

export default App;

