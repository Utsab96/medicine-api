let mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/medicineDB')
    .then(()=>{
        console.log(`Succesfully connected to MongoDB`) 
    }).catch((error)=>{
        console.log(error);   
    }).finally(()=>{
        console.log(`Mongoose is ready for database operations`);
        
    })


