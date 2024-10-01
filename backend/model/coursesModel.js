const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coursesModel = new Schema({
  title: { type: String },
  description: { type: String },
  category: { type: String },
  difficultyLevel: { type: String },
  price: { type: Number },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  studentsId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
  ],

  duration: { type: String },
  language: { type: String },
  format: { type: String },

  learnTarget: [{ type: String }],
  downloadNb: { type: String },
  timeAccess: { type: String },
  articles: { type: String },
  videoDuration: { type: String },

  thumbnail: { type: String },
  headTags: [{ type: String }],
  tags: [{ type: String }],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "commentModel",
    },
  ],
  video: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "videoModel",
  },

  avgRate: {
    rate: { type: Number, default: 0 },
    nbRate: { type: Number, default: 0 },
  },
});
module.exports = mongoose.model("coursesModel", coursesModel);
