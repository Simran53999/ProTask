import React, { useEffect, useState } from "react";
import { withRouter, useLocation, Link, useHistory } from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import SubTask from "./SubTask";
import './SubTask.css';
import * as useStyles from "../styles/homePageStyles";
import {
  Button,
} from "@material-ui/core";


const Temp = (props) => {
  const classes = useStyles.headerUseStyles();
  const location=useLocation();
 
  console.log(location)
  console.log(props.location.state.taskStartDate)
/*   let sdate = props.taskStartDate?.split("T")

  console.log(sdate);
  let sedate = props.taskEndDate?.split("T")
  console.log(sedate)
 let seedate = props.taskExpectedEndDate?.split("T")
 console.log(seedate) */

  const fetcher = async (url) => {
    const res = await axios.get(url);
    return res.data;
  };

  
  console.log(props.match.params.id);
  const { data, error, mutate } = useSWR(
    `${process.env.REACT_APP_BASE_URL}/subtask/getAllSubTask/${props.match.params.id}`,
    fetcher
  );
  
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  let progress = 0;
  data.forEach(i=>
    progress+=i.progress/data.length)
    console.log(progress)
  return (

    
    <div className="SubTask-Layout">
      <div className="SubTask-Heading">
        <div onClick={() => props.history.goBack()} className="SubTask-BackButton">
          <i class="fa fa-arrow-left fa-2x" aria-hidden="true"/>
        </div>
        <div className="SubTask-Title">
          {props.match.params.taskName}
        </div>
      </div>
      <SubTask
        mutate={mutate}
        data={data}
        taskid={props.match.params.id}
        taskname={props.match.params.taskName}
        taskProgress={progress}
        date={props.location.state.taskStartDate}
        edate={props.location.state.taskEndDate}
        eedate={props.location.state.taskExpectedEndDate}
        status={props.location.state.taskStatus}
      />
    </div>
  );
};
export default withRouter(Temp);
