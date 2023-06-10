const mongoose=require('mongoose');

var PlanSchema=mongoose.Schema({
  planname:{type:String,required:true},
  planprice:{type:String,required:true},
  planperiod:{type:Number,required:true},
  plandetails:{type:String},
  createdAt:{type:Date,default:Date.now}
})

var PlanModel =mongoose.model("plans",PlanSchema,"plans")

module.exports=PlanModel;
