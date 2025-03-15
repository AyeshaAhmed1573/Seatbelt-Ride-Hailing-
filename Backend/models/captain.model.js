const mongoose = require("mongoose");
const captainSchema = mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      require: true,
    },
    lastname: {
      type: String,
    },
  },
  email: {
    type: String,
    require: true,
    lowercase:true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password:{
    type: String,
    require: true,
    minlength:[8,'the password should be atleast 8 characters']
  },
  vehicle:{
    type: String,
    require: true,
  },
  color:{
    type: String,
    require: true,
  },
  plate:{
    type: String,
    require: true,
  },
  capacity:{
    type: Number,
    require: true,
  },
  vehicletype:{
    type: String,
    require: true,
    enum:['car','motorcycle', 'auto']
  },
  status:{
    type: String,
    
    enum:['active','inactive'],
    default:'inactive'
  },
  location:{
    ltd:{
        type: Number,
    require: true,
    },
    long:{
        type: Number,
        require: true,
    }
  },
  socketid:{
    type: Number,
    
  }


});
module.exports=mongoose.model('captain',captainSchema)