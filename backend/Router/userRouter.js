const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  registerInstroctor,
  registerStudent,
  updateUserInformation,
  login,
  getAllInstroctor,
  getAllStutent,
  getInstroctor,
  getStutent,
  deleteAcount,
  deleteAcountByAdmin,
  getUserById,
  updateUser,
  manageRate,
  getOnlineUsers,
  updateUserPhoto,
  getStudentCourses,
} = require("../controller/userController");
const userRouter = express.Router();
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/users/"); // Directory to store uploaded files
    },
    filename: (req, file, cb) => {
      // Extract the original file extension
      const ext = path.extname(file.originalname);

      cb(null, file.originalname);
    },
  }),
});

userRouter.post("/register", upload.single("image"), registerInstroctor);
userRouter.put("/updateUser", upload.single("image"), updateUser);
userRouter.put("/updateUserInformation/:idUser", updateUserInformation);
userRouter.post("/login", login);
userRouter.get("/getStutent", getStutent);
userRouter.get("/getUserById/:idUser", getUserById);
userRouter.get("/getAllInstroctor", getAllInstroctor);
userRouter.get("/getAllStutent", getAllStutent);
userRouter.get("/getInstroctor", getInstroctor);
userRouter.delete("/deleteAcount/:idUser", deleteAcount);
userRouter.delete("/deleteAcountByAdmin/:idUser/:idBlock", deleteAcountByAdmin);
userRouter.put("/manageRate/:idUser", manageRate);
userRouter.post("/getOnlineUsers", getOnlineUsers);
userRouter.post("/updateUserPhoto/:idUser", upload.single("image"), updateUserPhoto);
userRouter.get("/getStudentCourses/:idUser", getStudentCourses);

module.exports = userRouter;
