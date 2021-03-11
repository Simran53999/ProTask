import React, { useEffect, useState } from "react";
import MultiSelect from "react-multi-select-component";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from '@material-ui/core';


const Todo = (props) => {
 const [progress,setprogress]=useState(0)
 const [status,setstatus]=useState("Open")
 //const [progress,setprogress]=useState(props.progress)
 //const [status,setstatus]=useState(props.status)
 const [inputProgress,setInputProgress]=useState(false)
 
 useEffect(()=>{
    setstatus(props.status);
    setprogress(props.progress)
  },[])
 const changeProgress=(e)=>{
    setprogress(e.target.value)
 }

 const updateTask=()=>{
     axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateTask`,{task:props.Task,progress}).then((result)=>{
        setprogress(progress)
        props.mutate();
     }).catch((err)=>{
         console.log(err);
     })
 }

 const closeTask=()=>{
     axios.put(`${process.env.REACT_APP_BASE_URL}/task/closeTask`,{task:props.Task,id:props.id}).then((res)=>{
        if(status==="Open")
        setstatus("Closed")
      else  
      setstatus("Open")
         props.mutate();
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
    return(    
<div className="todo">
    <Tooltip title = {props.Task} arrow placement="bottom-start">
    <li className= {`todo-item${status==="Open"?"Open":"Closed"}`}>
    <div className="textContainer">{props.Task}</div>
    </li>
    </Tooltip>

    <input className="changeProgress"  placeholder='Edit Progress' disabled={status==="Open"?false:true} onChange={(event)=>setprogress(event.target.value)}></input>
    <div className="edit">
        <button className="edit-btn" onClick={updateTask}>
        <i className="fas fa-tasks"></i>
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