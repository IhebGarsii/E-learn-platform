const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const projectModel = new Schema({
  images: [{ type: String }],
  description: { type: String },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
});

module.exports = mongoose.model("projectModel", projectModel);
