const studentAlsoBoughtModel = require("../model/studentAlsoBoughtModel");

const getMostBoughtCourses = async (req, res) => {
  try {
    const courses = await studentAlsoBoughtModel
      .findOne({ category: { $in: [req.body.coursesTags] } })
      .sort({ studentsEnrolled: -1 })
      .limit(5)
      .populate("courseArrayNumber.courseId");
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }

    console.log(
      "eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
      courses
    );
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);

    return res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getMostBoughtCourses,
};
