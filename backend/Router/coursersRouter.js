const express = require("express");
const coursesRouter = express.Router();
const {
  getAllCourses,
  getCourse,
  AddCourse,
  deleteCourse,
  updateCourse,
  rateCourse,
  addCommentToVideo,
} = require("../controller/coursesController");
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
  { name: "thumbnail", maxCount: 1 },
  { name: "video", maxCount: 20 }, // Adjust maxCount based on your needs
]);
coursesRouter.post("/addCourse", uploadFields, AddCourse);

coursesRouter.get("/getAllCourses", getAllCourses);
coursesRouter.get("/getCourse/:idCourse", getCourse);
coursesRouter.get("/addCommentToVideo", addCommentToVideo);
coursesRouter.delete("/deleteCourse/:idUser/:idCourse", deleteCourse);
coursesRouter.put("/updateCourse/:idUser/:idCourse", updateCourse);
coursesRouter.put("/rate/:idCourse", rateCourse);

module.exports = coursesRouter;
