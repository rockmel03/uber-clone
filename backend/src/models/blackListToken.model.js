const mongoose = require("mongoose");

const BlackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // default timestamp
    expires: 24 * 60 * 60, // TTL index in seconds (24 hours)
  },
});

// Create the BlackListToken model
const BlackListToken = mongoose.model("BlackListToken", BlackListTokenSchema);

module.exports = BlackListToken;
