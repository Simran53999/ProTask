import React from "react";
import '../Todo.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toolbar, Tooltip } from '@material-ui/core';

const DashboardTask = (props) => {
    let date = props.startDate?.split("T")
    let edate = props.endDate?.split("T")

    function nameCheck(){
        if (props.assignedBy === props.assignedTo){
            return "";
        }
        else if(props.assignedBy!==props.assignedTo){
            return "Assigned By: "+props.assignedBy;
        }
    }
    // console.log(props.assignedBy)
    return(
        <div className={`todo colorCode${props.colorCode}`} onClick={()=>{props.idChange(props.id);props.titleChange(props.Task);}} >
            <Tooltip title = {props.Task} arrow placement="bottom-start" enterDelay={500}>
                <li>
                    <li className= {`todo-item${props.status==="Open"?"Open":"Closed"}`}>
                        <div className="textContainer">
                            {props.Task}
                        </div>
                    </li>
                    <div className="assigned-name"> 
                        <text>{nameCheck}</text>
                    </div>
                </li>
            </Tooltip>
            <div className="date-name">
                <li>
                    <text>Start On: {date!==undefined?date[0]:null}</text>
                </li>
                <li>
                    <text>End On: {edate!==undefined?edate[0]:null}</text>
                </li>
            </div>
            <div className="progress">
                <ProgressBar variant="info" now={props.progress} label={`${props.progress}%`} />
            </div>
        </div>
    );
}
export default DashboardTask;