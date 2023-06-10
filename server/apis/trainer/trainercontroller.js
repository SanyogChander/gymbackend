const TrainerModel=require('./trainermodel')
const fs=require('fs');

function addtrainer(req,res)
{
  // console.log(req.file)
  // throw new Error();
  if(!req.file)
  {
    picname="noimg.jpg"
  }
  else
  {
    picname=req.file.filename
  }
  if(req.body.trainername)
  {
    var newtrainer=new TrainerModel({
      trainername:req.body.trainername,
      trainerpicname:picname,
      experience:req.body.experience
    });
    newtrainer.save().then((data)=>
    {
      res.json({
          success:true,
          status:200,
          message:"trainer added successfully",
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

function showtrainers(req,res)
{
  TrainerModel.find().then((data)=>
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

function findtrainer(req,res)
{
  if(req.body._id)
  {
    TrainerModel.find({_id:req.body._id}).then((data)=>
    {
      res.json({
        success:true,
        status:200,
        total:data.length,
        data:data
      });
    }).catch((err)=>
      {
        res.json({
          success:false,
          status:5000,
          message:"Error Occured "+err.toString()
          })
      })
  }
  else
  {
    res.json({
      success:false,
      status:5000,
      message:"Trainer ID required"
      })
  }
}

function deletetrainer(req,res)
{
  if(req.body._id)
  {
    TrainerModel.findOne({_id:req.body._id}).then((data)=>
    {
      // res.send(data);
      TrainerModel.deleteOne({_id:req.body._id}).then((deletedata)=>
      {
        if(data.trainerpicname!="noimg.jpg")
        {
          fs.unlink('../server/publicfolder/fileuploads/'+data.trainerpicname,(err)=>
          {
            if(!err)
            {
              console.log("File Is Deleted");
            }
          })
        }
          res.json({
            success:true,
            status:200,
            message:"Trainer Deleted Succesfully",
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
      status:500,
      message:"Trainer ID is required"
    })
  }
}

function updatetrainer(req,res)
{
  if(req.body._id)
  {
    TrainerModel.findOne({_id:req.body._id}).then((data)=>
    {
      // throw new Error();
      // res.send("yes")
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
            if(err)
            {
              console.log(err);
            }
            else
            {
              console.log("File Is Deleted");
            }
          })

          // console.log(data.trainerpicname)
        }
        data.trainerpicname=req.file.filename;
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
      res.json({
        success:true,
        status:500,
        message:"Error Occured "+err.tostring()
      })
    })
  }
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Trainer ID is Required"
    })
  }
}

module.exports={addtrainer,showtrainers,findtrainer,deletetrainer,updatetrainer}
