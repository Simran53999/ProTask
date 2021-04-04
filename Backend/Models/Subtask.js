const mongoose=require('mongoose');
var schema=mongoose.Schema({
    Taskid:{type:String,required:true},
    Subtask:{type:String,required:true},
    status:{type:String,},
    progress:{type:Number,default:0},
    startDate:{type:Date,default:null},
    endDate:{type:Date,default:null},
});
var subtask=mongoose.model('subtask',schema);
module.exports=subtask;