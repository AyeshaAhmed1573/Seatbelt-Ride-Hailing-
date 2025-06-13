const express= require('express');
cont router=express.Router();
const {body}=require('express-validator');
const captainController=require('../controller/captain.controller');
const { registerUser } = require('../controller/user.controller');

router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password should be at least 8 characters long'),
    body('fullname.firstname').isLength({min:3}).withMessage('Firstname should be at least 3 characters long'),
    body('vehicle.color').isLength({min:3}).withMessage('Color should be at least 3 characters long'),
    body('vehicle.plate').isLength({min:3}).withMessage('Plate should be at least 3 characters long'),
    body('vehicle.capacity').isNumeric().withMessage('Capacity should be a number'),
    body('vehicle.vehicletype').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
],captainController.registerUser)
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:8}).withMessage('Password should be at least 8 characters long'),
],captainController.loginUser)
module.exports=router;