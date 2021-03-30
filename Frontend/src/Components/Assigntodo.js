import React, { useEffect, useState } from "react";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toolbar, Tooltip } from '@material-ui/core';

const AssignTodo = (props) => {
    
 const [progress,setprogress]=useState(props.progress)
 const [status,setstatus]=useState(props.status)
 let date = props.startDate?.split("T")
 let edate = props.endDate?.split("T")
  
 useEffect(()=>{
    setprogress(props.progress);
    setstatus(props.status)
 },[props])
 
 const closeTask=()=>{
    axios.put(`${process.env.REACT_APP_BASE_URL}/task/closeTask`,{id:props.id}).then((res)=>{
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
    axios.put(`${process.env.REACT_APP_BASE_URL}/task/deleteTask`,{id:props.id}).then((res)=>{
        props.mutate();
    }).catch((err)=>{
        console.log(err)
    })
 }

 function dateCheck(){
    if (props.startDate === props.startDate){
        return "";
    }
    else
        return "Start on "+date!==undefined?date[0]:null;
}

console.log(typeof(props.startDate))
  return(    
    <div className="todo">
      <Tooltip title = {props.Task} arrow placement="bottom-start">
        <div className="textContainer">
          <div className={`todo-item${status==="Open"?"Open":"Closed"}`}>
            {props.Task}
          </div>
          <div className="assigned-name"> 
            <text>
              Assigned To: {props.assignedTo}
            </text> 
          </div>
        </div>
      </Tooltip>
      <div className="date-name">
        <div>
          <text>
            Start On: {date!==undefined?date[0]:null}
          </text>
        </div>
        <div>
          <text>
            End On: {edate!==undefined?edate[0]:null}
          </text>
        </div>
      </div>
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
export default AssignTodo;