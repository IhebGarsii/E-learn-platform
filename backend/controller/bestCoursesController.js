const studentAlsoBoughtModel = require("../model/studentAlsoBoughtModel");

const getMostBoughtCourses = async (req, res) => {
  try {
    const courses = await studentAlsoBoughtModel
      .find({ category: { $in: req.body.coursesTags } }) 
      .populate("courseArrayNumber.courseId");

    if (!courses || courses.length === 0) {
      return res.status(404).json({ message: "No courses found" });
    }

    // ✅ Flatten courseArrayNumber from all matching documents
    let allCourses = [];
    courses.forEach((doc) => {
      allCourses = allCourses.concat(doc.courseArrayNumber);
    });

    // ✅ Sort by nbOfTimesBought descending
    allCourses.sort((a, b) => b.nbOfTimesBought - a.nbOfTimesBought);

    // ✅ Take top 5
    const topCourses = allCourses.slice(0, 5);

    return res.status(200).json(topCourses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getMostBoughtCourses,
};
