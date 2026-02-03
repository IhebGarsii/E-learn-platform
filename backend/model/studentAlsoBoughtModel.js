const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentAlsoBoughtSchema = new Schema({
  category: [
    {
      type: String,
    },
  ],
  courseArrayNumber: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "coursesModel",
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
