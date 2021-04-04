var express=require('express');
var router=express.Router({ mergeParams: true });

var task=require('../Models/Task');
var user=require('../Models/User');

router.get('/getAllUsers/:username',(req,res)=>{
 const  username=req.params['username'];
 var listOfUser=[]
    user.find({}).then((result)=>{
        let c=1;
        result.forEach((u)=>{
            if(u.username!==username){
            let obj={};
            obj['label']=u.username;
            obj['value']=c;
            c++;
            listOfUser.push(obj);
            }
        })
        res.send(listOfUser).status(200);
    }).catch((err)=>{
        console.log(err);
    })
})

router.get('/getAllTask/:username',(req,res)=>{
    const username=req.params['username'];
    task.find({}).then((tasks)=>{ 
        let allTask =[];
        tasks.forEach(t=>{
            if(t.assignedTo===username || t.assignedBy===username)
             allTask.push(t); 
        })
        res.send(allTask)
    }).catch((error)=>{
        res.send(error)
    })
})

router.put('/addMyTask',(req,res)=>{
    var Task=new task({
        Task:req.body.task,
        status:"Open",
        progress:0,
        assignedBy:req.body.username,
        assignedTo:req.body.username,
        createdOn:req.body.datetime
    }); 
    Task.save().then((response)=>{
        console.log("task created");
        res.send(response);
    }).catch((err)=>{
        res.send(err);
    })
});


router.put('/closeTask',(req,res)=>{
    task.findOne({_id:req.body.id}).then((Task)=>{
       if(Task.status==="Open")
         Task.status="Closed";
       else
         Task.status="Open";
       Task.save().then((result)=>{
          res.send(result);
       }).catch((error)=>{
           res.send(error)
       })    
    }).catch((error)=>{
        res.send(error)
    });
})

router.put('/updateTask',(req,res)=>{
    task.findOne({_id:req.body.id}).then((Task)=>{
        Task.progress=req.body.progress;
        Task.save().then((result)=>{
            console.log(result)
            res.send(result)
        }).catch((error)=>{
            res.send(error)
        })
    }).catch((error)=>{
        res.send(error);
    })
})

router.put('/changeTaskName',(req,res)=>{
    task.findOne({_id:req.body.id}).then((Task)=>{
        Task.Task=req.body.taskName;
        Task.save().then((result)=>{
            console.log(result)
            res.send(result)
        }).catch((error)=>{
            res.send(error)
        })
    }).catch((error)=>{
        res.send(error);
    })
})

router.put('/updateDate',(req,res)=>{
    task.findOne({_id:req.body.id}).then((Task)=>{
        Task.startDate=req.body.startDate;
        Task.endDate=req.body.endDate;
        Task.save().then((result)=>{
            res.send(result)
        }).catch((error)=>{
            res.send(error)
        })
    }).catch((error)=>{
        res.send(error);
    })    
})

router.put('/deleteTask',(req,res)=>{
    task.deleteOne({_id:req.body.id}).then((result)=>{
        res.send({
            Message:"Deleted Task successfully",
            body:result
        });
    }).catch((error)=>{
        res.send(error);
    })
})

router.post('/delegateTask',(req,res)=>{
   var Task=new task({
       Task:req.body.task,
       status:"Open",
       progress:0,
       assignedTo:req.body.listOfUser[0].username,
       assignedBy:req.body.username,
       expectedEndDate:req.body.expectedEndDate
   })
   Task.save().then(result=>{
    res.send(result)
   }).catch((error)=>{
       res.send(error)
   })    
})

module.exports=router;
