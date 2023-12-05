const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const hashPassword = async (ps) => {
  // Generating the Salt
  const secPass = await bcrypt.genSalt(Number(process.env.SALT));
  // Hashing the Password
  return await bcrypt.hash(ps, secPass);
}

const registerController = async (req,res) => {
  const {fullname,email,password} = req.body;
    try {
      let user = await userModel.findOne({ email });
      // If exists the email
      if (user) {
          // Set Conflict Status
          res.status(409).send("User Already Registered !!");
      } else {
          const newPass = await hashPassword(password);

          // Set the Collection Field with Data
          user = new userModel({
              fullname,
              email,
              password: newPass,
          })

          //  Save the Document in the Perticular User Type Collection
          const createUser = await user.save();

          //  Set Created Status
          res.status(201).send(createUser);
      }
    } catch (error) {
        console.log(error);
        res.status(204).send({success:false,message:`Register Controller ${error.message}`})
    }
}
const loginController = async (req,res) => {
    try {
      const user = await userModel.findOne({email:req.body.email})
      if(!user){
          return res.status(200).send({success:false,message:"user not found"})
      }
      const isMatch = await bcrypt.compare(req.body.password,user.password)
      if(!isMatch){
          return res.status(200).send({message:"Invalid email or password",success:false})
      }
      const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"3d"});
      res.status(200).send({message:"Login Success",success:true,user:{id:user._id,name:user.fullname},token})
    } catch (error) {
       console.log(error);
       res.status.send({message:`Error in Login ctrl ${error.message}`})
    }
  }
  const authcontroller = async (req,res)=>{
    try {
      const user = await userModel.findById({ _id: req.body.userId });
      user.password = undefined;
      if (!user) {
        return res.status(201).send({
          message: "user not found",
          success: false,
        });
      } else {
        res.status(200).send({
          success: true,
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "auth error",
        success: false,
        error,
      });
    }
  };
  const getAllUsersController = async (req,res) => {
    try {
        const users = await userModel.find({})
        res.status(200).send({
            success:true,
            message:'users data',
            data:users,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error while fetching users",
            error
        })
    }
}
   module.exports={loginController,registerController,authcontroller,getAllUsersController}