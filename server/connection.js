const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1/gymproject',(err)=>
{
  if(err)
  {
    console.log(err+"Error in Connecting with databse");
  }
  else
  {
    console.log("Connection With Database")
  }
})

module.exports=mongoose;
