const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const videoModel = new Schema({
  video: [
    {
      sectionTitle: { type: String },
      videoList: [{ type: String }],
    },
  ],
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentModel", // Reference to a Course model
    },
  ],
});

module.exports = mongoose.model("videoModel", videoModel);
