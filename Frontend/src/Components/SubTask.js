import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import useSWR from "swr";
import axios from 'axios';
import Sub from './Sub';
import Select from 'react-dropdown-select';

const SubTask=(props)=>{
console.log(props)
    const [subtask,setsubtask]=useState("");
    const [sortType, setSortType] = useState('');
    const [sortedSubtask,setSortedSubtask]=useState([]);

/*     const fetcher=async url=>{
        const res = await axios.get(url);
        console.log(res)
        return res.data;
    }
  console.log(props.match.params.id)
      const {data,error,mutate}=useSWR(
        `${process.env.REACT_APP_BASE_URL}/subtask/getAllSubTask/${props.match.params.id}`, fetcher) */

const addSubTask=(event)=>{
    event.preventDefault();
    axios.put(`${process.env.REACT_APP_BASE_URL}/subtask/addSubTask`, {subtask:subtask,taskid:props.taskid}).then(()=>{
        props.mutate();
        setsubtask("");
    }).catch((err)=>{
        console.log(err);
    })
}
const submitHandlerSubTask=(event)=>{
    setsubtask(event.target.value);
}
useEffect(() =>{
  const sortArray = type => {
     switch(type)
     {
       case "Task":
         return "Task";
       case "progress":
         return "progress";
       default :
         return null;   
     }
    };

    const sortProperty = sortArray(sortType[0]?.value);
     const stask = [...props.data];
     console.log(stask)
      let sortedSubTask=[];
    if(sortProperty==="Task")
    { 
      sortedSubTask=stask.sort((b,a)=>b.Subtask>a.Subtask?1:-1);
    }
    else if(sortProperty==="progress")
    {
      sortedSubTask=stask.sort((b,a)=>b.progress<a.progress?1:-1); 
    }  
    else
    { 
      sortedSubTask=stask
    } 
    setSortedSubtask(sortedSubTask) 
}, [sortType,props.data]);

/* if (error) return <div>failed to load</div>
if (!data) return <div>loading...</div> */

return(
    <div className= "my-todo-column">
    <h3>{props.taskname}</h3>
    <form >
      <input 
        value={subtask}  
        onChange={submitHandlerSubTask} 
        type="text" 
        className="todo-input" 
      /> 
      <button onClick={addSubTask} className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <Select
              multi={false}
              searchable={true}
              keepSelectedInList={false}
              clearable={true}
              options={[
                {label:"progress",value:"progress"},
                {label:"Task",value:"Task"}
                ]
              }
              onChange={(values) => setSortType(values)}
              className="react-select"
              placeholder="Sort By..."                   
            />
      </form>
      {sortedSubtask.map((element)=>{
        return <Sub Subtask={element.Subtask} id={element._id} subtaskStatus={element.status} subtaskProgress={element.progress} mutate={props.mutate}/>
      })}
      </div>
)
}
export default withRouter(SubTask);