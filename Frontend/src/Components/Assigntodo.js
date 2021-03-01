import React, { useEffect, useState } from "react";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssignTodo = (props) => {
    
 const [progress,setprogress]=useState(props.progress)
 const [status,setstatus]=useState(props.status)
 

 const closeTask=()=>{
    axios.put('http://localhost:8000/task/closeTask',{task:props.Task,id:props.id}).then((res)=>{
        console.log(res);
        setstatus("Closed")
    }).then((err)=>{
        console.log(err);
    })
}
const deleteTask=()=>{
    axios.put('http://localhost:8000/task/deleteTask',{task:props.Task,id:props.id}).then((res)=>{
        props.set(res.data.myTask,res.data.assignedTask)
    }).catch((err)=>{
        console.log(err)
    })
 }

    return(    
<div className="todo">
    <li className= {`todo-item${status==="Open"?"Open":"Closed"}`}>
        {props.Task}
    </li>
   
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