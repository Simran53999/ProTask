import React, {useEffect, useState} from "react";
import axios from 'axios';
import DashboardTask from "./DashboardTask";

const Dashboard = (props) =>{
    const [allTask, setAllTask] = useState([]);
    const [sortType, setSortType] = useState('');
    const [sortedDashBoardTask, setSortedDashBoardTask] = useState([]);

    useEffect(() => {
   axios.get(`${process.env.REACT_APP_BASE_URL}/task/getAllTask/${props.username}`)
   .then((res)=>{
    setAllTask(res.data);
    console.log(sortType)
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
      // const dashTask = [...allTask];
       console.log(allTask)
      let sortedDashBoard=[];
      if(sortProperty==="Task")
      { 
        sortedDashBoard=res.data.sort((b,a)=>b.Task>a.Task?1:-1);
      }
      else if(sortProperty==="progress")
      { 
        sortedDashBoard=res.data.sort((b,a)=>b.progress<a.progress?1:-1); 
      }  
      else
      { sortedDashBoard=res.data
      } 
      setSortedDashBoardTask(sortedDashBoard)
      console.log(sortedDashBoard)
          }).catch((err)=>{
             console.log(err);
          })
  },[sortType,props.data])

/*   useEffect(() =>{

      //setSortedAssignTask(sortedAssignTask);   
  }, [sortType,props.data]); */

  return(
<div> 
  {sortedDashBoardTask.map((element,index)=>{
      return <DashboardTask Task={element.Task} id={element._id} status={element.status} progress={element.progress}  assignedBy={element.assignedBy} 
      assignedTo={element.assignedTo} endDate={element.endDate} startDate={element.startDate}
      />
    })    
}</div>
   
  )
}
export default Dashboard;