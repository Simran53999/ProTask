import React, {useEffect,useState} from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./Todo.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Tooltip } from "@material-ui/core";

const Sub = (props) =>{

    let subtaskNameInput = null;
     const [subtaskProgress,setSubtaskProgress]=useState(props.subtaskProgress)
     const [subtaskStatus,setSubtaskStatus]=useState("Open")
    const [subtaskName, setSubtaskName] = useState(props.Subtask)
    const [subtaskNameIsEditable, setSubtaskNameIsEditable] = useState(false);

    useEffect(()=>{
        setSubtaskProgress(props.subtaskProgress)
        setSubtaskStatus(props.subtaskStatus)
        setSubtaskName(props.Subtask)
      },[props])

const updateSubtask=(event)=>{
        if(event.target.value!=null){
           axios.put(`${process.env.REACT_APP_BASE_URL}/subtask/updateSubTask`,{id:props.id,progress:subtaskProgress}).then((result)=>{
              if (subtaskProgress > 100)
                  setSubtaskProgress(100)
              else if (subtaskProgress < 0)
                  setSubtaskProgress(0)
              else
                  setSubtaskProgress(subtaskProgress)
              props.mutate();
           }).catch((err)=>{
               console.log(err);
           })
        }
      }

const updateSubtaskOnEnter=(event)=>{
        if(event.key==='Enter' && event.target.value!=null){
         axios.put(`${process.env.REACT_APP_BASE_URL}/subtask/updateSubTask`,{id:props.id,progress:subtaskProgress}).then((result)=>{
            if (subtaskProgress > 100)
                setSubtaskProgress(100)
            else if (subtaskProgress < 0)
                setSubtaskProgress(0)
            else
                setSubtaskProgress(subtaskProgress)
            props.mutate();
            event.target.value = '';
         }).catch((err)=>{
             console.log(err);
         })
       }
      }

      const closeSubtask=()=>{
        axios.put(`${process.env.REACT_APP_BASE_URL}/subtask/closeSubTask`,{id:props.id}).then((res)=>{
           if(subtaskStatus==="Open")
           setSubtaskStatus("Closed")
         else  
         setSubtaskStatus("Open")
            props.mutate(); //
        }).then((err)=>{
            console.log(err);
        })
    }
   
   const changeSubtaskNameOnEnter = (event,id) => {
     if(setSubtaskNameIsEditable && event.key==='Enter'){
       setSubtaskName(event.target.value);
       setSubtaskNameIsEditable(!subtaskNameIsEditable);
       axios
       .put(`${process.env.REACT_APP_BASE_URL}/subtask/changeSubTaskName`,{id:props.id,subtaskName:event.target.value})
       .then((result)=>{
           console.log('updated subtask name');
           props.mutate();
        })
       .catch((err)=>{
            console.log(err);
        })
     }
     else{
       console.log('won\'t update subtask name');
     }
   }
   
   const changeSubtaskNameOnFocusOut = (event,id) => {
     console.log('on focus out')
     console.log(event.target.value)
     console.log(event);
     if(subtaskNameIsEditable){
       setSubtaskName(event.target.value);
       setSubtaskNameIsEditable(!subtaskNameIsEditable);
       axios
       .put(`${process.env.REACT_APP_BASE_URL}/subtask/changeSubTaskName`,{id:props.id,subtaskName:event.target.value})
       .then((result)=>{
           console.log('updated subtask name');
           props.mutate();
        })
       .catch((err)=>{
            console.log(err);
        })
     }
     else{
       console.log('won\'t update subtask name');
     }
   }
    
    const deleteSubtask=()=>{
       axios.put(`${process.env.REACT_APP_BASE_URL}/subtask/deleteSubTask`,{id:props.id}).then((res)=>{
           props.mutate();
       }).catch((err)=>{
           console.log(err)
       })
    }

    return(
<div className="todo">
    {/*Edit TaskName Button*/}
    <div className="edit">
      <Tooltip title = 'Edit Subtask Name' enterDelay={700}>
        <button className="edit-btn" onClick={(event)=>{setSubtaskNameIsEditable(!subtaskNameIsEditable);subtaskNameInput.focus();}}>
          <i className="fas fa-pencil-alt"/>
        </button>
      </Tooltip>
    </div>
    {/*TaskName*/}
    <Tooltip title = {props.Subtask} arrow placement="bottom-start" enterDelay={300}>
      <div>
        <div className= {`todo-item${subtaskStatus==="Open"?"Open":"Closed"}`}>
          <div className="textContainer mh2">
            <input 
              value={(subtaskNameIsEditable)?null:subtaskName}
              style={{border:`${(subtaskNameIsEditable)?'1px solid black':'none'}`}}
              className={`taskName ${(subtaskStatus==='Open')?'':'completed'}`}
              ref={(input) => { subtaskNameInput = input; }}
              // onDoubleClick={event => setTaskNameIsEditable(!taskNameIsEditable)}  
              onKeyPress={event => changeSubtaskNameOnEnter(event,props.id)} 
              onBlur={event => changeSubtaskNameOnFocusOut(event,props.id)} 
              />
          </div>
        </div>
      </div>
    </Tooltip>
    <input 
      type="number" min="0" max="100" 
      className="changeProgress"  
      placeholder='Edit Progress' 
      disabled={subtaskStatus==="Open"?false:true} 
      onChange={(event)=>{ 
        if (event.target.value <= 100 && event.target.value >= 0)
          setSubtaskProgress(event.target.value); 
        else 
          event.target.value = subtaskProgress;
        }} 
      onBlur={event => {updateSubtask(event);event.target.value = '';}} 
      onKeyPress={event => {updateSubtaskOnEnter(event);}}
      />
    <div className="progress">
      <ProgressBar variant="info" now={subtaskProgress} label={`${subtaskProgress}%`} />
    </div>
    
    <div className="status">
      <Tooltip title={(subtaskStatus==='Open')?'Close Task':'Open Task'}>
        <button className="status-btn" onClick={closeSubtask}>
          <i className={(subtaskStatus==='Open')?'fa fa-lock ma2':'fa fa-unlock ma2'} />
        </button>
      </Tooltip>
    </div>
    
    <Tooltip title={'Delete Subtask'} enterDelay={700}>
      <div onClick={deleteSubtask}>
        <div className='trashBin'>
          <div className='trashBinLid'>
            <div className='trashBinHandle'></div>
            <div className='trashBinCover'></div>
          </div>
          <div className='trashBinCan'>
            <div className='trashBinCanLine'></div>
            <div className='trashBinCanLine'></div>
            <div className='trashBinCanLine'></div>
          </div>
        </div>
      </div>
    </Tooltip>
  </div>
);
}
export default Sub;