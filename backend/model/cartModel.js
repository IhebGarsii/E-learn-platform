const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const cartModel = new Schema({
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "coursesModel",
    },
  ],
  quantity: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
});

module.exports = mongoose.model("cartModel", cartModel);
