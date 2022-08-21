import logo from './logo.svg';
import "react-vis/dist/main.scss"
import {XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries} from 'react-vis';
import React from 'react';
import { Bar } from "react-chartjs-2";
import Popup from './components/Popup';

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
      data: [100,200,300,200,100],
      backgroundColor: "rgba(92, 92, 92, 0.2)",
      hoverBackgroundColor: "rgba(92, 92, 92, 1)",
      borderWidth: 1,
      borderColor: [
        'rgb(92, 92, 92, 0.6)'
        ]
      },
    {
      label: "Actual",      
      data: [100,200,300,200,100],
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
      <div className="contentComingSoon"/>            
  );
}

const YardOccupancyComponent=(serverResponse)=>{
  console.log("properties=",serverResponse) 
  var serverResponseJsonObj = JSON.parse(JSON.stringify(serverResponse));
  var today = new Date();
  var yest = new Date();yest.setDate(today.getDate() - 1);
  var date2daysback = new Date();   date2daysback.setDate(today.getDate() - 2);
  var date3daysback = new Date();   date3daysback.setDate(today.getDate() - 3);  
  var tomorrow = new Date();   tomorrow.setDate(today.getDate() + 1);  
  var dateStringToday = today.getDate()+'/'+(today.getMonth()+1);
  var dateStringYest = yest.getDate()+'/'+(yest.getMonth()+1);
  var dateString2DaysBack = (date2daysback.getDate()+1)+'/'+(date2daysback.getMonth()+1);
  var dateString3DaysBack = (date3daysback.getDate()+1)+'/'+(date3daysback.getMonth()+1);  
  var dateStringtomorrow = (tomorrow.getDate()+1)+'/'+(tomorrow.getMonth()+1);
  
  data.labels=new Array(dateString3DaysBack, dateString2DaysBack, dateStringYest, dateStringToday, dateStringtomorrow);
  data.datasets[0].data=serverResponseJsonObj.serverResponse.actualValues;  
  data.datasets[1].data=serverResponseJsonObj.serverResponse.predictedValues;
  
    return (
    <div>            
      <Bar width={500}  height={190} options={options} data={data} />              
    </div>
    );
}

function App() {
  const [mode, setMode] = React.useState();  

  const notImplementedPageLoad=()=> {
    setNotImplementedMode();
  }

  const backButtonCallBack= ()=> {      
    setMode(0);
  }

  const yardOccupancyPageLoad= ()=> {      
    getYardOccupancyData();
  }  

  const setNotImplementedMode=() => {
    setMode(2);
  }

  const getYardOccupancyData=async() => {
    try {
      const response = await fetch("http://localhost:5007/frontend/getOccupancyValues");
      console.log("response = ",response.status)  
      const predictionData = await response.json();
      yardContOccPredictionDataGlob=predictionData;
      console.log('predictions = ', predictionData);
    
      yardContOccPredictionDataGlob = predictionData;
      setMode(1);
    } catch(err) {
      console.log(err)
    }
            
  }

  if(mode===1)
    return (
      <div className="YardOccupancyComponentClass">
        <YardOccupancyComponent serverResponse={yardContOccPredictionDataGlob}/>
        <button  id="backBtn" onClick={ backButtonCallBack }>  Back </button>           
      </div >
    );  
  else if(mode===2)
    return (
      <div className="NotImplementedComponentClass">
        <NotImplementedComponent mode={mode}/>        
        <button  id="backBtn" onClick={ backButtonCallBack }>Back</button>           
      </div>
    );
  else
    return (        
    
    <div className="contentMainPage">
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

