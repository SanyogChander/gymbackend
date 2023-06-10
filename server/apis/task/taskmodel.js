const mongoose=require('mongoose')

var TaskSchema=mongoose.Schema({
  planid:{type:String,required:true},
  tasktitle:{type:String,required:true},
  taskdescription:{type:String,default:""},
  attachment:{type:String},
  createdAt:{type:Date,default:Date.now}
})

var TaskModel=mongoose.model("tasks",TaskSchema,"tasks")

module.exports=TaskModel
