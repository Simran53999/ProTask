var express=require('express');
var router=express.Router({ mergeParams: true });
var validator = require("email-validator");
const nodemailer = require('nodemailer');
var crypto = require('crypto');
var task=require('../Models/Task');
var user=require('../Models/User');
var token = require('../Models/Token');

router.post('/signup',(req,res)=>{
  
  if(validator.validate(req.body.email)){
    user
    .findOne({username:req.body.username})
    .then((result)=>{
      if(result){
        res.status(409).send({error: "User already Exists"});
      }
      else{
        user
        .findOne({email:req.body.email})
        .then((response)=>{
          if(response){
            res.status(409).send({error: "User already Exists"});
          }
          else{
            // var Token = new token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            // Token.save()
            //   .then((result2)=>{
            //     var transporter = nodemailer.createTransport({ 
            //       service: 'gmail', 
            //       auth: {
            //           user: process.env.MAILER_EMAIL,
            //           pass: process.env.MAILER_PASSWORD
            //         },
            //     });
            //     var mailOptions = { 
            //       from: 'scheduletest9@gmail.com', 
            //       to: req.body.email, 
            //       subject: 'Account Verification Link', text: 'Hello '+ req.body.username +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + req.body.email + '\/' + result2.token + '\n\nThank You!\n' 
            //     };
            //     transporter
            //     .sendMail(mailOptions, function (err,info) {
            //       if (err) { 
            //         return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
            //       }
            //       else{
            //         return res.status(200).send('A verification email has been sent to ' + req.body.email + '. If you did not receive a verification email click on resend.');
            //       }
            //     });
            //   })
            //   .catch((err)=>{
            //     res.status(500).send({error:'Token issue'});
            //   });
            
            var User = new user({
              email:req.body.email,
              password:req.body.password,
              username:req.body.username,
              isVerified:false,
            });
            
            User.save()
            .then((result)=>{
              var d = new Date();
              d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
              console.log(d);
              var Token = new token({ _userId: User._id, token: crypto.randomBytes(16).toString('hex'), expireAt: d });
              console.log(Token);
              Token.save()
              .then((result2)=>{
                var transporter = nodemailer.createTransport({ 
                  service: 'gmail', 
                  auth: {
                      user: process.env.MAILER_EMAIL,
                      pass: process.env.MAILER_PASSWORD
                    },
                });
                console.log(req.headers.host);
                var mailOptions = { 
                  from: {name:'ProTask Verifier', address:'scheduletest9@gmail.com'}, 
                  to: req.body.email, 
                  subject: 'Account Verification Link', text: 'Hello '+ req.body.username +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user' + '\/confirmation\/' + req.body.email + '\/' + result2.token + '\n\nThank You!\n' 
                };
                transporter
                .sendMail(mailOptions, function (err,info) {
                  if (err) { 
                    return res.status(500).send({error:'Server Error. Please click on resend.'});
                  }
                  else{
                    return res.status(200).send({error:`A verification email has been sent to ${req.body.email}`});
                  }
                });
              })
              .catch((err)=>{
                console.log(err);
                res.status(500).send({error:'Server Error. Please Try Again'});
              });
            })
            .catch((err)=>{
              res.status(500).send({error:'Server Error. Please Try Again'});
            });
            
            
            // User.save()
            // .then((result)=>{
            //     console.log("User Created");
            //     console.log(result);
            //     res.status(201).send(result);
            // })
            // .catch((err)=>{
            //     res.status(500).send(err)
            // });
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
    console.log(req.body);
    user
    .findByCredentials(req.body.email,req.body.password)
    .then((result)=>{
      if(result.isVerified===false){
        res.status(401).send({error: "Email not verified", status: 401});
      }
      else{
        res.status(201).send(result);
      }
    })
    .catch((err)=>{
      res.status(409).send({error: "Could not find user", status: 409});
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

router.get('/confirmation/:email/:token',(req,res)=>{
  console.log('req reached');
    token.findOne({ token: req.params.token }, function (err, token) {
        // token is not found into database i.e. token may have expired 
        if (!token){
            return res.status(400).send('Your verification link may have expired. Please click on resend for verify your Email.');
        }
        // if token is found then check valid user 
        else{
            user.findOne({ _id: token._userId, email: req.params.email }, function (err, user) {
                // not valid user
                if (!user){
                    return res.status(401).send('We were unable to find a user with these credentials. Please SignUp through the ProTask portal.');
                } 
                // user is already verified
                else if (user.isVerified){
                    return res.status(200).send('User has already been verified. Please Login through the ProTask portal.');
                }
                // verify user
                else{
                    // change isVerified to true
                    user.isVerified = true;
                    user.save().then((result)=>{
                        // error occur
                        if(err){
                            return res.status(500).send(`${err.message}`);
                        }
                        // account successfully verified
                        else{
                          return res.status(200).send('Your account has been successfully verified.');
                        }
                    });
                }
            });
        }
        
    });
})

router.post('/resend', (req,res)=>{
  user
  .findOne({ email: req.body.email })
  .then((user)=>{
    // user is not found into database
    if (!user){
      return res.status(400).send({error:'Unable to find a user with the given credentials.'});
    }
    // user has been already verified
    else if (user.isVerified){
      return res.status(200).send({error:'This account has been already verified. Please log in.'});
    } 
    // send verification link
    else{
        // generate token and save
      var d = new Date();
      d.setMinutes(d.getMinutes()-d.getTimezoneOffset());
      var Token = new token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex'), expireAt: d });
        console.log(Token);
        Token.save()
        .then((result)=>{
          var transporter = nodemailer.createTransport({ 
            service: 'gmail', 
            auth: {
                user: process.env.MAILER_EMAIL,
                pass: process.env.MAILER_PASSWORD
              },
          });
          console.log(req.headers.host);
          var mailOptions = { 
            from: {name:'ProTask Verifier', address:process.env.MAILER_EMAIL}, 
            to: user.email, 
            subject: 'Account Verification Link', text: 'Hello '+ user.username +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/user' + '\/confirmation\/' + user.email + '\/' + result.token + '\n\nThank You!\n' 
          };
          transporter
          .sendMail(mailOptions, function (err,info) {
            if (err) { 
              return res.status(500).send({error:'Server Error. Please click on resend.'});
            }
            else{
              return res.status(200).send({error:`A verification email has been sent to ${user.email}`});
            }
          });
        })
        .catch((err)=>{
          console.log(err);
          res.status(500).send({error:'Server Error. Please Try Again'});
        });
      }
  });
})

module.exports=router;
