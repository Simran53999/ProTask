import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Axios from 'axios';
import Todo from './Todo';
import './Task.css';
import '../App.css';
import Select from 'react-dropdown-select';
import AssignTodo from './Assigntodo';
import useSWR from "swr";

const Task=(props)=>{
    
    const [mytask,setMyTask]=useState('');
    const [assigntask,setAssignTask]=useState('');
    const [id,setid]=useState('');
    const [selected1,setselected1]=useState([]);
    const [listOfUsers,setlistOfUsers]=useState([]);
    
    const fetcher=(url)=>{
        return axios.get(url).then(res=> res.data)
    }

    const {data,error,mutate}=useSWR(
        `${process.env.REACT_APP_BASE_URL}/user/getUser/${props.match.params.id}`,
        fetcher
    )
    console.log(data);
    const setSelected1 = (value)=>{
        let arr=[...selected1];
        arr.push(value)
        setselected1(arr);
    }
    
    useEffect(()=>{
        const id=(props.match.params.id)
        const url=`${process.env.REACT_APP_BASE_URL}/user/getUser/${id}`;
       
            axios.get(`${process.env.REACT_APP_BASE_URL}/task/getAllUsers`)
            .then((res)=>{
                setlistOfUsers(res.data);
            }).catch((err)=>{
               console.log(err);
            })
        
    },[])

    const addTask=()=>{
        axios.put(`${process.env.REACT_APP_BASE_URL}/task/addMyTask`,{id:id,task:mytask})
        .then((result)=>{
            mutate();
        }).catch((err)=>{
            console.log(err);
        })
     }

    const assignTask=()=>{
        console.log("In assignTask")
        let listOfUser=[];
        selected1.forEach(element=>{
          let obj={}
          obj["username"]=element.label
          listOfUser.push(obj)
        })
        console.log(listOfUser,props.match.params.id,assigntask)
        axios.post(`${process.env.REACT_APP_BASE_URL}/task/delegateTask`,{listOfUser,id:props.match.params.id,task:assigntask}).then((res)=>{
          console.log(res)
          
        }).catch((err)=>{
          console.log(err);
        })
    }

   
        var MyTask=[] ;
        var AssignTask=[];
         MyTask=data?.myTask?.map((element,index)=>{
          return <Todo Task={element.Task} id={id} status={element.status} progress={element.progress}  mutate={mutate}/>
        })
       
        AssignTask=data?.assignedTask?.map((element)=>{
            return <AssignTodo Task={element.Task} id={id} status={element.status} progress={element.progress}  mutate={mutate}/>
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
              {}
                <div className= "my-todo-column">
                  <h3>My tasks</h3>
                <form>
                 <input value={mytask} onChange={(event)=> setMyTask(event.target.value)} type="text" className="todo-input" /> 
                 <button onClick={addTask} className="todo-button" type="submit">
                   <i className="fas fa-plus-square"></i>
                 </button>
              </form>
                  {MyTask}
                  </div>
                <div className="assign-todo-column">
                <h3>Assign tasks</h3>
                <form>
                 <input value={assigntask} onChange={(event)=> setAssignTask(event.target.value)} type="text" className="todo-input" /> 
                 
                 <div className="dropdown"> 
                 <Select
    multi
    options={listOfUsers}
    onChange={(values) => setSelected1(values)}
    className="react-select"
    placeholder="Assign Tasks ..."
  />

 </div>
 <button  className="todo-button" type="submit" onClick={assignTask}>
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