const mongoose=require('mongoose')

var UserSchema=mongoose.Schema({
  name:{type:String,default:''},

  email:{type:String,unique:true,default:''},
  password:{type:String,default:''},

  phone:{type:String,required:true},
  address:{type:String,default:''},

  dob:{type:Date},
  gender:{type:String},

  height:{type:Number},
  weight:{type:Number},

  planid:{type:String},
  plandetails:{
    planid:String,
    planname:String,
    planperiod:Number,
    startdate:Date,
    expirydate:Date,
  },
  usertype:Number, 
  createdAt:{type:Date,default:Date.now}
  });
var UserModel=mongoose.model("users",UserSchema,"users");


module.exports=UserModel;

