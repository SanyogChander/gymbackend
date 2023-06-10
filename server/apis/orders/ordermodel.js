const mongoose=require('mongoose');

var OrderSchema= mongoose.Schema({
  autoid:{type:String,required:true,unique:true},
  customerid:{type:String,required:true},
  orderedproducts:{type:Array,required:true},

  total:{type:Number,required:true},
  tax:{type:Number,required:true},
  bill:{type:Number},

  shippingname:{type:String,required:true},
  shippingcontact:{type:String,required:true},
  shippingaddress:{type:String,required:true},

  paymentmode:{type:String,default:"Cash on Delivery"},
  status:{type:Number,default:0},
  createdAt:{type:Date,default:Date.now}
})

var OrderModel=mongoose.model("orders",OrderSchema,"orders")

module.exports=OrderModel;
