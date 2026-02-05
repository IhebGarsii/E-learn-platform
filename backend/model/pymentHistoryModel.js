const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paymentHistory = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },

  courseIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  currency: {
    type: String,
    default: "USD",
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    required: true,
    index: true,
  },

  paymentMethod: {
    type: String,
    enum: ["card", "paypal", "stripe", "wallet"],
    required: true,
  },

  transactionId: {
    type: String,
    unique: true,
    sparse: true,
  },

  purchasedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});
module.exports = mongoose.model("paymentHistory", paymentHistory);
