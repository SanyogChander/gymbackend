const mongoose=require('mongoose')

var CategorySchema= mongoose.Schema({
  categoryname:{type:String,required:true},
  createdAt:{type:Date,default:Date.now}
})
var CategoryModel=mongoose.model("categories",CategorySchema,"categories");

module.exports=CategoryModel;
