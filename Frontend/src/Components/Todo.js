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
//hello
//import { DatePicker , MuiPickersUtilsProvider} from "@material-ui/pickers";
//import DateFnsUtils from '@date-io/date-fns';
/* import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; */


const Todo = (props) => {

//references--
let taskNameInput = null;
// console.log(props);

//Hooks--
//const [startDate, setStartDate] = useState(null);
 const [progress,setprogress]=useState(props.progress)
 const [status,setstatus]=useState("Open")
//const [selectedDate, handleDateChange] = useState(new Date(new Date().toDateString()));
const [startDate,setStartDate]=useState(new Date());
const [endDate,setEndDate]=useState(new Date());
const [taskName, setTaskName] = useState(props.Task)
const [taskNameIsEditable, setTaskNameIsEditable] = useState(false);
 //const [progress,setprogress]=useState(props.progress)
 //const [status,setstatus]=useState(props.status)
 const [inputProgress,setInputProgress]=useState(false)
 //const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));

/*  const handleDateChange = (date) => {
   setSelectedDate(date);
 }; */
 

useEffect(()=>{
  setprogress(props.progress)
  setstatus(props.status)
  setStartDate(props.startDate)
  setEndDate(props.endDate)
  setTaskName(props.Task)
},[props])

 const changeProgress=(e)=>{
    setprogress(e.target.value)
 }

const updateDate=(stDate, enDate, upd)=>{
  // console.log(new Date());
  // console.log('inside updateDate');
  // console.log(typeof stDate);
  // console.log(stDate);
  // console.log(typeof enDate);
  // console.log(enDate);
  
  if(upd){
    //.replace(/-/g, '\/').replace(/T.+/, '')
    // console.log('enDate');
    // console.log(enDate);
    enDate.setMinutes(enDate.getMinutes()-enDate.getTimezoneOffset());
    // console.log(enDate);
  }
  else{
    // console.log('stDate');
    // console.log(stDate);
    stDate.setMinutes(stDate.getMinutes()-stDate.getTimezoneOffset());
    // console.log(stDate);
  }
  
  axios
    .put(`${process.env.REACT_APP_BASE_URL}/task/updateDate`,{id:props.id,startDate:stDate,endDate:enDate}).then((result)=>{
      props.mutate();
    })
    .catch((err)=>{
      console.log(err);
    })
}

  const updateTask=(event)=>{
    if(event.target.value!=null){
       axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateTask`,{id:props.id,progress}).then((result)=>{
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
  }
 
  const updateTaskOnEnter=(event)=>{
    if(event.key==='Enter' && event.target.value!=null){
     axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateTask`,{id:props.id,progress}).then((result)=>{
        if (progress > 100)
            setprogress(100)
        else if (progress < 0)
            setprogress(0)
        else
            setprogress(progress)
        props.mutate();
        event.target.value = '';
     }).catch((err)=>{
         console.log(err);
     })
   }
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

const changeTaskNameOnEnter = (event,id) => {
  if(setTaskNameIsEditable && event.key==='Enter'){
    setTaskName(event.target.value);
    setTaskNameIsEditable(!taskNameIsEditable);
    axios
    .put(`${process.env.REACT_APP_BASE_URL}/task/changeTaskName`,{id:props.id,taskName:event.target.value})
    .then((result)=>{
        console.log('updated task name');
        props.mutate();
     })
    .catch((err)=>{
         console.log(err);
     })
  }
  else{
    console.log('won\'t update task name');
  }
}

const changeTaskNameOnFocusOut = (event,id) => {
  console.log('on focus out')
  console.log(event.target.value)
  console.log(event);
  if(taskNameIsEditable){
    setTaskName(event.target.value);
    setTaskNameIsEditable(!taskNameIsEditable);
    axios
    .put(`${process.env.REACT_APP_BASE_URL}/task/changeTaskName`,{id:props.id,taskName:event.target.value})
    .then((result)=>{
        console.log('updated task name');
        props.mutate();
     })
    .catch((err)=>{
         console.log(err);
     })
  }
  else{
    console.log('won\'t update task name');
  }
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
        fontSize: 10
    }
  })

