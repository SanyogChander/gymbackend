const mongoose=require('mongoose')

var ContactSchema= mongoose.Schema({
  name:{type:String,required:true},
  phone:{type:String,required:true},
  email:{type:String,required:true},
  message:{type:String,required:true},
  createdAt:{type:Date,default:Date.now}
})
var ContactModel=mongoose.model("contacts",ContactSchema,"contacts");

module.exports=ContactModel;
