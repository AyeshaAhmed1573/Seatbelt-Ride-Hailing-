const captainModel = require('../models/captain.model');
module.exports.createCaptain = async ({firstname,lastname,email,password, color,plate,capacity,vehicletype})=>{
    if(!firstname||!email||!password||!color||!plate||!capacity||!vehicletype){
        throw new Error('All fields are required')
    }
    const captain= await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            capacity,
            vehicletype
        }
    })
    return captain
}