const TaskModel=require('./taskmodel')
const fs=require('fs')

function addtask(req,res)
{
  if(req.body)
  {
    if(!req.file)
    {
      picname="noimg.jpg";
    }
    else
    {
      picname=req.file.filename
    }

    var newtask=new TaskModel({
      planid:req.body.planid,
      tasktitle:req.body.tasktitle,
      taskdescription:req.body.taskdescription,
      attachment:picname
    })
    newtask.save().then((data)=>
    {
      res.json({
        success:true,
        status:200,
        message:"Task Added Successfully",
        data:data
        });

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

function showtasks(req,res)
{
  if(req.body.planid)
  {
    TaskModel.find({planid:req.body.planid}).sort({createdAt:-1}).then((data)=>
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
    TaskModel.find().then((data)=>
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

}

function findtask(req,res)
{
  if(req.body._id)
  {
    TaskModel.find({_id:req.body._id}).then((data)=>
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
      message:"Task ID required"
      })
  }
}

function updatetask(req,res)
{
  if(req.body._id)
  {
    TaskModel.findOne({_id:req.body._id}).then((data)=>
    {
      // res.send(data)
      if(!req.file)
      {
        picname=req.body.oldfilename;
        // console.log("1");
      }
      else
      {
        // console.log("2");
        if(req.body.oldfilename!="noimg.jpg")
        {
          fs.unlink('../server/publicfolder/fileuploads/'+req.body.oldfilename,(err)=>
          {
            if(!err)
            {
              console.log("File Is Deleted");
            }
          })
        }
        data.attachment=req.file.filename;
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
          message:"Error Occured "+err.tostring()
        })
      })
  }
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Task ID is required"
    })
  }


}

function deletetask(req,res)
{
  if(req.body._id)
  {
    TaskModel.findOne({_id:req.body._id}).then((data)=>
    {
        // res.send(data);
        TaskModel.deleteOne({_id:req.body._id}).then((deletedata)=>
        {
          if(data.attachment!="noimg.jpg")
            {
              fs.unlink('../server/publicfolder/fileuploads/'+data.attachment,(err)=>
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
              message:"Task Deleted Succesfully",
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
      message:"Task ID is required"
    })
  }

}
module.exports ={addtask,showtasks,findtask,updatetask,deletetask}
