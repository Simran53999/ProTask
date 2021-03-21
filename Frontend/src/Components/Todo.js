import React, { useEffect, useState } from "react";
import MultiSelect from "react-multi-select-component";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Todo.css';
import LinearProgress from '@material-ui/core/LinearProgress';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker 
} from '@material-ui/pickers';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
//import { DatePicker , MuiPickersUtilsProvider} from "@material-ui/pickers";
//import DateFnsUtils from '@date-io/date-fns';
/* import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; */


const Todo = (props) => {

//const [startDate, setStartDate] = useState(null);
 const [progress,setprogress]=useState(props.progress)
 const [status,setstatus]=useState("Open")
//const [selectedDate, handleDateChange] = useState(new Date(new Date().toDateString()));
const[startDate,setStartDate]=useState(new Date());
const [endDate,setEndDate]=useState(new Date());
 //const [progress,setprogress]=useState(props.progress)
 //const [status,setstatus]=useState(props.status)
 const [inputProgress,setInputProgress]=useState(false)
 //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

/*  const handleDateChange = (date) => {
   setSelectedDate(date);
 }; */
 
 
 console.log(props)
 useEffect(()=>{
    setstatus(props.status);
    setprogress(props.progress)
    setStartDate(props.startDate)
    setEndDate(props.endDate)
  },[])

useEffect(()=>{
  setprogress(props.progress)
},[props.progress])
 
 const changeProgress=(e)=>{
    setprogress(e.target.value)
 }

 const updateDate=()=>{
     axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateDate`,{task:props.Task,startDate,endDate}).then((result)=>{
         setStartDate(startDate)
         setEndDate(endDate)
         props.mutate();
     }).catch((err)=>{
         console.log(err);
     })
 }

 const updateTask=()=>{
     axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateTask`,{task:props.Task,progress}).then((result)=>{
        if (progress > 100)
            setprogress(100)
        else if (progress < 0)
            setprogress(0)
        else
            setprogress(progress)
        props.mutate();
     }).catch((err)=>{
         console.log(err);
     })
 }

 const closeTask=()=>{
     console.log(props.id)
     axios.put(`${process.env.REACT_APP_BASE_URL}/task/closeTask`,{task:props.Task,id:props.id}).then((res)=>{
        if(status==="Open")
        setstatus("Closed")
      else  
      setstatus("Open")
         props.mutate(); //
     }).then((err)=>{
         console.log(err);
     })
 }


 
 const deleteTask=()=>{
     
    axios.put(`${process.env.REACT_APP_BASE_URL}/task/deleteTask`,{task:props.Task,id:props.id}).then((res)=>{
        props.mutate();
    }).catch((err)=>{
        console.log(err)
    })
 }

function assignCheck(){
    if (props.assignedBy === props.assignedTo){
        return "";
    }
    else
        return "Assigned By: "+props.assignedBy;
}

const myTheme = createMuiTheme({
    typography:{
        fontSize: 11
    }
  })

// const { datePicker } = myTheme();
/* const getToday=()=>{
    let today = new Date();
    today.setDate(today.getDate());
    today.setTime(today.getTime());
    const date = today.getFullYear()+'/'+(today.getMonth()+1)+'/'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+' '+time;
    return dateTime;
} */

    return(    
<div className="todo">
    <Tooltip title = {props.Task} arrow placement="bottom-start">
    <li>
    <li className= {`todo-item${status==="Open"?"Open":"Closed"}`}>
    <div className="textContainer">{props.Task}</div></li>
    <div className="mytask-name">
        <text>{assignCheck()}</text></div>
    </li>
    </Tooltip>
{/*     <Tooltip title = {props.Task} arrow placement="bottom-start">
    <li>
    <div className="assign-tm">
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <DatePicker
        autoOk
        label="Clearable"
        clearable
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
      />
           <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> 
      </MuiPickersUtilsProvider>
 </div>
    </li>
    </Tooltip> */}
    {/*     <DatePicker selected={startDate} 
    onChange={date => setStartDate(date)} /> */}
{/*         <text>Created on: {getToday()}</text>
 */}      
 <div className="assign-tm">
    <MuiThemeProvider theme={myTheme}>
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
        
        label="Start By"
        clearable
        format="MM/dd"
        disableFuture={false}
        disablePast={true}
        value={startDate}
        onChange={setStartDate}
        
      />
      
 </MuiPickersUtilsProvider></MuiThemeProvider>
 </div>
 <div className="assign-tm">
<MuiThemeProvider theme={myTheme}>
 <MuiPickersUtilsProvider utils={DateFnsUtils}><DatePicker
        autoOk
        label="End By:"
        clearable
        format="MM/dd"
        minDate={startDate}
        disableFuture={false}
        disablePast={false}
        value={endDate}
        onChange={setEndDate}
      /></MuiPickersUtilsProvider>
</MuiThemeProvider>
    </div>

          <div className="date">
        <Tooltip title="Save start & end date for task">
    <button className="date-set" onClick={updateDate}>
    <i className="far fa-calendar-plus"></i>
          </button>
          </Tooltip>
          </div>
 
      
    <input type="number" min="0" max="100" className="changeProgress"  placeholder='Edit Progress' disabled={status==="Open"?false:true} onChange={(event)=>{
        if (event.target.value > 100){alert("Too Big! Value should be between 0 to 100."); setprogress(0);}
        else if (event.target.value < 0){alert("Too Small! Value should be between 0 to 100.");setprogress(0);}
        else setprogress(event.target.value)}}></input>
    <div className="edit">
        <button className="edit-btn" onClick={updateTask}>
        <i className="fas fa-pencil-alt"></i>
        </button></div>
    <div className="progress">
          <ProgressBar variant="info" now={progress} label={`${progress}%`} />
          </div>
    
    <div className="status">
        <Tooltip title="Close Task">
    <button className="status-btn" onClick={closeTask}>
    <i className="fas fa-check"></i>
          </button>
          </Tooltip>
          </div>
          <div className="delete">
          <button className="trash-btn" onClick={deleteTask}>
        <i className="fas fa-trash"></i>
        </button>
        </div>
    </div>
   
    );
};
export default Todo;