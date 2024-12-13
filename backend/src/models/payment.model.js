const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
      enum: ["USD", "EUR", "GBP", "INR"],
      default: "INR",
    },
    transactionId: {
      type: String,
      unique: true, // Ensure it's unique, but can remain null until payment is made
      sparse: true, // Allows null values for pending payments
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "completed", "failed", "cancelled"],
      default: "pending",
    },
    // Payment intent ID (useful if working with payment gateways like Stripe or PayPal)
    paymentIntentId: {
      type: String,
      unique: true,
      sparse: true,
    },
    paymentDate: {
      type: Date,
    },
    description: {
      type: String,
      maxlength: 500,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
