const mongoose=require('mongoose');
const db=require('../model/connection');
//desiging the entire medicine model
const medicineSchema=new mongoose.Schema({
    "medicine_name":{type:'String',required:true},
    "medicine_comp":{type:'String',required:true},
    "used_for"     :{type:'String'},
    "medicine_price":{type:Number,required:true},
    "medicine_image":{type:String},
    "medicine_entry":{type:Date,required:true,default:new Date()}
},{versionKey:false})
                                //name       //schema     //collections
module.exports=mongoose.model("medicineModel",medicineSchema,"medicines");

console.log(`Medicine model is ready to use`);


