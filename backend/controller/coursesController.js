const commentsModel = require("../model/commentsModel");
const coursesModel = require("../model/coursesModel");
const videoCourse = require("../model/videoCourse");
const userModel = require("../model/userModel");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const mongoose = require("mongoose");
const replyModel = require("../model/replyModel");
const fs = require("fs");
const { getVideoDurationInSeconds } = require("get-video-duration");
const ffprobePath = require("ffprobe-static").path;
const getAllCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const skip = page * limit;

    const courses = await coursesModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate("instructorId");

    const totalCourses = await coursesModel.countDocuments();
    const hasMore = skip + courses.length < totalCourses;

    res.status(200).json({ courses, hasMore });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
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

    const videoFiles = [];
    const sectionData = {};

    // Collect video file info
    if (req.files["video"]) {
      req.files["video"].forEach((file) => {
        videoFiles.push({
          serverFilename: file.filename, // Used to read the file from disk
          originalFilename: file.originalname, // Used to extract section/video names
        });
      });
    }

    for (const file of videoFiles) {
      const parts = file.originalFilename.split("_");

      // Skip if filename doesn't have at least one underscore
      if (parts.length < 2) continue;

      const sectionTitle = parts.slice(0, -1).join("_");
      const videoTitle = parts[parts.length - 1];

      const videoPath = path.resolve("uploads/courses", file.serverFilename);
      let duration = 0;

      try {
        duration = await getVideoDurationInSeconds(videoPath, ffprobePath);
      } catch (err) {
        console.error("Error getting duration for", file.originalFilename, err);
      }

      if (!sectionData[sectionTitle]) {
        sectionData[sectionTitle] = { sectionTitle, videoList: [] };
      }

      sectionData[sectionTitle].videoList.push({
        videoName: videoTitle,
        duration: Math.round(duration),
      });
    }

    // Convert to array format for DB
    const sections = Object.values(sectionData);

    // Handle thumbnail
    let thumbnail;
    if (req.files["thumbnail"] !== undefined) {
      thumbnail = req.files["thumbnail"][0];
    } else {
      return res.status(400).json("You must provide a thumbnail");
    }

    // Save videos to videoCourse collection
    const savedVideo = await videoCourse.create({
      video: sections,
      instructorId: req.body.instructorId,
    });

    // Save course data
    const course = await coursesModel.create({
      ...req.body,
      thumbnail: thumbnail.filename,
      video: savedVideo._id,
    });

    // Link course to instructor
    const user = await userModel.findById(req.body.instructorId);
    user.courses.push(course._id);
    await user.save();

    res.status(201).json({
      message: "Course added successfully!",
      user,
    });
  } catch (error) {
    console.error("AddCourse error:", error);
    res.status(500).json({ message: error.message });
  }
};
/* const AddCourse = async (req, res) => {
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
    let thumbnail;
    if (req.files["thumbnail"] !== undefined) {
      thumbnail = req.files["thumbnail"][0];
    } else {
      return res.status(400).json("you must provide a thumbnail");
    }

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
    const user = await userModel.findById(req.body.instructorId);
    user.courses.push(course._id);
    await user.save();
    // Respond to the client
    res.status(201).json({
      message: "Course added successfully!",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};  */ 

