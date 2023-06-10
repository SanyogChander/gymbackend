const mongoose=require('mongoose')

var TransformationSchema= mongoose.Schema({
  customername:{type:String,required:true},
  age:{type:Number,required:true},
  beforepicname:{type:String,required:true},
  afterpicname:{type:String,required:true},
  description:{type:String,required:true},
  createdAt:{type:Date,default:Date.now}
})
var TransformationModel=mongoose.model("transformations",TransformationSchema,"transformations");

module.exports=TransformationModel;