return(    
  <div className="todo">
    {/*Edit TaskName Button*/}
    <div className="edit">
      <Tooltip title = 'Edit Task Name' enterDelay={700}>
        <button className="edit-btn" onClick={(event)=>{setTaskNameIsEditable(!taskNameIsEditable);taskNameInput.focus();}}>
          <i className="fas fa-pencil-alt"/>
        </button>
      </Tooltip>
    </div>
    {/*TaskName*/}
    <Tooltip title = {props.Task} arrow placement="bottom-start" enterDelay={300}>
      <div>
        <div className= {`todo-item${status==="Open"?"Open":"Closed"}`}>
          <div className="textContainer mh2">
            <input 
              value={(taskNameIsEditable)?null:taskName}
              style={{border:`${(taskNameIsEditable)?'1px solid black':'none'}`}}
              className={`taskName ${(status=='Open')?'':'completed'}`}
              ref={(input) => { taskNameInput = input; }}
              // onDoubleClick={event => setTaskNameIsEditable(!taskNameIsEditable)}  
              onKeyPress={event => changeTaskNameOnEnter(event,props.id)} 
              onBlur={event => changeTaskNameOnFocusOut(event,props.id)} 
              />
          </div>
        </div>
        <div className="mytask-name">
          <text>
            {assignCheck()}
          </text>
        </div>
      </div>
    </Tooltip>
     
    <div className="assign-tm">
      <MuiThemeProvider theme={myTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
          label="Start Date"
          clearable
          format="MM/dd"
          disableFuture={false}
          disablePast={false}
          value={startDate}
          onChange={value=>{
            if(value!==null){
              console.log(value);
                value.setHours(0);
                value.setMinutes(0);
                value.setSeconds(0);
              setStartDate(value);
              // tmp.setMinutes(tmp.getMinutes()-tmp.getTimezoneOffset());
              updateDate(value,endDate,false);
              // updateDate();
            }
          }}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
    
    <div className="assign-tm">
      <MuiThemeProvider theme={myTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="End Date"
            clearable
            format="MM/dd"
            minDate={startDate??Date()}
            disableFuture={false}
            disablePast={false}
            value={endDate}
            onChange={value=>{
              if(value!==null){
                value.setHours(17);
                value.setMinutes(30);
                value.setSeconds(0);
                setEndDate(value);
                var tmp = value;
                // tmp.setMinutes(tmp.getMinutes()-tmp.getTimezoneOffset());
                updateDate(startDate,value,true);
                // updateDate();
              }
            }}
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
    
    <input 
      type="number" min="0" max="100" 
      className="changeProgress"  
      placeholder='Edit Progress' 
      disabled={status==="Open"?false:true} 
      onChange={(event)=>{ 
        if (event.target.value <= 100 && event.target.value >= 0)
          setprogress(event.target.value); 
        else 
          event.target.value = progress;
        }} 
      onBlur={event => {updateTask(event);event.target.value = '';}} 
      onKeyPress={event => {updateTaskOnEnter(event);}}
      />
    <div className="progress">
      <ProgressBar variant="info" now={progress} label={`${progress}%`} />
    </div>
    
    <div className="status">
      <Tooltip title={(status==='Open')?'Close Task':'Open Task'}>
        <button className="status-btn" onClick={closeTask}>
          <i className={(status==='Open')?'fa fa-lock ma2':'fa fa-unlock ma2'} />
        </button>
      </Tooltip>
    </div>
    
    <Tooltip title={'Delete Task'} enterDelay={700}>
      <div onClick={deleteTask}>
        <div className='trashBin'>
          <div className='trashBinLid'>
            <div className='trashBinHandle'></div>
            <div className='trashBinCover'></div>
          </div>
          <div className='trashBinCan'>
            <div className='trashBinCanLine'></div>
            <div className='trashBinCanLine'></div>
            <div className='trashBinCanLine'></div>
          </div>
        </div>
      </div>
    </Tooltip>
    
  </div>
);
};
export default Todo;