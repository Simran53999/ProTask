const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const validator=require('validator');

var Schema=mongoose.Schema;
var schema=mongoose.Schema({
    Task:{type:String,required:true},
    status:{type:String,},
    assignedTo:{type:String},
    assignedBy:{type:String},
    progress:{type:Number,default:0},
    startDate:{type:Date,default:null},
    endDate:{type:Date,default:null}
});
var task=mongoose.model('task',schema);
module.exports=task;