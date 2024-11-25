const mongoose=require('mongoose');
const db=require('../model/connection');

const userSchema = new mongoose.Schema({
    "name":{type:'String',required:true},
    "email":{type:'String',required:true,unique:true},
    "phone":{type:'String',required:true,unique:true},
    "password":{type:'String',required:true}
},{versionKey:false});

module.exports=mongoose.model("userModel",userSchema,"users")
console.log(`User model is ready to use`);
