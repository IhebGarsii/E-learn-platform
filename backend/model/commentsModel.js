const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const commentModel = new Schema({
  givenUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  commentText: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  reply: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "replyCommentModel",
    },
  ],
});
module.exports = mongoose.model("commentModel", commentModel);
