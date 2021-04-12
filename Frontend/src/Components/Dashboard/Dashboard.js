import React, {useEffect, useState} from "react";
import axios from 'axios';
import Select from 'react-dropdown-select';
import { Doughnut, Bar, HorizontalBar } from 'react-chartjs-2';
import DashboardTask from "./DashboardTask";
import './Dashboard.css';
import 'chartjs-plugin-datalabels';

const Dashboard = (props) =>{
    const [allTasks, setAllTasks] = useState([]);
    const [assTaskFilterType, setAssTaskFilterType] = useState('');
    const [finalMyTasks, setFinalMyTasks] = useState([]);
    const [finalAssTasks, setFinalAssTasks] = useState([]);
    const [myTaskStatData, setMyTaskStatData] = useState([]);
    const [myTaskStatLabel, setMyTaskStatLabel] = useState([]);
    const [assTaskStatData, setAssTaskStatData] = useState([]);
    const [assTaskStatLabel, setAssTaskStatLabel] = useState([]);
    const [myTaskStatType, setMyTaskStatType] = useState('');
    const [assTaskStatType, setAssTaskStatType] = useState('');
    const [assTaskStatUpdate, setAssTaskStatUpdate] = useState(false);
    const [myTasksColorCode, setMyTasksColorCode] = useState([]);
    const [assTasksColorCode, setAssTasksColorCode] = useState([]);

    useEffect(() => {
   		axios
   		.get(`${process.env.REACT_APP_BASE_URL}/task/getAllTask/${props.username}`)
   		.then((res)=>{
    		setAllTasks(res.data);
    		var tmp1 = [], tmp2 = [];
    		tmp1 = res.data.filter((element,index)=>{
    			if(element.assignedTo===props.username){
    				return element;
    			}
    		})
    		setFinalMyTasks(tmp1);
    		
    		tmp2 = res.data.filter((element,index)=>{
    			if(element.assignedTo!==props.username){
    				return element;
    			}
    		})
    		setFinalAssTasks(tmp2);
    		console.log('1st use effect');
    		setMyTaskStatType('Progress');
    		setAssTaskStatType('Progress');
         })
   		.catch((err)=>{
             console.log(err);
        })
  	},[props.data])
  	
  	useEffect(()=>{
  		console.log(myTaskStatType);
  		var tmp = [].concat(finalMyTasks);
  		var labels = ['','',''];
  		var colorCode = [];
  		var data = [0,0,0];
  		if(myTaskStatType==='Progress'){
  			
  			tmp.sort((a,b)=>a.progress>b.progress?1:-1);
  			labels[0] = '70-100%';
  			labels[1] = '40-70%';
  			labels[2] = '0-40%';
  			tmp.map((element,index)=>{
  				if(element.progress>=70){
  					data[0]++;
  					colorCode.push(0);
  				}
  				else if(element.progress>=40){
  					data[1]++;
  					colorCode.push(1);
  				}
  				else{
  					data[2]++;
  					colorCode.push(2);
  				}
  			});
  		}
  		else if(myTaskStatType==='ExpectedEndDate'){
  			
  			tmp.sort(function (a,b){
  				if(a.endDate===null)
  					return 1;
  				var d1 = new Date(a.endDate);
  				if(b.endDate===null)
  					return -1;
  				var d2 = new Date(b.endDate);
  				return(d1.getTime()-d2.getTime())
  			});
  			
  			labels[0] = '> 10 days';
  			labels[1] = '2-10 days';
  			labels[2] = '< 2 days';
  			labels.push(['Undecided']);
  			data.push([0]);
  			console.log(labels);
  			console.log(data);
  			tmp.map((element,index)=>{
  				
  				if(element.endDate===null){
  					data[3]++;
  					colorCode.push(3);
  				}
  				else{
  					var d1 = new Date(), d2;
  					d2 = new Date(element.endDate);
  					
					d1 = d1.getTime();
					d2 = d2.getTime();
					
					if(d2-d1>864000000){
						data[0]++;
						colorCode.push(0);
					}
					else if(d2-d1>=172800000){
						data[1]++;
						colorCode.push(1);
					}
					else{
						data[2]++;
						colorCode.push(2);
					}
				}
  			});
  		}
  		else if(myTaskStatType==='Ratio'){
  			tmp.sort(function(a,b){
  				
  				var d = new Date();
  				d = d.getTime();
  				
  				if(a.endDate===null || a.startDate===null){
  					return 1;
  				}
  				var d11 = new Date(a.startDate), d12 = new Date(a.endDate);
  				if(b.endDate===null || b.startDate===null){
  					return -1;
  				}
  				var d21 = new Date(b.startDate), d22 = new Date(b.endDate);
  				
  				var d1 = d12.getTime() - d11.getTime();
  				var d2 = d22.getTime() - d21.getTime();
  				
  				if(d1<=0){
  					d1 = 0;
  				}
  				else{
  					d1 = (a.progress/100) - ((d-d11.getTime())/d1);
  				}
  				
  				if(d2<=0){
  					d2 = 0;
  				}
  				else{
  					d2 = (b.progress/100) - ((d-d21.getTime())/d2);
  				}
  				
  				return d2-d1;
  				
  			});
  			
  			labels[0] = 'On Schedule';
  			labels[1] = 'Behind Schedule';
  			labels[2] = 'Undecided';
  			tmp.map((element,index)=>{
  				
  				if(element.startDate===null || element.endDate===null){
  					data[2]++;
  					colorCode.push(3);
  				}
  				else{
  					var d = new Date();
  					d = d.getTime();
  					var d11 = new Date(element.startDate), d12 = new Date(element.endDate);
  					var val = (element.progress/100) - ((d-d11)/(d12-d11));
  					if(val>=0){
  						data[0]++;
  						colorCode.push(0);
  					}
  					else{
  						data[1]++;
  						colorCode.push(2);
  					}
  				}
  			});
  		}
  		setMyTasksColorCode(colorCode);
  		setMyTaskStatLabel(labels);
  		setMyTaskStatData(data);
  		setFinalMyTasks(tmp);
  	},[myTaskStatType])
  	
  	useEffect(()=>{
  		console.log(finalAssTasks);
  		var tmp = [].concat(finalAssTasks);
  		var labels = ['','',''];
  		var data = [0,0,0];
  		var colorCode = [];
  		if(assTaskStatType==='Progress'){
  			
  			tmp.sort((a,b)=>a.progress>b.progress?1:-1);
  			labels[0] = '70-100%';
  			labels[1] = '40-70%';
  			labels[2] = '0-40%';
  			tmp.map((element,index)=>{
  				if(element.progress>=70){
  					data[0]++;
  					colorCode.push(0);
  				}
  				else if(element.progress>=40){
  					data[1]++;
  					colorCode.push(1);
  				}
  				else{
  					data[2]++;
  					colorCode.push(2);
  				}
  			});
  		}
  		else if(assTaskStatType==='ExpectedEndDate'){
  			
  			tmp.sort(function (a,b){
  				if(a.endDate===null)
  					return 1;
  				var d1 = new Date(a.endDate);
  				if(b.endDate===null)
  					return -1;
  				var d2 = new Date(b.endDate);
  				return(d1.getTime()-d2.getTime())
  			});
  			
  			labels[0] = '> 10 days';
  			labels[1] = '2-10 days';
  			labels[2] = '< 2 days';
  			labels.push(['Undecided']);
  			data.push([0]);
  			console.log(labels);
  			console.log(data);
  			tmp.map((element,index)=>{
  				
  				if(element.endDate===null){
  					data[3]++;
  					colorCode.push(3);
  				}
  				else{
  					var d1 = new Date(), d2;
  					d2 = new Date(element.endDate);
  					
					d1 = d1.getTime();
					d2 = d2.getTime();
					
					if(d2-d1>864000000){
						data[0]++;
						colorCode.push(0);
					}
					else if(d2-d1>=172800000){
						data[1]++;
						colorCode.push(1);
					}
					else{
						data[2]++;
						colorCode.push(2);
					}
				}
  			});
  		}
  		else if(assTaskStatType==='Ratio'){
  			tmp.sort(function(a,b){
  				
  				var d = new Date();
  				d = d.getTime();
  				
  				if(a.endDate===null || a.startDate===null){
  					return 1;
  				}
  				var d11 = new Date(a.startDate), d12 = new Date(a.endDate);
  				if(b.endDate===null || b.startDate===null){
  					return -1;
  				}
  				var d21 = new Date(b.startDate), d22 = new Date(b.endDate);
  				
  				var d1 = d12.getTime() - d11.getTime();
  				var d2 = d22.getTime() - d21.getTime();
  				
  				if(d1<=0){
  					d1 = 0;
  				}
  				else{
  					d1 = (a.progress/100) - ((d-d11.getTime())/d1);
  				}
  				
  				if(d2<=0){
  					d2 = 0;
  				}
  				else{
  					d2 = (b.progress/100) - ((d-d21.getTime())/d2);
  				}
  				
  				return d2-d1;
  				
  			});
  			
  			labels[0] = 'On Schedule';
  			labels[1] = 'Behind Schedule';
  			labels[2] = 'Undecided';
  			tmp.map((element,index)=>{
  				
  				if(element.startDate===null || element.endDate===null){
  					data[2]++;
  					colorCode.push(3);
  				}
  				else{
  					var d = new Date();
  					d = d.getTime();
  					var d11 = new Date(element.startDate), d12 = new Date(element.endDate);
  					var val = (element.progress/100) - ((d-d11)/(d12-d11));
  					if(val>=0){
  						data[0]++;
  						colorCode.push(0);
  					}
  					else{
  						data[1]++;
  						colorCode.push(2);
  					}
  				}
  			});
  		}
  		setAssTasksColorCode(colorCode);
  		setAssTaskStatLabel(labels);
  		setAssTaskStatData(data);
  		setFinalAssTasks(tmp);
  	},[assTaskStatType,assTaskStatUpdate])
  	
  	useEffect(()=>{
  		var tmp = [];
  		if(assTaskFilterType===''){
  			tmp = allTasks.filter((element)=>{
	  			if(element.assignedTo!==props.username && element.assignedBy===props.username)
	  				return element;
	  		})
  		}
  		else{
	  		tmp = allTasks.filter((element)=>{
	  			if(element.assignedTo===assTaskFilterType && element.assignedBy===props.username)
	  				return element;
	  		})
	  	}
  		console.log(tmp);
  		setFinalAssTasks(tmp);
  		setAssTaskStatUpdate(!assTaskStatUpdate);
  	},[assTaskFilterType])


  return(
    <div className="dashboard">
	    <div className="dashboard-head">
	    	<h3 className="dashboard-head-txt">My Tasks</h3>
	    	<hr className="dashboard-hl" />
	    </div>
	    <div className="dashboard-myTask">
	    	<div className="dashboard-myTask-statOps">
	    		<div 
	    			className={`dashboard-statOps-ops ${(myTaskStatType==='Progress')?'statOps-selected':''}`} 
	    			onClick={()=>setMyTaskStatType('Progress')}
	    		>
	    			Progress
	    		</div>
	    		<div 
	    			className={`dashboard-statOps-ops ${(myTaskStatType==='ExpectedEndDate')?'statOps-selected':''}`} 
	    			onClick={()=>setMyTaskStatType('ExpectedEndDate')}
	    		>
	    			End Date
	    		</div>
	    		<div 
	    			className={`dashboard-statOps-ops ${(myTaskStatType==='Ratio')?'statOps-selected':''}`} 
	    			onClick={()=>setMyTaskStatType('Ratio')}
	    		>
	    			Ratio
	    		</div>
	    	</div>
	    	<div className="dashboard-myTask-stat">
	    		{(myTaskStatType==='Progress')&&
		    		<Bar 
		    			data={{
		    				labels: myTaskStatLabel,//["80-100%","40-80%","0-40%"],
		    				datasets: [
		    					{
		    						data: myTaskStatData,//[30,60,20],
		    						fill: true,
		    						backgroundColor: ["rgba(75, 192, 192, 1)","rgba(255, 206, 86, 1)","rgba(255, 99, 132, 1)"]
		    					},
		    				]
		    			}} 
		    			options={{
		    				scales:{
		    					yAxes:[
		    						{
		    							ticks: {
		    								beginAtZero: true,
		    								max: finalMyTasks.length,
		    								maxTicksLimit: 4,
		    								stepSize: Math.floor(finalMyTasks.length/3),
		    							},
		    							gridLines:{
		    								display:false,
		    							}
		    						},
		    					]
		    				},
		    				plugins:{
		    					datalabels:{
		    						display:true,
		    						color:'white',
		    					}
		    				},
		    				legend:{
		    					display:false,
		    				}
		    			}}
		    		/>
		    	}
		    	{(myTaskStatType==='ExpectedEndDate')&&
		    		<HorizontalBar 
		    			data={{
		    				labels: myTaskStatLabel,//["80-100%","40-80%","0-40%"],
		    				datasets: [
		    					{
		    						data: myTaskStatData,//[20,20,55],
		    						fill: true,
		    						backgroundColor: ["rgba(75, 192, 192, 1)","rgba(255, 206, 86, 1)","rgba(255, 99, 132, 1)","rgba(153, 102, 255, 1)"]
		    					},
		    				]
		    			}} 
		    			options={{
		    				scales:{
		    					xAxes:[
		    						{
		    							ticks: {
		    								beginAtZero:true,
		    								min:0,
		    								max: finalMyTasks.length,
		    								maxTicksLimit: 4,
		    								stepSize: finalMyTasks.length/3,
		    							},
		    							gridLines:{
		    								display:false,
		    							}
		    						},
		    					]
		    				},
		    				yAxes:{
		    					ticks:{
		    						
		    					},
		    					gridLines:{
		    						display:true,
		    					}
		    				},
		    				plugins:{
		    					datalabels:{
		    						display:true,
		    						color:'white',
		    					}
		    				},
		    				legend:{
		    					display:false,
		    				}
		    			}}
		    		/>
		    	}
		    	{(myTaskStatType==='Ratio')&&
		    		<Doughnut 
		    			data={{
		    				labels: myTaskStatLabel,//["80-100%","40-80%","0-40%"],
		    				datasets: [
		    					{
		    						data: myTaskStatData,//[70,40,5],
		    						fill: true,
		    						backgroundColor: ["rgba(75, 192, 192, 1)","rgba(255, 99, 132, 1)","rgba(153, 102, 255, 1)"]
		    					},
		    				]
		    			}} 
		    			options={{
		    				scales:{
		    					
		    				},
		    				plugins:{
		    					datalabels:{
		    						display:true,
		    						color:'white',
		    					}
		    				},
		    				legend:{
		    					boxWidth: 10,
		    					display:true,
		    					position:'left',
		    				}
		    			}}
		    		/>
		    	}
	    	</div>
	    	<div className="dashboard-myTask-overview">
	    		{
	    			finalMyTasks.map((element,index)=>{
	    				// console.log(element);
	          			return( 
				            <DashboardTask 
				              Task={element.Task} 
				              id={element._id} 
				              status={element.status} 
				              progress={element.progress}  
				              assignedBy={element.assignedBy} 
				              assignedTo={element.assignedTo} 
				              endDate={element.endDate} 
				              startDate={element.startDate}
				              colorCode={myTasksColorCode[index]}
				            />
	          			);
	        		})    
      			}
	    	</div>
	    </div>
	    <div className="dashboard-head">
	    	<div className="dashboard-head-row1">
	    		<h3 className="dashboard-head-txt">Assigned Tasks</h3>
	    		<Select
                multi={false}
                searchable={true}
                keepSelectedInList={false}
                clearable={true}
                options={props.listOfUsers}
                onChange={(value)=>{
                	if(value.length===0)setAssTaskFilterType('');
                	else setAssTaskFilterType(value[0].label);
                }}
                style={{height:`40px`}}
                className="dashboard-head-select"
                placeholder="All Users"
              />
	    	</div>
	    	<hr className="dashboard-hl" />
	    </div>
	    <div className="dashboard-assTask">
	    	<div className="dashboard-assTask-statOps">
	    		<div 
	    			className={`dashboard-statOps-ops ${(assTaskStatType==='Progress')?'statOps-selected':''}`} 
	    			onClick={()=>setAssTaskStatType('Progress')}
	    		>
	    			Progress
	    		</div>
	    		<div 
	    			className={`dashboard-statOps-ops ${(assTaskStatType==='ExpectedEndDate')?'statOps-selected':''}`} 
	    			onClick={()=>setAssTaskStatType('ExpectedEndDate')}
	    		>
	    			Expected End Date
	    		</div>
	    		<div 
	    			className={`dashboard-statOps-ops ${(assTaskStatType==='Ratio')?'statOps-selected':''}`} 
	    			onClick={()=>setAssTaskStatType('Ratio')}
	    		>
	    			Ratio
	    		</div>
	    	</div>
	    	<div className="dashboard-assTask-stat">
	    		{(assTaskStatType==='Progress')&&
		    		<Bar 
		    			data={{
		    				labels: assTaskStatLabel,
		    				datasets: [
		    					{
		    						data: assTaskStatData,
		    						fill: true,
		    						backgroundColor: ["rgba(75, 192, 192, 1)","rgba(255, 206, 86, 1)","rgba(255, 99, 132, 1)"]
		    					},
		    				]
		    			}} 
		    			options={{
		    				scales:{
		    					yAxes:[
		    						{
		    							ticks: {
		    								beginAtZero: true,
		    								max: finalAssTasks.length,
		    								maxTicksLimit: 4,
		    								stepSize: Math.floor(finalAssTasks.length/3),
		    							},
		    							gridLines:{
		    								display:false,
		    							}
		    						},
		    					]
		    				},
		    				plugins:{
		    					datalabels:{
		    						display:true,
		    						color:'white',
		    					}
		    				},
		    				legend:{
		    					display:false,
		    				}
		    			}}
		    		/>
		    	}
		    	{(assTaskStatType==='ExpectedEndDate')&&
		    		<HorizontalBar 
		    			data={{
		    				labels: assTaskStatLabel,//["80-100%","40-80%","0-40%"],
		    				datasets: [
		    					{
		    						data: assTaskStatData,//[20,20,55],
		    						fill: true,
		    						backgroundColor: ["rgba(75, 192, 192, 1)","rgba(255, 206, 86, 1)","rgba(255, 99, 132, 1)","rgba(153, 102, 255, 1)"]
		    					},
		    				]
		    			}} 
		    			options={{
		    				scales:{
		    					xAxes:[
		    						{
		    							ticks: {
		    								beginAtZero:true,
		    								min:0,
		    								max: finalAssTasks.length,
		    								maxTicksLimit: 4,
		    								stepSize: Math.floor(finalAssTasks.length/3),
		    							},
		    							gridLines:{
		    								display:false,
		    							}
		    						},
		    					]
		    				},
		    				yAxes:{
		    					ticks:{
		    						
		    					},
		    					gridLines:{
		    						display:true,
		    					}
		    				},
		    				plugins:{
		    					datalabels:{
		    						display:true,
		    						color:'white',
		    					}
		    				},
		    				legend:{
		    					display:false,
		    				}
		    			}}
		    		/>
		    	}
		    	{(assTaskStatType==='Ratio')&&
		    		<Doughnut 
		    			data={{
		    				labels: assTaskStatLabel,//["80-100%","40-80%","0-40%"],
		    				datasets: [
		    					{
		    						data: assTaskStatData,//[70,40,5],
		    						fill: true,
		    						backgroundColor: ["rgba(75, 192, 192, 1)","rgba(255, 99, 132, 1)","rgba(153, 102, 255, 1)"]
		    					},
		    				]
		    			}} 
		    			options={{
		    				scales:{
		    					
		    				},
		    				plugins:{
		    					datalabels:{
		    						display:true,
		    						color:'white',
		    					}
		    				},
		    				legend:{
		    					boxWidth: 10,
		    					display:true,
		    					position:'left',
		    				}
		    			}}
		    		/>
		    	}
	    	</div>
	    	<div className="dashboard-assTask-overview">
	    		{
	    			finalAssTasks.map((element,index)=>{
	          			return( 
				            <DashboardTask 
				              Task={element.Task} 
				              id={element._id} 
				              status={element.status} 
				              progress={element.progress}  
				              assignedBy={element.assignedBy} 
				              assignedTo={element.assignedTo} 
				              endDate={element.endDate} 
				              startDate={element.startDate}
				              colorCode={assTasksColorCode[index]}
				            />
	          			);
	        		})    
      			}
	    	</div>
	    </div>
    </div>
  )
}
export default Dashboard;