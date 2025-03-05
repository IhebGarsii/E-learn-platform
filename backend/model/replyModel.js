const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const replyCommentModel = new Schema({
  givenUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  commentReplyText: {
    type: String,
  },
  date: { type: Date, default: Date.now },
  commnetID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "commentModel",
  },
});
module.exports = mongoose.model("replyCommentModel", replyCommentModel);
