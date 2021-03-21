
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

export default function Sort(props){

    const [mytask,setMyTask]=useState('');
    const [assigntask,setAssignTask]=useState('');
    const [id,setid]=useState('');
    const [selected1,setselected1]=useState([]);
    const [listOfUsers,setlistOfUsers]=useState([]);
    const [Data, setData]=useState([]);
    const [sortType, setSortType] = useState('');
    let MyTask=[];
    let AssignTask=[];

    const addTask=(event)=>{
        event.preventDefault();
        console.log(mytask,id);
          axios.put(`${process.env.REACT_APP_BASE_URL}/task/addMyTask`,{id:props.id,task:mytask,username:props.username})
          .then((result)=>{
            console.log(result);
            //setMyTask(mytask)
             props.mutate();
             setMyTask("");
          }).catch((err)=>{
              console.log(err);
          })
       }
       const submitHandlerMyTodo=(event)=>{
        setMyTask(event.target.value)
     }
     useEffect(()=>{
        setMyTask(props.mytask);
      },[])

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
          axios.post(`${process.env.REACT_APP_BASE_URL}/task/delegateTask`,{listOfUser:listOfUser,id:props.id,task:assigntask}).then((res)=>{
            console.log(res)
            setAssignTask("");
            console.log(selected1);
      //setselected1(null);
      console.log(selected1);
      props.mutate();
          }).catch((err)=>{
            console.log(err);
          })
      }
      const submitHandlerAssignTodo=(event)=>{
        setAssignTask(event.target.value)
     }

     let data=props.useUser()

     useEffect(()=>{
         console.log(data.myTask)
    let arr=data.myTask.sort((a,b)=>{
    return b["_id"]-a["_id"];
  })
  console.log(arr)    
},[data])  

     MyTask=props.data?.myTask?.map((element,index)=>{
        return <Todo Task={element.Task} id={props.id} status={element.status} progress={element.progress}  mutate={props.mutate} assignedBy={element.assignedBy} 
        assignedTo={element.assignedTo} startDate={element.startDate} endDate={element.endDate}/>
      })

      AssignTask=props.data?.assignedTask?.map((element)=>{
          return <AssignTodo Task={element.Task} id={props.id} status={element.status} progress={element.progress}  mutate={props.mutate} assignedBy={element.username}
          assignedTo={element.assignedTo} startDate={element.startDate} endDate={element.endDate}/>
      })
      useEffect(() =>{
        const sortArray = type => {
          const types = {
            progress: 'progress',
            Task: 'Task',
            status: 'status',
          };
          const sortProperty = types[type];
           const mtask = data?.myTask;
          const sorted = data?.myTask.sort((a, b) => b[sortProperty] - a[sortProperty]);
          console.log(sorted);
          setData(sorted);
          // MyTask = Data;
          console.log("hello haha", mtask);
        };
        sortArray(sortType);
      }, [sortType]);

    return (
        
        <div className="task-grid" >
            
        <div className= "my-todo-column">
          <h3>My tasks</h3>
        <form >
         <input value={mytask}  onChange={submitHandlerMyTodo} type="text" className="todo-input" /> 
{/*                  <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
*/}                 <button onClick={addTask} className="todo-button" type="submit">
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
options={props.listOfUsers}
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
    )
}