const captainService = require('../service/captain.service');
const {validationResult} = require('express-validator');
const captainModel = require('../model/captain.model');
const blacklistModel = require('../model/blackList.model');
const registerCaptain=async(req,res,next)=>{
    const error=validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
  let {fullname,email,password,vehicle}=req.body;
  let captainexist= await captainModel.findOne({email});
  if(captainexist){
    return res.status(400).json({message:'Captain already exists'});
   } else{
    const hashpassword= await captainModel.hashPassword(password);

  let captain= await captainService.createCaptain({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashpassword,
    color:vehicle.color,
    plate:vehicle.plate,
    capacity:vehicle.capacity,
    vehicletype:vehicle.vehicletype
  })
  const token= captain.authToken();
  res.cookie('token',token);
    res.status(201).json({ token, captain });
  }
}
const loginCaptain= async(req,res)=>{
  if (!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    let{email,password}=req.body;
    let captain= await captainModel.findOne({email}).select('+password');
    if(!captain){
      return res.status(400).jsaon({message:'captain does not exist'});

    }
    const verify= await captain.verifuyPassword(password);
    if(!verify){
      return res.status(400).json({message:'Invalid email or password'});
    }
    const token= captain.authToken();
    res.cookie('token',token);
    res.status(200).json({ token, captain });
}
module.exports.getcaptainProfile=async(req,res,next)=>{
  res.status(200).json({captain:req.captain});
}

module.exports.captainLogout=async(req,res,next)=>{
  const token = req.cookies.token||req.headers.authorization?.split('')[1]
  await blacklistModel.create({token})
  res.clearCookie('token');
  res.status(200).json({message:'captain logged out successfully'});

}
