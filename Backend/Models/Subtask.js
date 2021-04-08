const mongoose=require('mongoose');
var schema=mongoose.Schema({
    Taskid:{type:String,required:true},
    Subtask:{type:String,required:true},
    status:{type:String,},
    progress:{type:Number,default:0},
});
var subtask=mongoose.model('subtask',schema);
module.exports=subtask;