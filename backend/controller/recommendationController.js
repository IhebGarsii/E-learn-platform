const userModel = require("../model/userModel");
const coursesModel = require("../model/coursesModel");

// Simple content-based recommender using bought courses' categories and tags
const getRecommendationsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const user = await userModel.findById(userId).populate("boughtCourses");
    if (!user) return res.status(404).json({ message: "User not found" });

    const bought = user.boughtCourses || [];
    if (bought.length === 0) return res.status(200).json([]);

    // Collect category and tag signals from purchased courses
    const categoryCounts = {};
    const tagCounts = {};

    bought.forEach((c) => {
      if (c.category)
        categoryCounts[c.category] = (categoryCounts[c.category] || 0) + 1;
      if (Array.isArray(c.tags)) {
        c.tags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
      }
      if (Array.isArray(c.headTags)) {
        c.headTags.forEach((t) => (tagCounts[t] = (tagCounts[t] || 0) + 1));
      }
    });

    // Score candidate courses by matching category and tags, exclude already bought
    const boughtIds = new Set(bought.map((c) => c._id.toString()));

    const candidates = await coursesModel.find({
      _id: { $nin: Array.from(boughtIds) },
    });

    const scored = candidates
      .map((course) => {
        let score = 0;
        if (course.category && categoryCounts[course.category])
          score += 3 * categoryCounts[course.category];
        const courseTags = [...(course.tags || []), ...(course.headTags || [])];
        courseTags.forEach((t) => {
          if (tagCounts[t]) score += tagCounts[t];
        });

        // boost by popularity (number of students) and average rating
        const popularity = Array.isArray(course.studentsId)
          ? course.studentsId.length
          : 0;
        const avgRate =
          course.avgRate && course.avgRate.rate ? course.avgRate.rate : 0;
        score += Math.log(1 + popularity) + avgRate * 0.5;

        return { course, score };
      })
      .filter((c) => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 12)
      .map((c) => c.course);

    return res.status(200).json(scored);
  } catch (err) {
    console.error("recommendation error", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getRecommendationsForUser };
