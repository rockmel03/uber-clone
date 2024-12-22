const mongoose = require("mongoose");
const { RIDE_STATUS } = require("../constants");

const rideSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  captain: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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
    enum: RIDE_STATUS,
    default: "pending",
  },
  duration: {
    type: Number,
  }, // In seconds
  distance: {
    type: Number,
  }, // In meters
  otp: {
    type: Number,
    select: false,
    required: true,
  },
  paymentId: {
    type: mongoose.Types.ObjectId,
    ref: "Payment",
  },
});

const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
