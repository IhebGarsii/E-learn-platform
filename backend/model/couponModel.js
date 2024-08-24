const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const couponModel = new Schema({
  title: { type: String },
  discount: { type: Number },
});

module.exports = mongoose.model("couponModel ", couponModel);