const getComments = async (req, res) => {
  try {
    // Log the request parameters
    console.log(req.params);

    // Extract parameters from the request
    const { videoList, idVideo } = req.params;

    // Convert videoList and idVideo to MongoDB ObjectId
    const videoListId = new mongoose.Types.ObjectId(videoList);
    const idVideoId = new mongoose.Types.ObjectId(idVideo);

    // Log IDs to ensure they are correctly formatted
    console.log("Video List ID:", videoListId);
    console.log("Video ID:", idVideoId);

    // Find the document with the specified videoListId and populate comments along with the user who created them
    const videoEntry = await videoCourse
      .findOne({ _id: videoListId })
      .populate({
        path: "video.videoList.comments",
        model: "commentModel",
        populate: [
          {
            path: "givenUser",
            model: "userModel", // Ensure it references the correct user model
          },
          {
            path: "reply",
            populate: {
              path: "givenUser",
              model: "userModel", // This should be the user model, not replyModel
            },
          },
        ],
      })
      .exec();

    // Log the result to see what's returned
    console.log("Video Entry:", videoEntry);

    if (!videoEntry) {
      return res.status(404).json({ message: "Video list not found" });
    }

    // Find the specific video within the videoList array
    const video = videoEntry.video.find((v) =>
      v.videoList.some((vid) => vid._id.toString() === idVideoId.toString())
    );

    if (!video) {
      return res.status(404).json({ message: "Video not found in the list" });
    }

    // Extract the specific video from the videoList
    const specificVideo = video.videoList.find(
      (vid) => vid._id.toString() === idVideoId.toString()
    );

    if (!specificVideo) {
      return res.status(404).json({ message: "Video not found in the list" });
    }

    // Send the comments as a response
    res.status(200).json({ comments: specificVideo.comments });
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving comments" });
  }
};
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
  const { idCourse, idUser } = req.params;

  try {
    const coursre = await coursesModel.findById(idCourse);

    if (coursre.studentsId.length > 0) {
      return res
        .status(404)
        .json(
          "You Cant Delete This Course becaues student allready enrroled in it"
        );
    }

    console.log(coursre.instructorId.equals(idUser));
    if (!coursre.instructorId.equals(idUser)) {
      console.log("You Don't Have The Permition For This Action");

      return res
        .status(403)
        .json("You Don't Have The Permition For This Action");
    }
    const deletedCoures = await coursesModel.findByIdAndDelete(idCourse);
    console.log(deletedCoures);
    return res.status(202).json("Coures Deleted Succsefuly");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
const updateCourse = async (req, res) => {
  const { idUser, idCourse } = req.params;

  try {
    let thumbnailFilename;

    // If a new thumbnail was uploaded
    if (req.files?.["thumbnail"] && req.files["thumbnail"].length > 0) {
      thumbnailFilename = req.files["thumbnail"][0].filename;
    }

    const course = await coursesModel.findById(idCourse);
    if (!course) {
      return res.status(404).json({ error: "Course not found." });
    }

    // Check authorization
    if (course.instructorId.toString() !== idUser) {
      return res
        .status(401)
        .json({ error: "You are not authorized to update this course." });
    }

    // Build updated data object
    const updateData = {
      ...req.body,
    };

    // Sanitize: prevent passing thumbnail from req.body
    if (typeof updateData.thumbnail !== "string") {
      delete updateData.thumbnail;
    }

    if (thumbnailFilename) {
      updateData.thumbnail = thumbnailFilename;
    }

    const updatedCourse = await coursesModel
      .findByIdAndUpdate(idCourse, updateData, { new: true })
      .populate("video");
    console.log(updatedCourse);

    return res
      .status(200)
      .json({ msg: "Your Course Has Been Updated", updatedCourse });
  } catch (error) {
    console.error("Update Course Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

/* const updateCourse = async (req, res) => {
  const { idUser, idCourse } = req.params;

  try {
    let thumbnail;
    if (req.files["thumbnail"] !== undefined) {
      thumbnail = req.files["thumbnail"][0];
    }

    const course = await coursesModel.findById(idCourse);
    if (course.instructorId.toString() !== idUser) {
      console.log(course.instructorId.toString());
      console.log(idUser);

      return res
        .status(401)
        .json({ error: "You are not authorized to update this course." });
    }
    console.log("descprition", req.body.description);

    const updatedCourse = await coursesModel
      .findByIdAndUpdate(
        idCourse,
        { ...req.body, thumbnail: thumbnail?.filename },
        { new: true }
      )
      .populate("video");

    return res
      .status(200)
      .json({ msg: "Your Course Has Been Updated", updatedCourse });
  } catch (error) {
    console.log(error);

    return res.status(500).json(error.message);
  }
}; */
const addReplyComment = async (req, res) => {
  try {
    const { commentID, commentReplyText, givenUser } = req.body;
    console.log(req.body);

    const comment = await commentsModel.findById(commentID);
    if (!comment) {
      return res.status(404).json("comnt not found");
    }
    const reply = await replyModel.create({
      commentReplyText,
      givenUser,
      commentID,
    });
    if (!reply) {
      return res.status(401).json("reply not created");
    }
    comment.reply.push(reply._id);
    reply.save();
    comment.save();

    return res.status(201).json(reply);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};
const getSearchedCourses = async (req, res) => {
  try {
    const search = req.query.search;
    console.log("coursesdsssssssssssssssss");

    const query = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } },
            { tags: { $regex: search, $options: "i" } },
            { headTags: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const courses = await coursesModel.find(query);

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
const getInstructorCourses = async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId, "ssssssssssss");

    const courses = await coursesModel.find({ instructorId: userId });
    if (courses.length == 0) {
      return res.status(404).json(courses);
    }
    console.log(courses, "sssssssss");
    return res.status(200).json(courses);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const coursePayment = async (req, res) => {
  try {
    const stripe = require("stripe")(process.env.STRIPE);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: await req.body.map((item) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.SERVER}/PaymentSuccess`,
      cancel_url: `${process.env.SERVER}/PaymentFailure`,
    });
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err.message });
  }
};
const addStudentToCourse = async (req, res) => {
  try {
    const { courseIds } = req.body;
    const { userId } = req.params;
    let boughtC = [];
    console.log(courseIds, "courseIds");

    courseIds.forEach(async (course) => {
      const courseData = await coursesModel.findById(course);
      if (!courseData) {
        return res.status(404).json({ message: "Course not found" });
      }
      if (!courseData.studentsId.includes(userId)) {
        courseData.studentsId.push(userId);
        boughtC.push(courseData._id);
        await courseData.save();
      }
    });
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.boughtCourses.push(...boughtC);
    await user.save();
    res
      .status(200)
      .json({ message: "Students added to course successfully", user });
  } catch (error) {
    console.error("Error adding student to course:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
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
  getComments,
  addReplyComment,
  getSearchedCourses,
  getInstructorCourses,
  coursePayment,
  addStudentToCourse,
};
