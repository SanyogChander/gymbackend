const Contact = require('./contactModel')

function contactus(req,res)
{
  if(req.body.email)
  {
    let newContact = new Contact({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      message:req.body.message
    })
    newContact.save().then((info)=>
    {
      res.json({
        success:true,
        status:200,
        message:"Message Sent",
        data:info
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

function showcontacts(req,res)
{
  Contact.find().then((data)=>
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


module.exports={contactus, showcontacts}
