import React, { useEffect, useState } from "react";
import MultiSelect from "react-multi-select-component";
import axios from 'axios';
import ProgressBar from 'react-bootstrap/ProgressBar';
import './Todo.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Todo = (props) => {
 console.log(props)
 const [progress,setprogress]=useState(0)
 const [status,setstatus]=useState("Open")
 //const [progress,setprogress]=useState(props.progress)
 //const [status,setstatus]=useState(props.status)
 const [inputProgress,setInputProgress]=useState(false)
 
 useEffect(()=>{
    setstatus(props.status);
    setprogress(props.progress)
  },[])
 const changeProgress=(e)=>{
    setprogress(e.target.value)
 }

 const updateTask=()=>{
     axios.put('http://localhost:8000/task/updateTask',{task:props.Task,progress}).then((result)=>{
        console.log(result);
        setprogress(progress)
     }).catch((err)=>{
         console.log(err);
     })
 }

 const closeTask=()=>{
     axios.put('http://localhost:8000/task/closeTask',{task:props.Task,id:props.id}).then((res)=>{
         console.log(res);
         setstatus("Closed")
     }).then((err)=>{
         console.log(err);
     })
 }

 const deleteTask=()=>{
    axios.put('http://localhost:8000/task/deleteTask',{task:props.Task,id:props.id}).then((res)=>{
        props.set(res.data.myTask,res.data.assignedTask)
    }).catch((err)=>{
        console.log(err)
    })
 }

  //const now=150;
    return(    
<div className="todo">
    <li className= {`todo-item${status==="Open"?"Open":"Closed"}`}>
        {props.Task}
    </li>
    {/* className="fas fa-pencil"<input className="input-progress"></input>  */}

    <input className="changeProgress"  placeholder='Edit Progress' disabled={status==="Open"?false:true} onChange={(event)=>setprogress(event.target.value)}></input>
   
    <div className="edit">
        <button className="edit-btn" onClick={updateTask}>
        <i className="fas fa-tasks"></i>
        </button></div>
   
    <div className="progress">
          <ProgressBar variant="info" now={progress} label={`${progress}%`} />
          </div>
    
    <div className="status">
    <button className="status-btn" onClick={closeTask}>
    <i className="fas fa-check"></i>
          </button>
          </div>
          <div className="delete">
          <button className="trash-btn" onClick={deleteTask}>
        <i className="fas fa-trash"></i>
        </button>
        </div>
          
          
        {/* <button className="trash-btn">
        <i className="fas fa-trash"></i>
    </button>  */}
       {/* <button className="share-btn">
       
        <i className="fas fa-share-alt"  ></i>
        
        </button>
        <button onClick={deleteHandler} className="access-btn">
        <i className="fas fa-tags"></i>
        </button>
         */} 
{/*<div className="dropdown">
 <MultiSelect
        options={Data}
        value={selected}
        onChange={setSelected}
        ArrowRenderer= {ArrowRenderer1}
        overrideStrings={{selectSomeItems:"Share with:",}}
      /> 
      </div>
      <div className="dropdown"> <MultiSelect
        options={Data}
        value={selected1}
        onChange={setSelected1}
        ArrowRenderer= {ArrowRenderer2}
        overrideStrings={{selectSomeItems:"Assign to:",}}
      />
 </div>*/}
      
     {/*  <div className="progress">
          <label id="status">
              {props.status}
          </label>
          <label id="changeProgress">Change Progress</label>
          <ProgressBar variant="Danger" now={props.progress} label={`${props.progress}%`} />
      </div> */}
    </div>
   
    );
};
export default Todo;