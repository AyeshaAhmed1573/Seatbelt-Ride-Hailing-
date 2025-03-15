const dotenv=require('dotenv')
dotenv.config();
const express= require('express')
const app= express();
const cors= require('cors')
const cookieparser=require('cookie-parser');
const connectToDb= require('./db')
const userRoutes=require('./routes/user.routes')
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
connectToDb();
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use(cookieparser())
app.use('/user',userRoutes)

module.exports=app;