var mongoose=require('mongoose');
var express=require('express');
var bodyparser=require('body-parser');
var cors=require('cors');
require('dotenv').config()
//mailer============================
const nodemailer = require('nodemailer');
const cron = require('node-cron');
//mailer============================

var userRoutes=require('./routes/user');
var taskRoutes=require('./routes/task');

//mailer============================
var user=require('./Models/User');
var task=require('./Models/Task');
let transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.MAILER_EMAIL,
		pass: process.env.MAILER_PASSWORD
	},
});
//mailer============================

const app=express();

app.use(cors());

express.Router({ mergeParams: true });
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

mongoose.Promise=global.Promise;

app.use('/user',userRoutes);
app.use('/task',taskRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/ProTask",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(8000);
    
    //mailer============================
	cron.schedule('* 8,16 * * *' ,() =>{
		
		console.log('cron working');
		var username_to_useremail = {};
		var username_to_email = {};
		user
		.find({})
		.then((Users)=>{
			// console.log(Users);
			for(i=0;i<Users.length;i++){
				username_to_useremail[Users[i].username] = Users[i].email;
				username_to_email[Users[i].username] = "";
			}
		})
		.then((tmp)=>{
			task
			.find({})
			.then((Tasks) =>{
				for(i=0;i<Tasks.length;i++){
					if(Tasks[i].endDate!=null){
						username_to_email[Tasks[i].assignedTo] += " Task: "+ Tasks[i].Task + "<br/>      End By: " + Tasks[i].endDate.toString().substr(0,10) + '<br/>';
					}
				}
			})
			.then((tmp)=>{
				
				for(var entry in username_to_email){
					
					if(username_to_email[entry]!==''){
						transport
						.sendMail({
							from: process.env.MAILER_EMAIL,
							to: username_to_useremail[entry],
							subject: 'Assigned Tasks',
							html: username_to_email[entry]
						},
						function(err,info){
							if(err)
								console.log(err);
							else
								console.log(`email sent to ${username_to_useremail[entry]}`);
						}),
						{
							scheduled: true,
							timezone: "Asia/Kolkata"
						}
					}
				}
			})
		})
	});
	//mailer============================
    
    console.log("connected to Database");
}).catch((err)=>{
    console.log(err);
})