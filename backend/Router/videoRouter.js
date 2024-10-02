const express = require("express");
const { deleteVideo, addVideo } = require("../controller/videoController");

const videoRouter = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/courses");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    // Check if the file is a video
    if (file.fieldname === "video") {
      // Split the base name by underscores
      const parts = baseName.split("_");
      // Get the last part (after the last underscore)
      const newBaseName = parts[parts.length - 1];
      // Form the new filename with extension
      const newFilename = `${newBaseName}${ext}`;
      cb(null, newFilename);
    } else {
      // For thumbnail or other files, keep the original name
      cb(null, file.originalname);
    }
  },
});

const upload = multer({ storage: storage });
const uploadFields = upload.fields([
  { name: "video", maxCount: 20 }, // Adjust maxCount based on your needs
]);
videoRouter.delete("/deleteVideo/:idVideos/:idSection/:idVideo", deleteVideo);
videoRouter.put(
  "/addVideo/:idVideos/:idSection",
  upload.single("video"),
  addVideo
);

module.exports = videoRouter;
