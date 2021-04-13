import React, { useEffect, useState } from "react";
import { withRouter, useLocation, Link} from "react-router-dom";
import useSWR from "swr";
import axios from "axios";
import SubTask from "./SubTask";
import * as useStyles from "../styles/homePageStyles";
import {
  Button,
} from "@material-ui/core";


const Temp = (props) => {
  const classes = useStyles.headerUseStyles();
  const location=useLocation();
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
/*   useEffect(()=>{
    console.log(location.state.taskProgress);
   // console.log(location.state.setprogress);
  },[location]); */
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  let progress = 0;
  data.forEach(i=>
    progress+=i.progress/data.length)
    console.log(progress)
  return (
    <div>
       <Button className={classes.goBackToTaskBtn}
                        onClick={() => props.history.goBack()}
                            children="Go Back"
                            disableElevation
                        />
      <SubTask
        mutate={mutate}
        data={data}
        taskid={props.match.params.id}
        taskname={props.match.params.taskName}
        taskProgress={progress}
        date={props.match.params.taskStartDate}
        edate={props.taskEndDate}
        eedate={props.taskExpectedEndDate}
        status={props.taskStatus}
      />
    </div>
  );
};
export default withRouter(Temp);
