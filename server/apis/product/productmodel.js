const mongoose=require('mongoose')

var ProductSchema=mongoose.Schema({
  catid:{type:String,required:true},
  productname:{type:String,required:true},
  productpicname:{type:String,required:true},
  productprice:{type:Number,required:true},
  productdescription:{type:String,required:true},
  productstock:{type:Number,required:true},
  createdAt:{type:Date,default:Date.now}
})
var ProductModel=mongoose.model("products",ProductSchema,"products")

module.exports=ProductModel;
