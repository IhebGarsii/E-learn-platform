const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const videoModel = new Schema({
  video: [
    {
      sectionTitle: { type: String },
      videoList: [
        {
          videoName: {
            type: String,
          },
          comments: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "commentModel", // Reference to a Course model
            },
          ],
        },
      ],
    },
  ],
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
});

module.exports = mongoose.model("videoModel", videoModel);
