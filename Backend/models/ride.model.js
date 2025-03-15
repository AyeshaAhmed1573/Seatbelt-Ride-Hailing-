const mongoose = require("mongoose");
const riderSchema = mongoose.Schema({
  ride: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  captain: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "captain",
    required: true,
  },
  pickup: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "accept", "cancelled", "completed", "ongoing"],
    required: true,
    default: pending,
  },
  duration: {
    type: Number,
    required: true,
  },
});
module.exports = mongoose.model("ride", riderSchema);
