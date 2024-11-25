const dotenv=require('dotenv').config();

const base_url=`http://${process.env.HOST}:${process.env.PORT}/uploads/`

module.exports=base_url;
console.log(`${base_url} base url is ready to use`);
