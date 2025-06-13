const userModel = require('../models/user.model.js');
const userservice = require('../services/user.service.js');
const { validationResult } = require('express-validator');

const registerUser = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let { fullname, email, password } = req.body;
    let userexist = await userModel.findOne({ email });

    if (userexist) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await userModel.hashpassword(password);

    let user = await userservice.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword 
    });

    const token = user.authToken();
    res.cookie('token',token);
    res.status(201).json({ token, user });
};

const loginUser = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() });
    }

    let { email, password } = req.body;
    let user = await userModel.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).json({ message: 'User does not exist' });
    }

    const result = await user.verifyPassword(password);
    if (!result) {
        return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = user.authToken(); 
    res.cookie('token',token);
    res.status(200).json({ token, user });
};

const getUserProfile=async(req,res,next)=>{
  
    res.status(200).json(req.user);
}
module.exports = { registerUser, loginUser, getUserProfile };
