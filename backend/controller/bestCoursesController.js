const studentAlsoBoughtModel = require("../model/studentAlsoBoughtModel");

const getMostBoughtCourses = async (req, res) => {
  try {
    const docs = await studentAlsoBoughtModel
      .find({ category: { $in: req.body.coursesTags } })
      .populate("courseArrayNumber.courseId")
      .lean();

    if (!docs.length) {
      return res.status(404).json({ message: "No courses found" });
    }

    const courseMap = new Map();

    docs.forEach((doc) => {
      doc.courseArrayNumber
        .filter((item) => item.courseId)
        .forEach((item) => {
          const id = item.courseId._id.toString();

          if (!courseMap.has(id)) {
            courseMap.set(id, { ...item });
          } else {
            courseMap.get(id).nbOfTimesBought += item.nbOfTimesBought;
          }
        });
    });

    const topCourses = Array.from(courseMap.values())
      .sort(
        (a, b) =>
          b.nbOfTimesBought - a.nbOfTimesBought ||
          a.courseId._id.localeCompare(b.courseId._id)
      )
      .slice(0, 5);

    res.status(200).json(topCourses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getMostBoughtCourses,
};
