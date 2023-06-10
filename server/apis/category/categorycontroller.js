const CategoryModel=require('./categorymodel')

function addcategory(req,res)
{
  // console.log(req.file)
  // throw new Error();

  if(req.body.categoryname)
  {
    var newcategory=new CategoryModel({categoryname:req.body.categoryname});
    newcategory.save().then((data)=>
    {
      res.json({
          success:true,
          status:200,
          message:"Category added successfully",
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
      message:"Category Name is Required"
    })
  }

}

function showcategories(req,res)
{
  CategoryModel.find().then((data)=>
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

function deletecategory(req,res)
{
  if(req.body._id)
  {
    CategoryModel.findOne({_id:req.body._id}).then((data)=>
    {
      // res.send(data);
      CategoryModel.deleteOne({_id:req.body._id}).then((deletedata)=>
      {

          res.json({
            success:true,
            status:200,
            message:"Category Deleted Succesfully",
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
      message:"Category ID is required"
    })
  }
}

function updatecategory(req,res)
{
  if(req.body._id)
  {
    CategoryModel.findOne({_id:req.body._id}).then((data)=>
    {
      // throw new Error();
      // res.send("yes")
      // res.send(data)

      if(req.body.categoryname)
      {
        data.categoryname=req.body.categoryname;
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
      message:"Category ID is Required"
    })
  }
}

module.exports={addcategory,showcategories,deletecategory,updatecategory}
