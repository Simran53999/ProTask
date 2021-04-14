import React, { useEffect, useState } from "react";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toolbar, Tooltip } from '@material-ui/core';
import { withRouter } from "react-router-dom";

const AssignTodo = (props) => {
    
 const [progress,setprogress]=useState(props.progress)
 const [status,setstatus]=useState(props.status)
 let date = props.startDate?.split("T")
 let edate = props.endDate?.split("T")
let eedate = props.expectedendDate?.split("T")
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
const goToSubtask = () => {
  props.history.push({
    pathname: `/${props.id}/${props.Task}`,
    state:{taskProgress:progress,},
  });
};

console.log(typeof(props.startDate))
  return(    
    <div className="todo2">
    
      <div className="taskHeading2">
        <div className={`taskName2 todo-item${status === "Open" ? "Open" : "Closed"}`}>
          <Tooltip
            title={props.Task}
            arrow
            placement="bottom-start"
            enterDelay={300}
          >
            <div className=" mh2">
              {props.Task}
            </div>
          </Tooltip>
        </div>
        <div className="assignedToName2">
            Assigned To: {props.assignedTo}
        </div>
      </div>
      
      <div className="expEndDate2">
          {`Exp. End Date:\n ${eedate!==undefined?eedate[0]:null}`}
      </div>
      <div className="stDate2">
          Start On: {date!==undefined?date[0]:null}
      </div>
      <div className="enDate2">
          End On: {edate!==undefined?edate[0]:null}
      </div>
      
      <div className="progress2">
        <ProgressBar variant="info" now={progress} label={`${progress}%`} />
      </div>
      
      <div className="status2">
      <Tooltip title={(status==='Open')?'Close Task':'Open Task'}>
        <button className="status-btn" onClick={closeTask}>
          <i className={(status==='Open')?'fa fa-lock ma2':'fa fa-unlock ma2'} />
        </button>
      </Tooltip>
    </div>
    
      <div className="delete2">
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
    
    <div className="subtasks2">
        <Tooltip title={"Add Subtasks"} enterDelay={700}>
          <button className="status-btn" onClick={goToSubtask}>
            <i className="fas fa-tasks" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};
export default  withRouter(AssignTodo);