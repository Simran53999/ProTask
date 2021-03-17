import React, { useEffect, useState } from "react";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tooltip } from '@material-ui/core';

const AssignTodo = (props) => {
    
 const [progress,setprogress]=useState(props.progress)
 const [status,setstatus]=useState(props.status)
 

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
    <div className="assigned-name"> 
    <text>Assigned To: {props.assignedTo}</text></div>
    <div className="progress">
          <ProgressBar variant="info" now={progress} label={`${progress}%`} />
          </div>
    
    <div className="status">
    <button className="status-btn" onClick={closeTask}>
    <i className="fas fa-check" ></i>

          </button>
          </div>
          <div className="delete">
          <button className="trash-btn" onClick={deleteTask}>
        <i className="fas fa-trash"></i>
        </button>
        </div>
    </div>
   
    );
};
export default AssignTodo;