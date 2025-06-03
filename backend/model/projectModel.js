const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const projectModel = new Schema({
  images: [{ type: String }],
  description: { type: String },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  headTags: [{ type: String }],
  tags: [{ type: String }],
  title: { type: String },
  githubLink: { type: String },
  liveDemoLink: { type: String },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
  visibility: {
    type: String,
    enum: ["public", "private"],
    default: "public",
  },
});

module.exports = mongoose.model("projectModel", projectModel);
