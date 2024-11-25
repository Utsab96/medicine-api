const multer=require('multer');

const myUploadStorage=multer.diskStorage({
    filename:((req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname);
    }),
    destination:"./public/uploads"
});

const uploadObj=multer({
    storage:myUploadStorage
});

module.exports=uploadObj;
console.log(`Upload storage is ready to use`);
