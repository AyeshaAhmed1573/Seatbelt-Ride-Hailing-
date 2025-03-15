const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const userSchema= mongoose.Schema(
    {
        fullname:{
            firstname:{
                type:String,
                required:true

            },
        lastname:{
            type:String,
            required:true
        },
        },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
        minlength:[8,'the password should be of 8 characters']
    },
    socketid:
    { 
        type:String
    }
    }
)
userSchema.methods.authToken= function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}
userSchema.methods.verifyPassword= function(password){
    return bcrypt.compare(password,this.password)
}
userSchema.statics.hashpassword=function(password){
    return bcrypt.hash(password,10)
}
module.exports= mongoose.model('user',userSchema)