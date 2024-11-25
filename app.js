const express=require('express');
const cors=require('cors');
const dotent=require('dotenv').config();

const medicineRouter = require('./routes/medicines.routes');
const userRouter = require('./routes/user.routes');
const ordersRouter = require('./routes/orders.routes');

port=process.env.PORT;
host=process.env.HOST;

const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"))

app.use("/api/medicine",medicineRouter);
app.use("/api/users",userRouter);
app.use("/api/orders",ordersRouter);

app.get("/",(req,res)=>{
    res.send(`<h1>Welcome to medicine server</h1>`)
})

app.listen(port,host,()=>{
    console.log(`The server is listening at http://${host}:${port}`);
})