var express=require('express');
var router=express.Router({ mergeParams: true });
var task=require('../Models/Task');
var user=require('../Models/User');

router.post('/signup',(req,res)=>{
    user.findOne({email:req.body.email}).then((result)=>{
        if(result)
          res.send("User already Exists");
        else
        {
            var User=new user({
                email:req.body.email,
                password:req.body.password,
                username:req.body.username,
            });
            User.save().then((result)=>{
                console.log("User Created");
                res.send(result);
            }).catch((err)=>{
                res.send(err)
            });
        }  
    }).catch((err)=>{
        res.send(err);
    })
});

router.post('/login',(req,res)=>{
    user.findByCredentials(req.body.email,req.body.password).then((result)=>{
        res.send(result);
    }).catch((e)=>{
        res.status(400).send("Could not find user");
    })
})

router.get('/getUser/:username',(req,res)=>{
   const username=req.params['username'];
   task.find({}).then((tasks)=>{
       let myTask=[];
       let assignedTask=[];
       tasks.forEach(t=>{
           if(t.assignedTo===username)
            myTask.push(t); 
           else if(t.assignedBy===username&&t.assignedTo!==username)
            assignedTask.push(t); 
       })
       res.send({
           myTask,
           assignedTask
       })
   }).catch((error)=>{
       res.send(error)
   })
})

module.exports=router;
