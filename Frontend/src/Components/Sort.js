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
import Dashboard from './Dashboard/Dashboard';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
  DatePicker 
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

export default function Sort(props){
    // console.log(props.data);

    const [mytask,setMyTask]=useState('');
    const [assigntask,setAssignTask]=useState('');
    const [id,setid]=useState('');
    const [selected1,setselected1]=useState([]);
    const [listOfUsers,setlistOfUsers]=useState([]);
    const [Data, setData]=useState([]);
    const [sortType, setSortType] = useState('');
    const [sortedMyTask,setSortedMyTask]=useState([]);
    const [sortedAssignTask,setSortedAssignTask]=useState([]);
    const [expectedendDate,setexpectedendDate]=useState(new Date());
    //const [sorted]
    let MyTask=[];
    let AssignTask=[];
    
    console.log(props.data)
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
        setexpectedendDate(props.expectedendDate);
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
         // let  correctDate = new Date("10:56:00") + expectedendDate;
          console.log(listOfUser)
          axios.post(`${process.env.REACT_APP_BASE_URL}/task/delegateTask`,{listOfUser:listOfUser,task:assigntask,username:props.username,expectedEndDate:expectedendDate})
          .then((res)=>{
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

     useEffect(() =>{
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
         const mtask = [...props.data?.myTask];
         const assignTask=[...props.data?.assignedTask];
         console.log(mtask)
        let sorted=[];let sortedAssignTask=[];
        if(sortProperty==="Task")
        { sorted=mtask.sort((b,a)=>b.Task>a.Task?1:-1);
          sortedAssignTask=assignTask.sort((b,a)=>b.Task>a.Task?1:-1);
        }
        else if(sortProperty==="progress")
        { sorted=mtask.sort((b,a)=>b.progress<a.progress?1:-1);
          sortedAssignTask=assignTask.sort((b,a)=>b.progress<a.progress?1:-1); 
        }  
        else
        { sorted=mtask
          sortedAssignTask=assignTask
        } 
        console.log(sorted);
        setSortedMyTask(sorted)
        setSortedAssignTask(sortedAssignTask);   
    }, [sortType,props.data,props.tab]);

    const datePickerTheme = createMuiTheme({
      overrides:{
      MuiInputBase:{
        input:{
          marginTop:"1.6vh",
          // borderBottom:"5px"
          // position:"relative",
          // top:"5%"
        }
      },
      MuiFormControl:{
        root:{
          height:"4rem"
        }
      },
      MuiInputLabel:{
        root:{
          marginLeft:"0.8vw"
        },
        shrink:{
          marginTop:"1vh",
        }
      },
      MuiInput:{
        root:{
          marginLeft:"0.8vw"
        },
        // underline:{
        //   marginBottom:"0.5rem"
        // }
      }
    },
      typography:{
          fontSize: 12
      }
    })
  return (
    <div>
      { props.tab==="myTask" &&       
        <div className= "my-todo-column">
          <h3>My tasks</h3>
          <form >
            <input 
              value={mytask}  
              onChange={submitHandlerMyTodo} 
              type="text" 
              className="todo-input" 
            /> 
            <button onClick={addTask} className="todo-button" type="submit">
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
          {sortedMyTask.map((element,index)=>{
            return <Todo Task={element.Task} id={element._id} status={element.status} progress={element.progress}  mutate={props.mutate} assignedBy={element.assignedBy} 
            assignedTo={element.assignedTo} endDate={element.endDate} startDate={element.startDate} 
            />
          })}
        </div>
      }
      { props.tab === "assignTask" &&
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
            <div className="assign-exp-date">
      <MuiThemeProvider theme={datePickerTheme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
          label="Expected End Date"
          clearable
          //format="MM/dd"
          //minDate={startDate??Date()}
          disableFuture={false}
          disablePast={true}
          value={expectedendDate}
          onChange={setexpectedendDate}
          autoOk
          />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    </div>
            <button  onClick={assignTask} className="todo-button" type="submit" >
              <i className="fas fa-plus-square"></i>
            </button>
          </form> 
          {
            sortedAssignTask.map((element,index)=>{
              return <AssignTodo 
                        Task={element.Task} 
                        id={element._id} 
                        status={element.status} 
                        progress={element.progress}  
                        mutate={props.mutate} 
                        assignedBy={element.username}
                        assignedTo={element.assignedTo} 
                        endDate={element.endDate} 
                        startDate={element.startDate}
                        expectedendDate={element.expectedEndDate}
                      />
            }) 
          }
        </div>
      }
      {props.tab === "dashboardTask" &&
        <Dashboard 
          username={props.username}
          data ={props.data}
          listOfUsers={props.listOfUsers}
          mutate={props.mutate}
        />
      }
    </div>
  )
}