const express=require('express');
const medicineRouter=express.Router();
const medicineModel=require('../model/medicine.model');
const uploadObj = require('../model/multer');
const base_url=require('../model/base_url');
//consuming the middleware
const checkAuth = require("../middleware/check.auth");
//creating get end point to acess all the data
medicineRouter.get("/all",checkAuth,(req,res)=>{
    //res.send(`Reciving all the medicines`)
    medicineModel.find({})
        .exec()
        .then((medicineInfo)=>{
            res.status(200).json(medicineInfo);
        }).catch((error)=>{
            res.status(200).json({"message":error})
        })
});

//creating post end point for adding meeicines
medicineRouter.post("/add",uploadObj.single('avatar'),(req,res)=>{
    medicineModel.create({
        "medicine_name":req.body.mname,
        "medicine_comp":req.body.mcomp,
        "medicine_price":req.body.mprice,
        "used_for"      :req.body.used_for,
        "medicine_image":base_url+req.file.filename
    }).then((medicineInfo)=>{
        //res.status(200).json(medicineInfo)
        if(medicineInfo){
            res.status(200).json({"message":"medicine add succes"})
        }else{
            res.status(200).json({"message":"medicine add failed"})
        }
    }).catch((error)=>{
        res.status(200).json({"message":error});
    })
})

//creating put endpoint for updating the meeicine list
medicineRouter.put("/update/:mid",(req,res)=>{
    let medicineId=req.params.mid;
    medicineModel.updateOne(
        {"_id":medicineId},
        {$set:{
            "medicine_name":req.body.mname,
            "medicine_comp":req.body.mcomp,
            "medicine_price":req.body.mprice,
            "used_for":req.body.used_for
        }}).then((medicineInfo)=>{
            //res.status(200).json(medicineInfo)
            if(medicineInfo){
                res.status(200).json({"message":"medicine update succesfull"})
            }else{
                res.status(200).json({"message":"medicine update failed"})
            }
        }).catch((error)=>{
            res.status(200).json({"message":error})
        })
    
})

//creating delete router 
medicineRouter.delete("/delete/:mid",(req,res)=>{
    let medicineId=req.params.mid;

    medicineModel.deleteOne({"_id":medicineId})
        .then((medicineInfo)=>{
            if(medicineInfo){
                res.status(200).json({"message":"medicine delete succeafull"})
            }else{
                res.status(200).json({"message":"medicine delete failed"})
            }
        })
})
   

  
     
module.exports=medicineRouter;
console.log(`The medicine router is ready to use`);


        