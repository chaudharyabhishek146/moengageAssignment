const jwt =require("jsonwebtoken");
const User = require('../models/User');

const auth =async(req,res,next)=>{
    try{
        const authHeader =req.header("Authorization");
        if(!authHeader || !authHeader.startsWith("Bearer")){
            return res.status(401).json({message:"Authenticaton Required"})
        }
        console.log("auth header:",authHeader);

        const token =authHeader.replace("Bearer ","");
        console.log("token:",token)
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        console.log("deoced",decoded);
        const user = await User.findById(decoded.userID);
        console.log("user",user);
        if(!user){
            return res.status(401).json({message:"Authentication Failed"})
        }

        req.user=user;
        req.token =token;
        next();
    }catch(err){
        res.status(401).json({message:"Authentication Failed"});
    }
}

module.exports=auth;