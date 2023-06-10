const mongoose=require('mongoose')

var TrainerSchema= mongoose.Schema({
  trainername:{type:String,required:true},
  trainerpicname:{type:String,required:true},
  experience:{type:Number,required:true},
  createdAt:{type:Date,default:Date.now}
})
var TrainerModel=mongoose.model("trainers",TrainerSchema,"trainers");

module.exports=TrainerModel;
