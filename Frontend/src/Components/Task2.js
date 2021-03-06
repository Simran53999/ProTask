import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Todo from './Todo';
import './Task.css';
import '../App.css';
import { Grid } from "@material-ui/core";
import { MainContainerStyles } from "../styles/homePageStyles";
import Select from 'react-dropdown-select';
import AssignTodo from './Assigntodo';
import useSWR from "swr";
import Header from "./Header";
/* import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; */

import { Tooltip } from '@material-ui/core';
import Sort from './Sort';

const Task=(props)=>{
  const classes = MainContainerStyles();
 // const [Data,setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
    const [listOfUsers,setlistOfUsers]=useState([]);
    
    const fetcher=async url=>{
      const res = await axios.get(url);
    return res.data;
  }

    const {data,error,mutate}=useSWR(
      `${process.env.REACT_APP_BASE_URL}/user/getUser/${props.match.params.id}`, fetcher)
 /*      if (error) return <div>failed to load</div>
      if (!data) return <div>loading...</div> */

      function useUser () {
        const { data, error } = useSWR(`${process.env.REACT_APP_BASE_URL}/user/getUser/${props.match.params.id}`, fetcher)
      
        return data
      
      }

    useEffect(()=>{
      const id=(props.match.params.id)
      //const url=`${process.env.REACT_APP_BASE_URL}/user/getUser/${id}`;
          axios.get(`${process.env.REACT_APP_BASE_URL}/task/getAllUsers/${props.match.params.username}`)
          .then((res)=>{
            mutate();
           // console.log(Data)
              setlistOfUsers(res.data);
          }).catch((err)=>{
             console.log(err);
          })
  },[data])
//const Data=data.myTask
//console.log(Data)  

/* useEffect(()=>{
    data.myTask.sort((a,b)=>{
    return b["Task"]-a["Task"];
  })    
},[data])  */

     if (error) return <div>failed to load</div>
     if (!data) return <div>loading...</div>
    console.log(data);



 
//const dropdownHandler = (event)=>{
  //setselected1(event.target.value)
//}


        
        return(
          <div className={classes.root}>
          
              <Grid item xs={12} className={classes.paperTop}>
                  <Header {...props} />
              </Grid>
              
            <div className="Task">
              {/* <header>
              <h1>ProTask</h1> 
              </header> */}
              <div className="welc">
                <h2> Welcome {props.match.params.username} </h2>
              </div>
              {/* <div className="sort">
                <select className="in-select" onChange={(e) => {setSortType(e.target.value)}}>
                  <option value="" disabled selected>Sort By:</option>
                  <option value="progress">Progress</option>
                  <option value="Task">Task</option>
                  <option value="status">Status</option>
                </select>
              </div> */}
                <Sort username={props.match.params.username} id={props.match.params.id}
                mutate={mutate} useUser={useUser}
                data={data} listOfUsers={listOfUsers}/>
            </div>  
            
            </div>
        )
    }
  
export default withRouter(Task);