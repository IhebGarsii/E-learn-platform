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
} = require("../controller/userController");
const userRouer = express.Router();
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

userRouer.post("/register", upload.single("image"), registerInstroctor);
userRouer.put("/updateUser", upload.single("image"), updateUser);
userRouer.put("/updateUserInformation/:idUser", updateUserInformation);
userRouer.post("/login", login);
userRouer.get("/getStutent", getStutent);
userRouer.get("/getUserById/:idUser", getUserById);
userRouer.get("/getAllInstroctor", getAllInstroctor);
userRouer.get("/getAllStutent", getAllStutent);
userRouer.get("/getInstroctor", getInstroctor);
userRouer.delete("/deleteAcount/:idUser", deleteAcount);
userRouer.delete("/deleteAcountByAdmin/:idUser/:idBlock", deleteAcountByAdmin);

module.exports = userRouer;
