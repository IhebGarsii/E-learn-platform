const coursesModel = require("../model/coursesModel");
const studentAlsoBoughtModel = require("../model/studentAlsoBoughtModel");

const getMostBoughtCourses = async (req, res) => {
  try {
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    const courses = await studentAlsoBoughtModel
      .findOne({ category: { $in: [req.body.coursesTags] } })
      .sort({ studentsEnrolled: -1 })
      .limit(5);
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getMostBoughtCourses,
};
