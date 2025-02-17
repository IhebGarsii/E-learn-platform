const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const replyCommentModel = new Schema({
  givenUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
  commenReplyText: {
    type: String,
  },
  date: { type: Date, default: Date.now },
 
});
module.exports = mongoose.model("replyCommentModel", replyCommentModel);
