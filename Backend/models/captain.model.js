const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: true,
    minlength: [8, "the password should be atleast 8 characters"],
  },
  vehicle: {
    color: {
      type: String,
      require: true,
      minlength: [3, "the color should be atleast 3 characters"],
    },
    plate: {
      type: String,
      require: true,
      minlength: [3, "the number plate should be atleast 3 characters"],
    },
    capacity: {
      type: Number,
      require: true,
      minlength: [1, "the capacity should be atleast 1"],
    },
    vehicletype: {
      type: String,
      require: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  status: {
    type: String,

    enum: ["active", "inactive"],
    default: "inactive",
  },
  location: {
    ltd: {
      type: Number,
      require: true,
    },
    long: {
      type: Number,
      require: true,
    },
  },
  socketid: {
    type: Number,
  },
});
captainSchema.methods.generateToken = function () {
  const token = JsonWebTokenError.sign(
    { _id: this._id },
    process.env.JWT_SECRET
  );
  return token;
};
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
captainSchema.statics.hashPassword = async function (password) {
  return await bycrypt.hash(password, 10);
};

module.exports = mongoose.model("captain", captainSchema);
