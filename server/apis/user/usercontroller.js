const UserModel=require('./usermodel')
const PlanModel=require('../plan/planmodel')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
const helper=require('../../utilities/helpers')

function addcustomer(req,res)
{
  // console.log(req.body.name);
  if(req.body.password!=undefined)
  {
    const saltrounds=bcrypt.genSaltSync(10);
    var encryptedpassword=bcrypt.hashSync(req.body.password,saltrounds);

    var newsignup=new UserModel({
      name:req.body.name,
      email:req.body.email,
      password:encryptedpassword,
      phone:req.body.phone,
      address:req.body.address,
      dob:req.body.dob,
      gender:req.body.gender,
      height:req.body.height,
      weight:req.body.weight,
      usertype:2
    });

    newsignup.save().then((data)=>
    {
      res.json({
        success:true,
        status:200,
        message:"Customer added Successfully",
        data:data
      })
    }).catch((err)=>
    {
      if(err.code==11000)
        {
          res.json({
          success:false,
          status:400,
          message:"Username Already Exists "+err.toString(),
          })
        }
        else
        {
          res.json({
            success:false,
            status:500,
            message:"Error Occured "+err.toString()
            })
        }
    })
  }
  else
  {
    res.json({
      success:false,
      status:300,
      message:"Values Required"
    })
  }

}

function showcustomers(req,res)
{
  UserModel.find().sort({createdAt:-1}).then((data)=>
  {
    var tokendata={total:data.length};
    let token=jwt.sign(tokendata,helper.SECRET);
    res.json({
      success:true,
      status:200,
      token:token,
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

function deletecustomer(req,res)
{
  UserModel.deleteOne({_id:req.body._id}).then((data)=>
  {
    if(data.deletedCount==1)
    {
      res.json({
      success:false,
      status:200,
      message:"Customer Deleted Successfully",
      data:data
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

function updatecustomer(req,res)
{
  UserModel.findOne({'_id':req.body._id}).then((data)=>
  {
      for(var field in req.body)
      {
        if(req.body[field] && field!="password")
        {
          data[field]=req.body[field]
        }
      }
      data.save().then((response)=>
      {
        res.json({
          success:true,
          status:200,
          message:"Updated Successfully"
        })

      }).catch((save_err)=>
      {
        res.json({
            success:false,
            status:5000,
            message:"Error Occured "+save_err.toString()
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

function login(req,res)
{
  if(req.body.email)
  {
    if(req.body.password)
    {
      UserModel.findOne({email:req.body.email}).then((data)=>
      {
        if(data==null)
        {
          res.json({
            success:false,
            status:200,
            message:"No Customer found",
            })
        }
        else
        {
          if(bcrypt.compareSync(req.body.password,data.password))
          {
            var user = {
              name: data.name, email: data.email, usertype: data.usertype, _id: data._id
            }
            let token=jwt.sign(user,helper.SECRET)
            res.json({
              success:true,
              status:200,
              token:token,
              message:"Login Successful",
              data:data
            })
          }
          else
          {
            res.json({
              success:false,
              status:200,
              message:"Login Unsuccessful"
              })
          }
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
    else
    {
      res.json({
        success:false,
        status:500,
        message:"Password field cannot be empty"
      })
    }
  }
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Email field cannot be empty"
    })
  }

}

function approveplan(req,res)
{
  if(req.body.planid && req.body.customerid)
  {
    PlanModel.findOne({_id:req.body.planid}).then((plandata)=>
    {
      if(plandata)
      {
        UserModel.findOne({_id:req.body.customerid}).then((customerdata)=>
          {
            customerdata.plandetails.planid=plandata._id;
            customerdata.plandetails.planname=plandata.planname;
            customerdata.plandetails.planperiod=plandata.planperiod;
            customerdata.plandetails.startdate=Date.now();
            var date=new Date()
            date.setDate(date.getDate()+plandata.planperiod)
            customerdata.plandetails.expirydate=date;
            customerdata.save().then((saveddata)=>
              {
                res.json({
                  success:true,
                  status:200,
                  message:"Plan Approved Successfully",
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
        }).catch((customererr)=>
          {
            res.json({
              success:false,
              status:500,
              message:"Error Occured "+customererr.toString()
              })
        })
      }
      else
      {
        res.json({
          success:false,
          status:500,
          message:"Plan ID required"
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
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Plan ID and Customer ID Required"
      })
  }

}

function applyplan(req,res)
{
  PlanModel.findOne({_id:req.body.planid}).then((plandata)=>
  {
    if(plandata.length!=0)
    {
      UserModel.findOne({_id:req.body.customerid}).then((customerdata)=>
        {
          // if(!customerdata.planid)
          // {
            customerdata.planid=plandata._id;
            customerdata.save().then((saveddata)=>
              {
                res.json({
                  success:true,
                  status:200,
                  message:plandata.planname+" Plan Applied Successfully",
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
          // }
          // else
          // {
          //   res.json({
          //     success:false,
          //     status:200,
          //     message:"You have already applied for a plan."
          //     })
          // }

      }).catch((customererr)=>
        {
          res.json({
            success:false,
            status:500,
            message:"Error Occured "+customererr.toString()
            })
      })
    }
    else
    {
      res.json({
        success:false,
        status:500,
        message:"Plan Not Found"
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

function finduser(req,res)
{
  if(req.body._id)
  {
    UserModel.find({_id:req.body._id}).then((data)=>
    {
      if(data==null)
      {
        res.json({
          success:true,
          status:200,
          message:"No Customer Found"
          });
      }
      else
      {
        res.json({
        success:true,
        status:200,
        total:data.length,
        data:data
        });
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
  else
  {
    res.json({
      success:false,
      status:5000,
      message:"ID required"
    })
  }
}

function changepassword(req,res)
{
  if(req.body.customerid)
  {
    UserModel.findOne({_id:req.body.customerid}).then((data)=>
    {
      if(data!=null)
      {
        // console.log(data[0].password);
        if(bcrypt.compareSync(req.body.curr_pass,data.password))
        {
          const saltrounds=bcrypt.genSaltSync(10);;
          let encryptedpassword=bcrypt.hashSync(req.body.new_pass,saltrounds);
          data.password=encryptedpassword;
          data.save().then((response)=>
          {
            res.json({
              success:true,
              status:200,
              data:response,
              message:"Password Changed Succesfully"
            })

          }).catch((save_err)=>
          {
            res.json({
                success:false,
                status:500,
                message:"Error Occured "+save_err.toString()
              })
          })
        }
        else
        {
          res.json({
            success:false,
            status:200,
            message:"Wrong Current Password"
            })
        }
      }
      else
      {
        res.json({
          success:false,
          status:200,
          message:"No Customer Found"
          });
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
  else
  {
    res.json({
      success:false,
      status:500,
      message:"Values Required"
    })
  }
}

module.exports= {
  addcustomer,
  showcustomers,
  deletecustomer,
  updatecustomer,
  login,
  approveplan,
  applyplan,
  finduser,
  changepassword
}

