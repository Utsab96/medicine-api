// const express=require('express')
// const ordersModel=require('../model/orders.model');

// const ordersRouter=express.Router();


// //creating function for generating order id
// function generateOrderID(){
//     return "order"+Math.floor(Math.random()*9999)
// }

// ordersRouter.post("/buy/:uid/:mid",(req,res)=>{
//     let userID=req.params.uid;
//     let medicineId=req.params.mid;

//     ordersModel.create({
//         "order_id":generateOrderID(),
//         "user_id":userID,
//         "medicine_id":medicineId
//     }).then((ordersInfo)=>{
//         if(!ordersInfo){
//             res.status(200).json({"message":"order placed failed"})
//         }else{
//             res.status(200).json({"message":"order placed"})
//         }
        
//     }).catch((error)=>{
//         res.status(500).json(error)
//     })
// })

// ordersRouter.post("/view",(req,res)=>{
//     let orderId=req.body.orderId;

//     ordersModel.findOne({
//         "order_id":orderId
//     })
//     .exec()
//     .then((orderInfo)=>{
//         if(orderInfo){
//             res.status(200).json(orderInfo)
//         }else{
//             res.status(200).json({"message":"order not found"})
//         }
//     }).catch((error)=>{
//         res.status(500).json(error)
//     })
// })

// module.exports=ordersRouter;
// console.log(`order router is ready to use`);
const express = require('express');
const orderModel = require('../model/orders.model');

const orderRouter = express.Router();

function generateOrderId(){
    return "order-"+Math.random()*9999;
}

orderRouter.post("/buy/:uid/:mid",(req,res)=>{
     orderModel.create({
        'order_id'   :generateOrderId(),
        "user_id"    :req.params.uid,
        "medicine_id":req.params.mid
     }).
     then((orderInfo)=>{
           if(!orderInfo){
            res.status(200).json({"message":"order failed due to some unknown error"});
           }else{
            res.status(200).json({"message":"order has been placed successfully"});
           }
     })
     .catch((error)=>{
        res.status(200).json(error);
     })
});
orderRouter.post("/view",(req,res)=>{
       orderModel.findOne({
          "order_id":req.body.order_id
       })
       .populate("user_id")
       .populate("medicine_id")
       .exec()
       .then((ordersInfo)=>{
               if(ordersInfo){
                res.status(200).json(ordersInfo);
               }else{
                res.status(200).json({"message":"order not found"});
               }
         })
         .catch((error)=>{
            res.status(200).json(error);
         })
});

module.exports = orderRouter;
console.log("order router is ready to use");
