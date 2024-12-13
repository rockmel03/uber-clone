const mongoose = require("mongoose");

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
    enum: ["pending", "accepted", "ongoing", "completed", "cancelled"],
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
