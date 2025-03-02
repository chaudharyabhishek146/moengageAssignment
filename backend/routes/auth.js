const express = require("express")
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const auth = require("../middleware/auth");

const router =express.Router()

router.post("/register",async(req,res)=>{
    try{
        const {name , email, password} = req.body
        const existingUser = await User.findOne({email});

        if(existingUser){
            return    res.status(400).json({message:"User Already Exists with this email"})
        }
        const user = new User({name , email, password});
        await user.save();

        const token = jwt.sign({userID:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"});

        res.status(201).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        })
    }catch(err){
        console.log("Registration error :",err);
        res.status(500).json({message:"Server Error"})
    }

})

router.post("/login",async(req,res)=>{
    try{
        const{email,password}=req.body
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Credential"});
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid Credential"});
        }

        const token =jwt.sign({userID:user._id} , process.env.JWT_SECRET,{expiresIn:"7d"});
        res.status(201).json({
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        })
        
    }catch(err){
        console.log("Registration error :",err);
        res.status(500).json({message:"Server Error"})
    }
})


module.exports = router