import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import useSWR from "swr";
import axios from 'axios';
import Sub from './Sub';
import Select from 'react-dropdown-select';
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Todo.css";
import "bootstrap/dist/css/bootstrap.min.css";

const SubTask=(props)=>{
console.log(props)
    const [subtask,setsubtask]=useState("");
    const [sortType, setSortType] = useState('');
    const [sortedSubtask,setSortedSubtask]=useState([]);
    const [calculateTaskProgress,setcalculateTaskProgress]=useState(props.taskProgress)
    const [numberOfSubtask,setnumberOfSubtask]=useState(0);
    let sdate = props.date?.split("T")
    console.log(props.date)
    console.log(sdate);
    let sedate = props.edate?.split("T")
    console.log(sedate)
   let seedate = props.eedate?.split("T")
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
/*     let progress = 0;
    sortedSubtask.forEach(i=>
      progress+=i.progress/sortedSubtask.length)
      console.log(progress)
    setcalculateTaskProgress(progress) */
}, [sortType,props.data]);

useEffect(()=>{
axios.put(`${process.env.REACT_APP_BASE_URL}/task/updateTask`, {
  id: props.taskid,
  progress:props.taskProgress,
})
.then((result) => {

}).catch((err)=>{
  console.log(err)
})},[props.taskProgress]); 
/* if (error) return <div>failed to load</div>
if (!data) return <div>loading...</div> */

return(
    <div className= "my-todo-column">
    <h3>{props.taskname}</h3>
  <div className="progress">
        <ProgressBar variant="info" now={props.taskProgress} label={`${props.taskProgress}%`} />
        </div>
        <div className="date-name">
        <div>
          <text>
            Expected End Date : {seedate!==undefined?seedate[0]:null}
          </text>
        </div>
        <div>
          <text>
            Start On: {sdate!==undefined?sdate[0]:null}
          </text>
        </div>
        <div>
          <text>
            End On: {sedate!==undefined?sedate[0]:null}
          </text>
        </div>
      </div>
      
    <form >
      <input 
        value={subtask}  
        onChange={submitHandlerSubTask} 
        type="text" 
        className="todo-input" 
        placeholder="Add Subtasks..."
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
        return <Sub Subtask={element.Subtask} 
        numberOfSubtask={sortedSubtask.length} taskProgress={calculateTaskProgress} 
        setcalculateTaskProgress={setcalculateTaskProgress}
        id={element._id} subtaskStatus={element.status} 
        subtaskProgress={element.progress} mutate={props.mutate}
        taskid={props.taskid}/>
      })}
      </div>
)
}
export default withRouter(SubTask);