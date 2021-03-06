var express=require('express');
var router=express.Router({ mergeParams: true });

var task=require('../Models/Task');
var user=require('../Models/User');

router.get('/getAllUsers/:username',(req,res)=>{
 const  username=req.params['username'];
 var listOfUser=[]
    user.find({}).then((result)=>{
        let c=1;
        console.log(result)
        result.forEach((u)=>{
            if(u.username!==username){
            let obj={};
            obj['label']=u.username;
            obj['value']=c;
            c++;
            listOfUser.push(obj);
            }
        })
        console.log(listOfUser)
        res.send(listOfUser).status(200);
    }).catch((err)=>{
        console.log(err);
    })
})


router.put('/addMyTask',(req,res)=>{
      var User=user.findOne({_id:req.body.id}).then((result)=>{
      console.log(result)  
      if(result){
      let t={
          Task:req.body.task,
          status:"Open",
          progress:0,
          assignedBy:req.body.username,
          assignedTo:req.body.username,
          createdOn:req.body.datetime
      }
      result.myTask.push(t);
      result.save().then((resul)=>{
        res.send(resul);
       }).catch((err)=>{
        res.send({message:"Error occured",error:err});
       })
    }else{
        res.status(400).send({message:"Couldn't find user"});
    }
    }).catch((err)=>{
        res.send(err);
    })
});

router.put('/deletemyTask',(req,res)=>{
    var User=user.findOne({_id:req.body.id}).then((result)=>{
        var newUser=User;
      newUser.myTask=req.body.task;
      newUser.save().then(()=>{
        res.send("Delegated Task");
       }).catch((err)=>{
        res.send(err);
       })
     
    }).catch((err)=>{
        res.send(err);
    });
})

router.put('/closeTask',(req,res)=>{
    var list=[]
    function UpdateAssignedTo(User){
        return new Promise((resolve,reject)=>{
                let i=User.myTask.findIndex(e=>e.Task===req.body.task)
                if( User.myTask[i].status==="Closed")
                User.myTask[i].status="Open"
                else
                   User.myTask[i].status="Closed"
                User.save().then((resul)=>{
                    console.log(resul)
                    resolve(resul)
                }).catch((err)=>{
                    reject(err)
                })
        })
    }

    function findUserOfTask(){
       user.find({"myTask.Task":req.body.task}).then((result)=>{
           result.forEach(e=>list.push(UpdateAssignedTo(e)))
           Promise.all(list).then((r)=>{
               user.findOne({"assignedTask.Task":req.body.task}).then((rr)=>{
                   if(rr)
                   {
                   let i=rr.assignedTask.findIndex(e=>e.Task===req.body.task)
                   if( rr.assignedTask[i].status==="Closed")
                    rr.assignedTask[i].status="Open"
                   else
                   rr.assignedTask[i].status="Closed"
                   rr.save().then(()=>{
                       user.findOne({_id:req.body.id}).then((Result)=>{
                           res.send(Result)
                       }).catch((err)=>{
                           res.send(err)
                       })
                   }).catch((err)=>{
                       res.send(err);
                   })
                   }
                   else{
                    user.findOne({_id:req.body.id}).then((Result)=>{
                        res.send(Result)
                    }).catch((err)=>{
                        res.send(err)
                    })
                   }
               })
           })
       })
    }
    findUserOfTask();
})

router.put('/updateTask',(req,res)=>{
    var list=[];
    function UpdateAssignedBy(){
        return new Promise((resolve,reject)=>{
            user.findOne({"assignedTask.Task":req.body.task}).then((result)=>{
                if(result!=null)
                {
                let i=result.assignedTask.findIndex((e)=>e.Task===req.body.task)
                result.assignedTask[i].progress=req.body.progress;
                result.save().then((r)=>{
                    console.log(r);
                    resolve(r);
                }).catch((err)=>{
                    reject(err);
                })
                }
                else{
                    resolve(result);
                }
            })
        })
    }

    function saveTask(User){
       return new Promise((resolve,reject)=>{
           let i=User.myTask.findIndex((e)=>e.Task===req.body.task)
           User.myTask[i].progress=req.body.progress;
           User.save().then((result)=>{
               resolve(result)
           }).catch((err)=>{
               reject(err);
           })
       })
    }
    function Update(){
        let User=UpdateAssignedBy();
        User.then((result)=>{
            user.find({"myTask.Task":req.body.task}).then((result)=>{
                 if(result){ 
                 result.forEach(e=>list.push(saveTask(e)))
                 Promise.all(list).then((result)=>{
                     res.send(result)
                 }).catch((err)=>{
                     res.send(err);
                 })
                }
            })
        })
    }
    Update();
})


