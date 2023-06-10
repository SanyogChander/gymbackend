const UserModel=require('../user/usermodel')
const bcrypt=require('bcrypt');
// const saltrounds=bcrypt.genSaltSync(10);
//     var encryptedpassword=bcrypt.hashSync(req.body.password,saltrounds);

function admin()
{
  UserModel.findOne({email:"admin@gmail.com"}).then((data)=>
  {
    if(data==null)
    {
      var adminsignup= new UserModel({name:"Admin",
        phone:"123",
        email:"admin@gmail.com",
        password:bcrypt.hashSync("123",bcrypt.genSaltSync(10)),
        usertype:1
      });
      adminsignup.save().then((data)=>{
        console.log("Admin Created")
      }).catch((error)=>{
        console.log("Error in creating Admin", error)
      });
    }
    else{
      console.log("Admin ALready Exists")
    }
  }).catch((err)=>
  { 

  })


}

module.exports={admin}
