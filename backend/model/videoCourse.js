const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const videoModel = new Schema({
  video: [
    {
      sectionTitle: { type: String, required: true },
      videoList: [
        {
          videoName: {
            type: String,
            required: true,
          },
          comments: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "commentModel",
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
