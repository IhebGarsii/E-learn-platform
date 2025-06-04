const express = require("express");
const multer = require("multer");
const path = require("path");
const { createProject ,getProject,likeProject} = require("../controller/projectController");
const projectRouter = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/projects/"); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      // Extract the original file extension
      const ext = path.extname(file.originalname);

      cb(null, file.originalname);
    },
  }),
});
projectRouter.post(
  "/createProject",
  upload.fields([{ name: "images" }]),
  createProject
);
projectRouter.get('/getProject/:projectId',getProject)
projectRouter.put('/likeProject/:projectId', likeProject)

module.exports = projectRouter;
