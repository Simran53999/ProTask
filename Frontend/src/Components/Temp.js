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
  const history = useHistory();
  console.log(location)
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
  return (
    <div className="SubTask-Layout">
      <div className="SubTask-Heading">
        <div onClick={()=>{history.goBack()}} className="SubTask-BackButton">
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
        taskProgress={props.location.state.taskProgress}
      />
    </div>
  );
};
export default Temp;
