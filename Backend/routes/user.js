var express=require('express');
var router=express.Router({ mergeParams: true });
var validator = require("email-validator");
var task=require('../Models/Task');
var user=require('../Models/User');

router.post('/signup',(req,res)=>{
  console.log(validator.validate(req.body.email));
  if(validator.validate(req.body.email)){
    user
    .findOne({username:req.body.username}).then((result)=>{
      if(result)
        res.status(409).send({error: "User already Exists"});
      else{
        var User = new user({
            email:req.body.email,
            password:req.body.password,
            username:req.body.username,
        });
        user
        .findOne({email:req.body.email})
        .then((response)=>{
          if(response){
            res.status(409).send({error: "User already Exists"});
          }
          else{
            User.save()
            .then((result)=>{
                console.log("User Created");
                console.log(result);
                res.status(201).send(result);
            })
            .catch((err)=>{
                res.status(500).send(err)
            });
          }
        })
        .catch((err)=>{
          res.status(500).send(err);
        })
      }  
    })
    .catch((err)=>{
      res.status(500).send(err);
    })
  }
  else{
    res.status(409).send({error: "Invalid Email"});
  }
});

router.post('/login',(req,res)=>{
    user.findByCredentials(req.body.email,req.body.password).then((result)=>{
        res.status(201).send(result);
    }).catch((e)=>{
        res.status(409).send("Could not find user");
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
