const express=require('express');
const customerroutes=express.Router()
const UserController=require('../apis/user/usercontroller')
const CategoryController=require('../apis/category/categorycontroller')
const OrderController=require('../apis/orders/ordercontroller')
const TaskController=require('../apis/task/taskcontroller')
const BMIController=require('../apis/bmi_calculator/bmicontroller')
const PlanController=require('../apis/plan/plancontroller')
const ProductController=require('../apis/product/productcontroller')
const TrainerController=require('../apis/trainer/trainercontroller')
const TransformationController=require('../apis/result_transformation/transformationcontroller')
const ContactusController=require('../apis/contactus/contactuscontroller')


customerroutes.post("/addcustomer",UserController.addcustomer)

customerroutes.post("/login",UserController.login)

customerroutes.get("/showcategories",CategoryController.showcategories)

customerroutes.post("/showproducts",ProductController.showproducts)

customerroutes.post("/findproduct",ProductController.findproduct)

customerroutes.get("/showplans",PlanController.showplans)

customerroutes.get("/showtrainers",TrainerController.showtrainers)

customerroutes.get("/showtransformations",TransformationController.showtransformations)

customerroutes.post("/contactus",ContactusController.contactus)

customerroutes.post("/bmicalculator",BMIController.bmi_calculator)




customerroutes.use(require('../middleware/tokenChecker'))



customerroutes.post("/finduser",UserController.finduser)

customerroutes.put("/updatecustomer",UserController.updatecustomer)

customerroutes.post("/changepassword",UserController.changepassword)

customerroutes.post("/addorder",OrderController.addorder)

customerroutes.post("/showorders",OrderController.showorders)

customerroutes.post("/fetchorderdetail",OrderController.fetchorderdetail)

customerroutes.post("/showtasks",TaskController.showtasks)

customerroutes.post("/applyplan",UserController.applyplan)

module.exports=customerroutes
