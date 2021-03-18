import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Todo from './Todo';
import './Task.css';
import '../App.css';
import Select from 'react-dropdown-select';
import AssignTodo from './Assigntodo';
import useSWR from "swr";
import { Tooltip } from '@material-ui/core';

const Task=(props)=>{
    
    const [mytask,setMyTask]=useState('');
    const [assigntask,setAssignTask]=useState('');
    const [id,setid]=useState('');
    const [selected1,setselected1]=useState([]);
    const [listOfUsers,setlistOfUsers]=useState([]);
    
    const fetcher=async url=>{
      const res = await axios.get(url);
    return res.data;
  }

    const {data,error,mutate}=useSWR(
      `${process.env.REACT_APP_BASE_URL}/user/getUser/${props.match.params.id}`, fetcher)

    useEffect(()=>{
      const id=(props.match.params.id)
      //const url=`${process.env.REACT_APP_BASE_URL}/user/getUser/${id}`;
          axios.get(`${process.env.REACT_APP_BASE_URL}/task/getAllUsers/${props.match.params.username}`)
          .then((res)=>{
            mutate();
              setlistOfUsers(res.data);
          }).catch((err)=>{
             console.log(err);
          })
  },[data])

  useEffect(()=>{
    setMyTask(props.mytask);
  },[])

    // if (error) return <div>failed to load</div>
     //if (!data) return <div>loading...</div>
    console.log(data);

  const addTask=(event)=>{
      event.preventDefault();
      console.log(mytask,id);
        axios.put(`${process.env.REACT_APP_BASE_URL}/task/addMyTask`,{id:props.match.params.id,task:mytask,username:props.match.params.username})
        .then((result)=>{
          console.log(result);
          //setMyTask(mytask)
           mutate();
           setMyTask("");
        }).catch((err)=>{
            console.log(err);
        })
     }
     const submitHandlerMyTodo=(event)=>{
      setMyTask(event.target.value)
   }

    const assignTask=(event)=>{
      event.preventDefault();
      //event.target.reset();
        console.log("In assignTask")
        let listOfUser=[];
        selected1.forEach(element=>{
          let obj={}
          obj["username"]=element.label
          listOfUser.push(obj)
        })
        console.log(listOfUser)
        axios.post(`${process.env.REACT_APP_BASE_URL}/task/delegateTask`,{listOfUser:listOfUser,id:props.match.params.id,task:assigntask}).then((res)=>{
          console.log(res)
          setAssignTask("");
          console.log(selected1);
    //setselected1(null);
    console.log(selected1);
    mutate();
        }).catch((err)=>{
          console.log(err);
        })
    }
    const submitHandlerAssignTodo=(event)=>{
      setAssignTask(event.target.value)
   }
//const dropdownHandler = (event)=>{
  //setselected1(event.target.value)
//}
        var MyTask=[] ;
        var AssignTask=[];
         MyTask=data?.myTask?.map((element,index)=>{
          return <Todo Task={element.Task} id={id} status={element.status} progress={element.progress}  mutate={mutate} assignedBy={element.assignedBy} 
          assignedTo={element.assignedTo}/>
        })
  
        AssignTask=data?.assignedTask?.map((element)=>{
            return <AssignTodo Task={element.Task} id={props.match.params.id} status={element.status} progress={element.progress}  mutate={mutate} assignedBy={element.username}
            assignedTo={element.assignedTo}/>
        })
        
        return(
            <div className="Task">
              <header>
              <h1>ProTask</h1> 
              </header>
              <div className="welc">
                <h2> Welcome {props.match.params.username} </h2>
              </div>
              <div className="task-grid" >
                <div className= "my-todo-column">
                  <h3>My tasks</h3>
                <form >
                 <input value={mytask}  onChange={submitHandlerMyTodo} type="text" className="todo-input" /> 
                 <button onClick={addTask} className="todo-button" type="submit">
                   <i className="fas fa-plus-square"></i>
                 </button>
              </form>
                  {MyTask}
                  </div>
                <div className="assign-todo-column">
                <h3>Assign tasks</h3>
                <form >
                 <input value={assigntask} onChange={submitHandlerAssignTodo} type="text" className="todo-input" /> 
                 <div className="dropdown"> 
                 <Select
    multi={false}
    searchable={true}
    keepSelectedInList={false}
    clearable={true}
    options={listOfUsers}
    onChange={(values) => setselected1(values)}
    className="react-select"
    placeholder="Assign Tasks..."
  />
 </div>
 <button  onClick={assignTask} className="todo-button" type="submit" >
                   <i className="fas fa-plus-square"></i>
                 </button>
              </form> 
               {AssignTask}
                </div>
              </div>
            </div>  
        )
    }
  
export default withRouter(Task);