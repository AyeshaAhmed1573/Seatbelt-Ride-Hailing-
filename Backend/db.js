const mongoose= require('mongoose')
const connectToDb=()=>{mongoose.connect(process.env.CONNECT_DB).then(()=>{
    console.log("the database is connected");
    
}).catch((err)=>{console.log(err)})}
module.exports=connectToDb;