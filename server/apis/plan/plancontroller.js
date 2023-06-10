const PlanModel=require('./planmodel')

function addplan(req,res)
{console.log(req.body);
  if(req.body.planname)
  {

    var newplan=new PlanModel({
      planname:req.body.planname,
      planprice:req.body.planprice,
      planperiod:req.body.planperiod,
      plandetails:req.body.plandetails
    });
    newplan.save().then((data)=>
    {
      res.json({
          success:true,
          status:200,
          message:"Plan added successfully",
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

function showplans(req,res)
{
  PlanModel.find().then((data)=>
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

function findplan(req,res)
{
  PlanModel.find({_id:req.body._id}).then((data)=>
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

function deleteplan(req,res)
{
  PlanModel.findOne({_id:req.body._id}).then((data)=>
    {
      if(data!=null)
      {
        // res.send(data);
      PlanModel.deleteOne({_id:req.body._id}).then((deletedata)=>
      {
        res.json({
          success:true,
          status:200,
          message:"Plan Deleted Succesfully",
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
      }
      else
      {
        res.json({
          success:false,
          status:300,
          message:"No Plan Found"
        })
      }

    }).catch((err)=>
    {
      res.json({
        success:true,
        status:500,
        message:"Error Occured "+err.toString()
      })
    })
}

function updateplan(req,res)
{
  PlanModel.findOne({_id:req.body._id}).then((data)=>
  {
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

module.exports={addplan,showplans,findplan,deleteplan,updateplan}
