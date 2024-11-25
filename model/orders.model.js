
const mongoose = require('mongoose');

const orderaSchema = mongoose.Schema({
      'order_id'    :{type:String,reuired:[true,'orderid is needed'],unique:true},
      'order_date'  :{type:Date,required:[true,'orderdate is required'],default:new Date()},
      'user_id'     :{type:mongoose.Types.ObjectId,required:true,ref:'userModel'},
      'medicine_id' :{type:mongoose.Types.ObjectId,required:true,ref:'medicineModel'}
},{versionKey:false});
                                //vm         //schema     //collection
module.exports = mongoose.model("orderModel",orderaSchema,"ordersinfo");
console.log("order model is ready to use");



