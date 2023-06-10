const OrderModel=require('./ordermodel')
const ProductModel=require('../product/productmodel')
let autogenid;
function addorder(req,res)
{
  OrderModel.find().then((data)=>
  {
    // console.log("1");
    autogenid=data.length+1;
    var neworder=new OrderModel({
        autoid:autogenid,
        customerid:req.body.customerid,
        orderedproducts:req.body.orderedproducts,

        total:req.body.total,
        tax:req.body.tax,
        bill:req.body.bill,

        shippingname:req.body.shippingname,
        shippingcontact:req.body.shippingcontact,
        shippingaddress:req.body.shippingaddress
        })
    neworder.save().then((saveddata)=>
        {
          var updateresp;
          var productlist=req.body.orderedproducts;
          for(var x=0;x<productlist.length;x++)
          {
            ProductModel.updateOne({_id:productlist[x].productid},{$inc:{
              productstock:-productlist[x].qty}}).then(updateresp=true);
          }
          if(updateresp==true)
              {
                res.json({
                  success:true,
                  status:200,
                  message:"Order Placed",
                  data:saveddata
                  })
              }
              else
              {
                res.json({
                  success:false,
                  status:500,
                  message:updateerr.toString()
                })
              }

        }).catch((saveerr)=>
          {
            res.json({
              success:false,
              status:500,
              message:saveerr.toString()
            })

          })
  }).catch((err)=>
    {
      res.json({
        success:false,
        status:500,
        message:err.toString()
      })

    })
}

function showorders(req,res)
{
  if(req.body.customerid)
  {
    OrderModel.find({customerid:req.body.customerid}).sort({createdAt:-1}).then((data)=>
    {
      res.json({
        success:true,
        status:200,
        total:data.length,
        data:data
      })
    }).catch((err)=>
      {
        res.json({
          success:false,
          status:500,
          message:err.toString()
        })
      })
  }
  else
  {
    OrderModel.find().sort({createdAt:-1}).then((data)=>
    {
      res.json({
        success:true,
        status:200,
        total:data.length,
        data:data
      })
      }).catch((err)=>
      {
        res.json({
          success:false,
          status:500,
          message:err.toString()
        })
      })
  }

}

function fetchorderdetail(req,res)
{
  if(req.body.autoid)
  {
    OrderModel.find({autoid:req.body.autoid}).then((data)=>
    {
      res.json({
        success:true,
        status:200,
        total:data.length,
        data:data
      })
    }).catch((err)=>
      {
        res.json({
          success:false,
          status:400,
          message:err.toString()
        })
      })
  }
  else
  {
    res.json({
      success:false,
      status:500,
      message:"ID required"
    })
  }

}

function updatestatus(req,res)
{
  OrderModel.findOne({_id:req.body._id}).then((data)=>
  {
        if(data!=null)
        {
          data.status=req.body.newstatus;
          data.save().then((saveddata)=>
          {
            res.json({
                success:true,
                status:200,
                message:"Order Status Updated Succesfully",
                data:saveddata
              })
            }).catch((saveerr)=>
            {
              res.json({
                success:false,
                status:400,
                message:"Error Occured "+saveerr.toString()
              })
            })
        }
        else
        {
          res.json({
            success:false,
            status:300,
            message:"No Order Found"
          })
        }
  }).catch((err)=>
      {
        res.json({
          success:false,
          status:500,
          message:err.toString()
        })
      })
}

function show_approvedorders(req,res)
{
    OrderModel.find({status:{$gt:0}}).sort({createdAt:-1}).then((data)=>
    {
      res.json({
        success:true,
        status:200,
        total:data.length,
        data:data
      })
    }).catch((err)=>
      {
        res.json({
          success:false,
          status:500,
          message:err.toString()
        })
      })

}

function orderapprove(req,res)
{
  OrderModel.findOne({_id:req.body._id}).then((data)=>
  {
        if(data!=null)
        {
          // console.log("1");
          if(req.body.approve=="true")
          {
            // console.log("1");
            data.status=1;
            data.save().then((saveddata)=>
            {
              res.json({
                  success:true,
                  status:200,
                  message:"Order Confirmed",
                  data:saveddata
                })
              }).catch((saveerr)=>
              {
                res.json({
                  success:false,
                  status:400,
                  message:"Error Occured "+saveerr.toString()
                })
              })
          }
          else if(req.body.approve=="false")
          {
            var updateresp;
            var productlist=data.orderedproducts;
            // console.log(productlist);
            for(var x=0;x<productlist.length;x++)
            {
              ProductModel.updateOne({_id:productlist[x].productid},{$inc:{productstock:productlist[x].qty}}).then(updateresp=true);
            }
            if(updateresp==true)
            {
              data.status=-1;
              data.save().then((saveddata)=>
              {
                res.json({
                    success:true,
                    status:200,
                    message:"Order Declined",
                    data:saveddata
                  })
                }).catch((saveerr)=>
                {
                  res.json({
                    success:false,
                    status:400,
                    message:"Error Occured "+saveerr.toString()
                  })
                })
            }
            else
            {
              res.json({
                success:false,
                status:400,
                message:"Error Occured in Updating Quantity"
              })
            }
          }
        }
        else
        {
          res.json({
            success:false,
            status:300,
            message:"No Order Found"
          })
        }
  }).catch((err)=>
      {
        res.json({
          success:false,
          status:500,
          message:"Error Occured "+err.toString()
        })
      })
}

module.exports={addorder,showorders,fetchorderdetail,show_approvedorders,orderapprove,updatestatus}
