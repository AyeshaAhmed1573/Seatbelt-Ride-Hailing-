const userModel = require('./models/user.model');
const bcrypt=require('bcrypt')
const jwt= require('jsonwebtoken')
const captainModel = require('./models/captain.model');
const blacklistModel = require('./models/blackList.model');

const userAuth= async(req, res, next)=>{
    const token = req.cookies.token||req.headers.authorization?.split(' ')[1]
    if(!token){
        res.status(400).json({message:'unauthorized'})
    }
    const isBlackListed= await blacklistModel.findOne({token})
    if(isBlackListed){
        return res.status(400).json({message:'unauthorized'})
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const user= await userModel.findById(decode._id)
        if(!user){
            res.status(400).json({message:'unauthorized'})
        }
        req.user=user;
    next()
    }
    catch{
        res.status(400).json({message:'unauthorized'})
    }
    
}
module.exports.captainAuth= async(req, res, next)=>{
    const token = req.cookies.token||req.headers.authorization?.split(' ')[1]
    if(!token){
        res.status(400).json({message:'unauthorized'})
    }
    const isBlackListed= await blacklistModel.findOne({token})
    if(isBlackListed){
        return res.status(400).json({message:'unauthorized'})
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const captain= await captainModel.findById(decode._id)
        if(!captain){
            res.status(400).json({message:'unauthorized'})
        }
        req.captain=captain;
    next()
    }
    catch{
        res.status(400).json({message:'unauthorized'})
    }
    
}
module.exports={userAuth}