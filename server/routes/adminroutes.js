const express=require('express');
const adminroutes=express.Router();
const CategoryController=require('../apis/category/categorycontroller')
const Contactuscontroller=require('../apis/contactus/contactuscontroller')
const UserController=require('../apis/user/usercontroller')
const ProductController=require('../apis/product/productcontroller')
const OrderController=require('../apis/orders/ordercontroller')
const PlanController=require('../apis/plan/plancontroller')
const TaskController=require('../apis/task/taskcontroller')
const TrainerController=require('../apis/trainer/trainercontroller')
const TransformationController=require('../apis/result_transformation/transformationcontroller')
const BMIController=require('../apis/bmi_calculator/bmicontroller')
const helper=require('../utilities/helpers')

const multer=require('multer')
const DIR='server/publicfolder/fileuploads'
var picname;

var storage=multer.diskStorage({
  destination:(req,file,cb)=>
  {
    cb(null,DIR)
  },
  filename:(req,file,cb)=>
  {
    picname=Date.now()+file.originalname;
    cb(null,picname)
  }
})
let upload=multer({storage:storage});


adminroutes.use(require('../middleware/tokenChecker'))
//User Routes
// adminroutes.post("/addcustomer",UserController.addcustomer);

adminroutes.get("/allcustomers",UserController.showcustomers)

adminroutes.delete("/deletecustomer",UserController.deletecustomer)

// adminroutes.post("/login",UserController.login)

adminroutes.post("/finduser",UserController.finduser)

adminroutes.post("/approveplan",UserController.approveplan)

// Category Routes
adminroutes.post("/addcategory",CategoryController.addcategory)

// adminroutes.get("/showcategories",CategoryController.showcategories)

adminroutes.post("/deletecategory",CategoryController.deletecategory)

adminroutes.post("/updatecategory",CategoryController.updatecategory)


//Product Routes
adminroutes.post("/addproduct",upload.single("product_pic"),ProductController.addproduct)

// adminroutes.post("/showproducts",ProductController.showproducts)

adminroutes.post("/findproduct",ProductController.findproduct)

adminroutes.post("/deleteproduct",ProductController.deleteproduct)

adminroutes.post("/updateproduct",upload.single("product_pic"),ProductController.updateproduct)


//Order Routes
adminroutes.post("/addorder",OrderController.addorder)

adminroutes.post("/showorders",OrderController.showorders)

adminroutes.post("/updatestatus",OrderController.updatestatus)

adminroutes.get("/showapproveorders",OrderController.show_approvedorders)

adminroutes.post("/orderapprove",OrderController.orderapprove)


//Plan Routes
adminroutes.post("/addplan",PlanController.addplan)

// adminroutes.get("/showplans",PlanController.showplans)

adminroutes.post("/findplan",PlanController.findplan)

adminroutes.post("/deleteplan",PlanController.deleteplan)

adminroutes.post("/updateplan",PlanController.updateplan)

//Task Routes
adminroutes.post("/addtask",upload.single('file_attachment'),TaskController.addtask)

// adminroutes.post("/showtasks",TaskController.showtasks)

adminroutes.post("/updatetask",upload.single('new_file'),TaskController.updatetask)

adminroutes.post("/deletetask",TaskController.deletetask)

adminroutes.post("/findtask",TaskController.findtask)

// Trainer Routes
adminroutes.post("/addtrainer",upload.single("trainer_pic"),TrainerController.addtrainer)

// adminroutes.get("/showtrainers",TrainerController.showtrainers)

adminroutes.post("/findtrainer",TrainerController.findtrainer)

adminroutes.post("/deletetrainer",TrainerController.deletetrainer)

adminroutes.post("/updatetrainer",upload.single("new_pic"),TrainerController.updatetrainer)


// Transformation Routes
adminroutes.post("/addtransformation",upload.fields([{name:"before_pic"},{name:"after_pic"}]),TransformationController.addtransformation)

// adminroutes.get("/showtransformations",TransformationController.showtransformations)

adminroutes.post("/findtransformation",TransformationController.findtransformation)

adminroutes.post("/deletetransformation",TransformationController.deletetransformation)

adminroutes.post("/updatetransformation",upload.fields([{name:"before_pic"},{name:"after_pic"}]),TransformationController.updatetransformation)


adminroutes.get("/showcontacts",Contactuscontroller.showcontacts)

//Diet controller
// adminroutes.post("/bmicalculator",BMIController.bmi_calculator)

adminroutes.all('*', (req, res) => {
  res.send({
      success: false,
      status: 404,
      message: "Invalid Address"
  })
})

module.exports=adminroutes
