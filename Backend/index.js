var mongoose=require('mongoose');
var express=require('express');
var bodyparser=require('body-parser');
var cors=require('cors');

var userRoutes=require('./routes/user');
var taskRoutes=require('./routes/task');

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
    console.log("connected to Database");
}).catch((err)=>{
    console.log(err);
})