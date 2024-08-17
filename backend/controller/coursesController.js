const commentsModel = require("../model/commentsModel");
const coursesModel = require("../model/coursesModel");
const videoCourse = require("../model/videoCourse");

const getAllCourses = async (req, res) => {
  try {
    const courses = await coursesModel.find().populate("instructorId");
    res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
const getCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;

    const course = await coursesModel
      .findById(idCourse)
      .populate({
        path: "video",
        populate: {
          path: "video.videoList.comments",
          model: "commentModel",
        },
      })
      .populate("comments");

    if (!course) {
      return res.status(404).json({ error: "No Courses Found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

const rateCourse = async (req, res) => {
  try {
    const { idCourse } = req.params;
    const { rate } = req.body;

    // Find the course by its ID
    const course = await coursesModel.findById(idCourse);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Calculate the new average rating
    const totalRate = course.avgRate.rate * course.avgRate.nbRate; // Total rate accumulated
    const newNbRate = course.avgRate.nbRate + 1;
    const newRate = (totalRate + rate) / newNbRate;

    // Update the course with the new average rating and number of ratings
    course.avgRate.rate = newRate;
    course.avgRate.nbRate = newNbRate;

    // Save the updated course
    await course.save();

    res.status(200).json(course);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
const AddCourse = async (req, res) => {
  try {
    console.log("Files received:", req.files);

    const videoFiles = [];
    const sectionData = {};

    // Check if video files are present
    if (req.files["video"]) {
      req.files["video"].forEach((file) => {
        // Extract filename and save to array
        videoFiles.push(file.originalname);
      });
    }
    console.log("Video filenames:", videoFiles);

    // Process filenames to extract section titles and videos
    videoFiles.forEach((file) => {
      // Extract the part after the last underscore and before the file extension
      const parts = file.split("_"); // Split by underscore

      const sectionTitle = parts.slice(0, -1).join("_"); // All but last part
      const videoTitle = parts[parts.length - 1]; // Last part after last underscore

      // Organize by section
      if (!sectionData[sectionTitle]) {
        sectionData[sectionTitle] = { sectionTitle, videoList: [] };
      }
      // Save video titles as objects with a `videoName` property
      sectionData[sectionTitle].videoList.push({ videoName: videoTitle });
    });

    // Convert sectionData to an array
    const sections = Object.values(sectionData);

    // Handle thumbnail
    const thumbnail = req.files["thumbnail"][0];
    console.log("sections", sections);

    // Save video data with the new structure
    const savedVideo = await videoCourse.create({
      video: sections,
      instructorId: req.body.instructorId,
    });

    // Save course data including the reference to the saved video
    const course = await coursesModel.create({
      ...req.body,
      thumbnail: thumbnail.filename,
      video: savedVideo._id, // Include organized sections
    });

    // Respond to the client
    res.status(201).json({
      message: "Course added successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

/* const getComments = async (req, res) => {
  try {
    const {idCourse,idVid}
  } catch (error) {
    
  }
}; */
const addCommentToVideo = async (req, res) => {
  try {
    const { idVid, commentText, givenUser } = req.body; // idVid is the video ID and commentText is the comment to add.
    console.log(req.body);
    // Create the comment document first
    const newComment = await commentsModel.create({
      givenUser,
      commentText,
      // Add any other fields required by your comment schema
    });

    if (!newComment) {
      return res.status(400).json({ message: "Failed to create comment" });
    }

    // Find the video document and specific video by idVid
    const videoDocument = await videoCourse
      .findOneAndUpdate(
        { "video.videoList._id": idVid },
        {
          $push: {
            "video.$[section].videoList.$[video].comments": newComment._id,
          },
        },
        {
          arrayFilters: [
            { "section.videoList._id": idVid },
            { "video._id": idVid },
          ],
          new: true,
        }
      )
      .populate("video.videoList.comments"); // Populate comments

    if (!videoDocument) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Return the updated video document
    res.status(200).json({
      message: "Comment added successfully",
      videoDocument,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const deleteCourse = async (req, res) => {
  const { idUser, idCourse } = req.params;
  try {
    const coursre = await coursesModel.findById(idCourse);
    const user = await userModel.findById(idUser);
    if (coursre.student.length > 0) {
      return res
        .status(300)
        .json(
          "You Cant Delete This Course becaues student allready enrroled in it"
        );
    }
    if (user.courses.includes(idCourse)) {
      const deletedCoures = await coursesModel.findByIdAndDelete(idCourse);
      return res.status(202).json("Coures Deleted Succsefuly");
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
const updateCourse = async (req, res) => {
  const { idUser, idCourse } = req.params;
  try {
    const course = await coursesModel.findById(idCourse);
    if (course.instructorId.toString() !== idUser) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this course." });
    }
    await coursesModel.findByIdAndUpdate(req.body);
    res.status(202).json("Your Course Has Been Updated");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  AddCourse,
  deleteCourse,
  updateCourse,
  rateCourse,
  addCommentToVideo,
};