router.put('/updateDate',(req,res)=>{
    var list=[];
    function UpdateDateAssignedBy(){
        return new Promise((resolve,reject)=>{
            user.findOne({"assignedTask.Task":req.body.task}).then((result)=>{
                if(result!=null)
                {
                let i=result.assignedTask.findIndex((e)=>e.Task===req.body.task)
                result.assignedTask[i].startDate=req.body.startDate;
                result.assignedTask[i].endDate=req.body.endDate;
                result.save().then((r)=>{
                    console.log(r);
                    resolve(r);
                }).catch((err)=>{
                    reject(err);
                })
                }
                else{
                    resolve(result);
                }
            })
        })
    }

    function saveDate(User){
       return new Promise((resolve,reject)=>{
           let i=User.myTask.findIndex((e)=>e.Task===req.body.task)
           User.myTask[i].startDate=req.body.startDate;
           User.myTask[i].endDate=req.body.endDate;
           User.save().then((result)=>{
               resolve(result)
           }).catch((err)=>{
               reject(err);
           })
       })
    }
    function UpdateDate(){
        let User=UpdateDateAssignedBy();
        User.then((result)=>{
            user.find({"myTask.Task":req.body.task}).then((result)=>{
                 if(result){ 
                 result.forEach(e=>list.push(saveDate(e)))
                 Promise.all(list).then((result)=>{
                     res.send(result)
                 }).catch((err)=>{
                     res.send(err);
                 })
                }
            })
        })
    }
    UpdateDate();
})

router.put('/deleteTask',(req,res)=>{
    var list=[]
    var deleteuser=[]
    user.find({"myTask.Task":req.body.task}).then((result)=>{
        result.forEach(u=>list.push(deleteUser(u)))
 })
 Promise.all(list).then((rr)=>{
    console.log(rr);
    user.findOne({"assignedTask.Task":req.body.task}).then((r)=>{
        if(r){
           let arr= r.assignedTask.filter(element=>element.Task!==req.body.task)
           r.assignedTask=arr
            r.save().then((resul)=>{
                console.log(resul)
                user.findOne({_id:req.body.id}).then((rrr)=>{
                    res.send(rrr)
                }).catch((err)=>{
                    res.send(err);
                })
            })
        }
        else{
            user.findOne({_id:req.body.id}).then((rrr)=>{
                res.send(rrr)
            }).catch((err)=>{
                res.send(err);
            })
        }
    }).catch((err)=>{
        res.send(err)
    })
}).catch((err)=>{
    res.send(err);
})
    function deleteUser(User){
        return new Promise((resolve,reject)=>{
           let arr= User.myTask.filter(e=>e.Task!==req.body.task)
           User.myTask=arr;
           console.log(req.body.id)
            User.save().then((r)=>{
                console.log(r)
                resolve(r)
            }).catch((err)=>{
                reject(err);
            })
        })
    }
})

router.post('/delegateTask',(req,res)=>{
var list=[];
var updatedUsers=[];

user.findOne({_id:req.body.id}).then((User)=>{
        var assignTask={
            Task:req.body.task,
            progress:0,
            status:"Open",
            assignedTo:req.body.listOfUser[0].username,
            startDate:req.body.startDate,
            endDate:req.body.endDate
        }
        User.assignedTask.push(assignTask);
        User.save().then((response)=>{
            req.body.listOfUser.forEach((u)=>{
                list.push(SearchUser(u));
            })
            Promise.all(list).then((result)=>{
                result.forEach(u=>{
                    updatedUsers.push(UpdateUsers(u,response.username))
                }) 
            })
            Promise.all(updatedUsers).then(()=>{
                
                res.status(200).send(response)
                
          })
        })
        //User.assignedTask.push(assignTask);
      })
      

      function SearchUser(User){
          return new Promise((resolve,reject)=>{
              user.findOne({username:User.username}).then((result)=>{
                  
                  resolve(result);
                 
              }).catch(()=>{
                  reject("error ocuured")
              })
          })
      }
      function UpdateUsers(User,assigne){
        
          return new Promise((resolve,reject)=>{
              
            var t={
                Task:req.body.task,
                assignedTo:User.username,
                assignedBy:assigne,
                status:"Open",
                progress:0
            }
            User.myTask.push(t);
                
                User.save().then((result)=>{
                    console.log(result);
                  resolve(result) 
            })
        })
      }
})

module.exports=router;

/*
  We have result list=[];
  for(i=0;i<result.size;i++)
  {
      let promise=saveTask(result[i]);
      list.push(promise);
  }
*/