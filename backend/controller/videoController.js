const videoCourse = require("../model/videoCourse");
/* 
const deleteVideo = async (req, res) => {
  try {
    const { idVideo, idVideos, idSection } = req.params;
    if (!idVideo) {
      return res.status(400).json("no id where found");
    }
    const video = await videoCourse.findByIdAndDelete(idVideo);
    if (!video) {
      return res.status(404).json("video not found");
    }
    return res.status(204).send();
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
 */
const deleteVideo = async (req, res) => {
  try {
    const { idVideos, idSection, idVideo } = req.params;

    if (!idVideos || !idSection || !idVideo) {
      return res.status(400).json("Missing required IDs");
    }

    // Find the course that contains the video
    const videos = await videoCourse.findById(idVideos);
    if (!videos) {
      return res.status(404).json("Course not found");
    }

    // Find the specific section by id
    const section = videos.video.find(
      (section) => section._id.toString() === idSection
    );
    if (!section) {
      return res.status(404).json("Section not found");
    }

    // Find the video in the section's videoList and remove it
    const videoIndex = section.videoList.findIndex(
      (video) => video._id.toString() === idVideo
    );
    if (videoIndex === -1) {
      return res.status(404).json("Video not found");
    }

    // Remove the video from the array
    section.videoList.splice(videoIndex, 1);

    // Save the course after deletion
    await videos.save();

    return res.status(204).send(); // No content after successful deletion
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { deleteVideo };
