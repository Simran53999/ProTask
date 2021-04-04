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
var subtaskRoutes = require('./routes/subtask');

//mailer============================
var user=require('./Models/User');
var task=require('./Models/Task');
var subtask = require('./Models/Subtask');
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
app.use('/subtask',subtaskRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/ProTask",{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    app.listen(8000);
    
    //mailer============================
	cron.schedule('0 8 * * *' ,() =>{
		
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
					var tmp1 = new Date(Tasks[i].endDate);
					var tmp2 = new Date();
					console.log(tmp1);
					console.log(tmp2);
					tmp2.setMinutes(tmp2.getMinutes()-tmp2.getTimezoneOffset());
					console.log(tmp2);
					console.log(tmp1.getTime()-tmp2.getTime());
					if(Tasks[i].endDate!=null && (tmp1.getTime()-tmp2.getTime()<=172800000)){
						username_to_email[Tasks[i].assignedTo] += " Task: "+ Tasks[i].Task + "<br/>      End By: " + Tasks[i].endDate.toString().substr(0,10) + '<br/>';
					}
				}
			})
			.then((tmp)=>{
				
				for(var entry in username_to_email){
					console.log(entry);
					console.log(username_to_useremail[entry]);
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