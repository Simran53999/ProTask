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
  return (
    <div>
      <SubTask
        mutate={mutate}
        data={data}
        taskid={props.match.params.id}
        taskname={props.match.params.taskName}
        taskProgress={props.location.state.taskProgress}
      />
                        {/*   <Link to="/">
                        <Button className={classes.logoutbtn}
                            children="Log Out"
                            disableElevation
                        />
                    </Link> */}
    </div>
  );
};
export default Temp;
