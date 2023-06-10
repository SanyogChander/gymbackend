const TransformationModel=require('./transformationmodel')
const fs=require('fs');

function addtransformation(req,res)
{
  // console.log(req.files)
  // throw new Error();


    // console.log(beforepicname);
    // console.log(afterpicname);
    // res.send("1")
  if(req.body.customername)
  {
    if(req.files.before_pic!=null)
    {
      beforepicname=req.files.before_pic[0].filename;
    }
    else
    {
      beforepicname="noimg.jpg"
    }
    if(req.files.after_pic!=null)
    {
      afterpicname=req.files.after_pic[0].filename;
    }
    else
    {
      afterpicname="noimg.jpg"
    }
    var newtransformation=new TransformationModel({
      customername:req.body.customername,
      age:req.body.age,
      beforepicname:beforepicname,
      afterpicname:afterpicname,
      description:req.body.description
    });
    newtransformation.save().then((data)=>
    {
      res.json({
          success:true,
          status:200,
          message:"Added successfully",
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
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Values Required"
    })
  }

}

function showtransformations(req,res)
{
  TransformationModel.find().then((data)=>
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
        message:"Error Occured "+err.toString()
      })
    })
}

function findtransformation(req,res)
{
  if(req.body._id)
  {
    TransformationModel.find({_id:req.body._id}).then((data)=>
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
          message:"Error Occured "+err.toString()
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

function deletetransformation(req,res)
{
  if(req.body._id)
  {
    TransformationModel.findOne({_id:req.body._id}).then((data)=>
    {
      // res.send(data);
      TransformationModel.deleteOne({_id:req.body._id}).then((deletedata)=>
      {
        if(data.beforepicname!="noimg.jpg")
        {
          fs.unlink('../server/publicfolder/fileuploads/'+data.beforepicname,(err)=>
          {
            if(!err)
            {
              // console.log("File Is Deleted");
            }
          })
        }

        if(data.afterepicname!="noimg.jpg")
        {
          fs.unlink('../server/publicfolder/fileuploads/'+data.afterpicname,(err)=>
          {
            if(!err)
            {
              // console.log("File Is Deleted");
            }
          })
        }
          res.json({
            success:true,
            status:200,
            message:"Deleted Succesfully",
            data:deletedata
          })
      }).catch((deleteerr)=>
      {
        res.json({
          success:false,
          status:500,
          message:"Error Occured "+deleteerr.toString()
        })
      })
    }).catch((err)=>
    {
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
      status:300,
      message:"ID is required"
    })
  }
}

function updatetransformation(req,res)
{
  if(req.body._id)
  {
    TransformationModel.findOne({_id:req.body._id}).then((data)=>
    {
      // throw new Error();

      // res.send(data)
      console.log(req.files);
      if(req.files.before_pic!=null)
      {
        // console.log(1);
        if(req.body.b_oldpicname!="noimg.jpg")
          {
            fs.unlink('../server/publicfolder/fileuploads/'+req.body.b_oldpicname,(err)=>
            {
              if(err)
              {
                console.log(err);
              }
              else
              {
                console.log("File Is Deleted 1");
              }
            })
            // console.log(data.beforepicname)
          }
          data.beforepicname=req.files.before_pic[0].filename;
      }
      else
      {
        // console.log(2);
        beforepicname=req.body.b_oldpicname;
      }

      if(req.files.after_pic!=null)
      {
        // console.log(3);
        if(req.body.a_oldpicname!="noimg.jpg")
          {
            fs.unlink('../server/publicfolder/fileuploads/'+req.body.a_oldpicname,(err)=>
            {
              if(err)
              {
                console.log(err);
              }
              else
              {
                console.log("File Is Deleted 2");
              }
            })
            // console.log(data.beforepicname)
          }
          data.afterpicname=req.files.after_pic[0].filename;
      }
      else
      {
        // console.log(4);
        afterpicname=req.body.a_oldpicname;
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
              status:400,
              message:"Error Occured "+saveerr.toString()
            })
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
  else
  {
    res.json({
      success:false,
      status:500,
      message:"ID is Required"
    })
  }
}

module.exports={addtransformation,showtransformations,findtransformation,deletetransformation,updatetransformation}
