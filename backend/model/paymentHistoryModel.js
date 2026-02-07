const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const paymentHistoryModel = new Schema({
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
  },

  currency: {
    type: String,
    default: "USD",
  },

  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed", "refunded"],
    index: true,
  },

  



  purchasedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});
module.exports = mongoose.model("paymentHistoryModel", paymentHistoryModel);
