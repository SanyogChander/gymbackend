const express=require('express');
const mongoose=require('./connection')
const cors=require('cors')

const admincontroller=require('./apis/admin/admincontroller')
const adminroutes=require('./routes/adminroutes')
const customerroutes=require('./routes/customerroutes');

const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(express.static(__dirname+"/publicfolder/fileuploads/"))
const port=3000;

admincontroller.admin()
app.use("/admin",adminroutes);
app.use("/customer",customerroutes);

app.get("/",(req,res)=>
{
  res.send("Welcome to Gym Server")
})
app.listen(port,(err)=>
{
  if(err)
  {
    console.log(err+"Server is not created");
  }
  else
  {
    console.log("Server is Running");

  }
})

