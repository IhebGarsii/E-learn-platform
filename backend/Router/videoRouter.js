const express = require("express");
const { deleteVideo,addVideo } = require("../controller/videoController");

const videoRouter = express.Router();

videoRouter.delete("/deleteVideo/:idVideos/:idSection/:idVideo", deleteVideo);
videoRouter.put("/addVideo/:idVideos/:idSection/:idVideo", addVideo);

module.exports = videoRouter;
