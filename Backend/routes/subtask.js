var express=require('express');
var router=express.Router({ mergeParams: true });

var task=require('../Models/Task');
var user=require('../Models/User');
var subtask=require('../Models/Subtask');

router.get('/getAllSubTask/:id',(req,res)=>{
    subtask.find({Taskid:req.params["id"]}).then((Subtask)=>{
        res.send(Subtask);
    }).catch((err)=>{
        res.send(err);
    })
});

router.put('/addSubTask',(req,res)=>{
    var Subtask=new subtask({
        Subtask:req.body.subtask,
        status:"Open",
        progress:0,
        Taskid:req.body.taskid
    }); 
    Subtask.save().then((response)=>{
        console.log("Subtask created");
        res.send(response);
    }).catch((err)=>{
        res.send(err);
    })
});

router.put('/closeSubTask',(req,res)=>{
    subtask.findOne({_id:req.body.id}).then((Subtask)=>{
       if(Subtask.status==="Open")
         Subtask.status="Closed";
       else
         Subtask.status="Open";
       Subtask.save().then((result)=>{
          res.send(result);
       }).catch((error)=>{
           res.send(error)
       })    
    }).catch((error)=>{
        res.send(error)
    });
});

router.put('/updateSubTask',(req,res)=>{
    subtask.findOne({_id:req.body.id}).then((Subtask)=>{
        Subtask.progress=req.body.progress;
        Subtask.save().then((result)=>{
            console.log(result)
            res.send(result)
        }).catch((error)=>{
            res.send(error)
        })
    }).catch((error)=>{
        res.send(error);
    })
})

router.put('/changeSubTaskName',(req,res)=>{
    subtask.findOne({_id:req.body.id}).then((Subtask)=>{
        Subtask.Subtask=req.body.subtaskName;
        Subtask.save().then((result)=>{
            console.log(result)
            res.send(result)
        }).catch((error)=>{
            res.send(error)
        })
    }).catch((error)=>{
        res.send(error);
    })
});

router.put('/updateSubTaskDate',(req,res)=>{
    subtask.findOne({_id:req.body.id}).then((Subtask)=>{
        Subtask.startDate=req.body.startDate;
        Subtask.endDate=req.body.endDate;
        Subtask.save().then((result)=>{
            res.send(result)
        }).catch((error)=>{
            res.send(error)
        })
    }).catch((error)=>{
        res.send(error);
    })    
})

router.put('/deleteSubTask',(req,res)=>{
    subtask.deleteOne({_id:req.body.id}).then((result)=>{
        res.send({
            Message:"Deleted SubTask successfully",
            body:result
        });
    }).catch((error)=>{
        res.send(error);
    })
})

module.exports=router;


