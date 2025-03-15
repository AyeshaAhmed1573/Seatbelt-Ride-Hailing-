const userModel = require('../models/user.model.js');

module.exports.createUser = async (userData) => {
    const { firstname, lastname, email, password } = userData;
    if (!firstname  || !email || !password) {
        throw new Error('All fields are required');
    }
    const user=await userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user
}