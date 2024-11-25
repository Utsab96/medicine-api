const mongoose=require('mongoose')
const express=require('express');
const userModel=require('../model/user.model');
//requiring the bcryptjs
const bcryptjs=require('bcryptjs');

//loading the json webtoken
const jwt = require('jsonwebtoken');
//loading the dotenv lib.
const env = require('dotenv').config();
const userRouter=express.Router();

//creating function for bcryptjs
function generateHashPassword(password){
    let salt=bcryptjs.genSaltSync(10);
    let hash=bcryptjs.hashSync(password,salt);
    return hash;
}

//creating end point for sign in 

userRouter.post("/signup",(req,res)=>{
    let email=req.body.email
    let phone=req.body.phone
    const emailPattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phonePattern= /^[6-9]\d{9}$/;
    

    if(!emailPattern.test(email)){
        return res.status(200).json({"message":"Please enter a valid email"})
    }

    if(!phonePattern.test(phone)){
        res.status(200).json({"message":"Please enter a valid phone number"})
    }
    userModel.create({
        "name"    :req.body.name,
        "email"   :email,
        "phone"   :phone,
        "password":generateHashPassword(req.body.password)
    }).then((userInfo)=>{
        if(userInfo){
            
            res.status(200).json({"message":"success","user":userInfo})
        }else{
            res.status(200).json({"message":"sign up failed"})
        }
    }).catch((error)=>{
        res.status(500).json(error)
    })
})

//creating a sign in end point
userRouter.post("/signin",(req,res)=>{
    let email=req.body.email;
    
    userModel.findOne({
        "email":email
    }).then((userInfo)=>{
        //res.status(200).json({"message":"email is verified"})
        if(!userInfo){
            res.status(200).json({"message":"email not found"})
        }else{
            let checkPassword=bcryptjs.compareSync(req.body.password,userInfo.password)?true:false;
            if(checkPassword){
                var token = jwt.sign({"user_id":userInfo._id},process.env.PRIVATE_KEY,{expiresIn:'1h'});
                res.status(200).json({"message":"sign in succes","userInfo":userInfo,"token":token})
            }else{
                res.status(200).json({"message":"wrong password"})
            }
            
        }
    }).catch((error)=>{
        res.status(500).json(error)
    })
})

module.exports=userRouter;
console.log(`User Router is ready to use`);
