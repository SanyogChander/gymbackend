const ProductModel=require('./productmodel')
const fs=require('fs')
function addproduct(req,res)
{
  if(!req.file)
  {
    picname="noimg.jpg"
  }
  else
  {
    picname=req.file.filename
  }
  var newproduct=new ProductModel({
    catid:req.body.catid,
    productname:req.body.productname,
    productpicname:picname,
    productprice:req.body.productprice,
    productdescription:req.body.productdescription,
    productstock:req.body.productstock
  })

  newproduct.save().then((data)=>
  {
    res.json({
        success:true,
        status:200,
        message:"Product added successfully",
        data:data
      })
  }).catch((err)=>
    {
      res.json({
        success:false,
        status:500,
        message:"Error Occured "+err.toString()
      })
    })
}

function showproducts(req,res)
{
  if(req.body.catid)
  {
    ProductModel.find({catid:req.body.catid}).then((data)=>
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
          message:"Error Occured "+err.tostring()
        })
      })
  }
  else
  {
    res.json({
      success:false,
      status:300,
      message:"Category ID is Required"
    })
  }

}

function findproduct(req,res)
{
  if(req.body._id)
  {
    ProductModel.find({_id:req.body._id}).then((data)=>
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
          message:"Error Occured "+err.tostring()
        })
      })
  }
  else
  {
    res.json({
      success:false,
      status:300,
      message:"ID is Required"
    })
  }

}

function deleteproduct(req,res)
{
  if(req.body._id)
  {
    ProductModel.findOne({_id:req.body._id}).then((data)=>
    {
      if(data!=null)
      {
        // res.send(data);
        ProductModel.deleteOne({_id:req.body._id}).then((deletedata)=>
        {
          // console.log(data);
          if(data.productpicname!="noimg.jpg")
          {
            fs.unlink('../server/publicfolder/fileuploads/'+data.productpicname,(fileerr)=>
            {
              if(fileerr)
              {
                console.log(fileerr);
              }
              else
              {
                console.log("File Is Deleted")
              }
            })
          }
          // console.log("third");
            res.json({
              success:true,
              status:200,
              message:"Product Deleted Succesfully",
              data:deletedata
            })
          }).catch((deleteerr)=>
          {
            // console.log("Second Error");
            res.json({
              success:false,
              status:400,
              message:"Error Occured "+deleteerr.toString()
            })
          })
      }
      else
      {
        res.json({
          success:false,
          status:300,
          message:"No Product Found"
        })
      }

    }).catch((err)=>
    {
      // console.log("First Error");
      res.json({
        success:false,
        status:500,
        message:"Error Occured "+err.toString()
      })
    })
  }
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Product ID is Required"
    })
  }

}

function updateproduct(req,res)
{
  if(req.body._id)
  {
    ProductModel.findOne({_id:req.body._id}).then((data)=>
    {
      // res.send(data)
      if(!req.file)
      {
        picname=req.body.oldpicname;
      }
      else
      {
        if(req.body.oldpicname!="noimg.jpg")
        {
          fs.unlink('../server/publicfolder/fileuploads/'+req.body.oldpicname,(err)=>
          {
            if(!err)
            {
              console.log("File Is Deleted");
            }
          })


        }
        data.productpicname=req.file.filename;
      }
      for(var field in req.body)
      {
        if(req.body[field])
        {
          data[field]=req.body[field]
        }
      }

      data.save().then((saveddata)=>
        {
          res.json({
            success:true,
            status:200,
            message:"Updated Successfully",
            data:saveddata
          })
        }).catch((saveerr)=>
          {
            res.json({
              success:false,
              status:500,
              message:"Error Occured "+saveerr.toString()
            })
          })
    }).catch((err)=>
      {
        // throw new Error();
        // res.send("yes")
        res.json({
          success:true,
          status:500,
          message:"Error Occured "+err.toString()
        })
      })
  }
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Product ID required"
    })
  }

}
module.exports={addproduct,showproducts,findproduct,deleteproduct,updateproduct}
