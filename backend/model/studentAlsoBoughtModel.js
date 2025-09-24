const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentAlsoBoughtSchema = new Schema({
  category: [
    {
      type: String,
      required: true, // optional, but usually categories are required
    },
  ],
  courseArrayNumber: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseModel",
      },
      nbOfTimesBought: {
        type: Number,
        default: 0,
      },
    },
  ],
  courseArrayRate: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "courseModel",
      },
      rating: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model(
  "studentAlsoBoughtModel",
  studentAlsoBoughtSchema
);
