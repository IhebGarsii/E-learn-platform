const express = require("express");
const { deleteVideo } = require("../controller/videoController");

const videoRouter = express.Router();

videoRouter.delete("/deleteVideo/:idVideos/:idSection/:idVideo", deleteVideo);

module.exports = videoRouter;
