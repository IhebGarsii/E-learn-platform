const { sign } = require("jsonwebtoken");
const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { downloadGoogleImage } = require("../utl/downloadUserImage");
const path = require("path");

const createToken = (id) => {
  return sign({ id }, process.env.SECRET, { expiresIn: "3d" });
};

const registerInstroctor = async (req, res) => {
  try {
    const user = await userModel.find({ email: req.body.email });
    if (user.length > 0) {
      return res.status(300).json("email is used");
    }

    let image;
    if (req.file) {
      image = req.file.originalname;
    } else {
      image = "defaultAvatar.jpg";
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    const newUser = await userModel.create({
      ...req.body,
      password: hash,
      image,
    });
    const token = createToken(newUser._id);
    if (newUser) {
      return res.status(201).json({ newUser, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

/* const login = async (req, res) => {
  try {
    if (req.body.google) {
      const { email, role } = req.body;
      const user = await userModel.findOne({ email });

      // if user does not exist in the data base we create a new user
      if (user === null || user.length === 0) {
        const newUser = req.body.user;

        const randomPassword = Math.random().toString(36).slice(-8);
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(randomPassword, salt);
        const imageUrl = newUser.picture;
        const decodedUrl = decodeURIComponent(imageUrl);
        const originalName = path.basename(decodedUrl); // "Untitled design (1).png"
        const uniqueName = `${Date.now()}-${originalName}`;
        try {
          savedImage = await downloadGoogleImage(newUser.picture, uniqueName);
          console.log("Image downloaded successfully:", savedImage);
        } catch (downloadErr) {
          console.warn("Image download failed. Using default image.");
          console.error("Download error:", downloadErr); // <- log full error
        }

        const user = await userModel.create({
          firstName: newUser.given_name,
          lastName: newUser.family_name,
          email: newUser.email,
          password: hash,
          image: savedImage,
          role,
        });
        const token = createToken(user._id);
        console.log("New user created:", user);

        return res.status(200).json({ user, token });
      }

      const token = createToken(user._id);
      return res.status(200).json({ user, token });
    } else {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      await user.save();
      if (!user) {
        return res.status(404).json("Email or Password Incorrectt");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(404).json("Email or Password Incorrect");
      }
      token = createToken(user._id);
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}; */
const login = async (req, res) => {
  try {
    if (req.body.google) {
      const { email } = req.body;
      const user = await userModel.findOne({ email });

      // if user does not exist in the data base we create a new user
      if (user === null || user.length === 0) {
        return res.status(404).json("User does'nt Exist");
      }

      const token = createToken(user._id);
      return res.status(200).json({ user, token });
    } else {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });

      await user.save();
      if (!user) {
        return res.status(404).json("Email or Password Incorrectt");
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return res.status(404).json("Email or Password Incorrect");
      }
      token = createToken(user._id);
      return res.status(200).json({ user, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.body._id, req.body);

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    if (req.file) {
      user.image = req.file.originalname;
    }
    user.password = hash;
    await user.save();
    const token = createToken(user._id);
    if (user) {
      return res.status(201).json({ user, token });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};
const manageRate = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userModel.findById(idUser);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    user.avgRate.rate += 1;
    user.avgRate.nbRate += 1;
    user.avgRate.displayRate = user.avgRate.rate / user.avgRate.nbRate;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.log("rating error", error);
    return res.status(500).json(error);
  }
};
const registerStudent = async (req, res) => {};

const getAllStutent = async (req, res) => {
  try {
    const studends = await userModel.find({ role: "STUDENT" });
    if (!student) {
      return res.status(404).json("No Student Were Found");
    }
    return res.status(200).json(studends);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userModel
      .findById(idUser)
      .populate("courses")
      .populate("projects");
    if (!user) {
      return res.status(404).json("No user Were Found");
    }
    console.log(user, "user");

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
const updateUserInformation = async (req, res) => {
  try {
    const { idUser } = req.params;
    if (!idUser) {
      return res.status(404).json("id Not with data");
    }
    const user = await userModel.findByIdAndUpdate(
      idUser, // The ID of the user to update
      { $set: req.body }, // Update the fields based on request body
      { new: true } // Return the updated document
    );
    return res.status(202).json(user);
  } catch (error) {
    console.log(error);

    return res.status(500).json(error);
  }
};

const getAllInstroctor = async (req, res) => {
  try {
    const instractor = await userModel.find({ role: "INSTRACTOR" });
    if (!instractor) {
      return res.status(404).json("No Instractor Were Found");
    }
    return res.status(200).json(instractor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getStutent = async (req, res) => {
  try {
    const { idUser } = req.params;
    const student = await userModel.findById(idUser);
    if (!student) {
      return res.status(404).json("No student B This ID Were Found");
    }
    return res.status(200).json(student);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const getInstroctor = async (req, res) => {
  try {
    const { idUser } = req.params;
    const instractor = await userModel.findById(idUser);
    if (!instractor) {
      return res.status(404).json("No Instractor B This ID Were Found");
    }
    return res.status(200).json(instractor);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
};

const deleteAcount = async (req, res) => {
  try {
    const { idUser } = req.params;
    const user = await userModel.findByIdAndDelete(idUser);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
const deleteAcountByAdmin = async (req, res) => {
  try {
    const { idBlock, idUser } = req.params;
    const admin = await userModel.findById(idUser);
    if (admin.role !== "admin") {
      return res.status(404).json("You're Not an ADMIN ");
    }
    const user = await userModel.findByIdAndDelete(idBlock);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message);
  }
};
const getOnlineUsers = async (req, res) => {
  try {
    const { idList } = req.body;
    console.log(idList, "idList");

    if (!Array.isArray(idList)) {
      return res.status(400).json({ message: "ids must be an array" });
    }

    const users = await userModel.find({ _id: { $in: idList } }); // select only needed fields
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
const updateUserPhoto = async (req, res) => {
  try {
    const { idUser } = req.params;
    const image = req.file.originalname;
    console.log(image, "image");
    const user = await userModel.findByIdAndUpdate(
      idUser,
      { image },
      { new: true }
    );
    console.log(user, "user");
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  updateUser,
  registerInstroctor,
  registerStudent,
  login,
  getAllInstroctor,
  getAllStutent,
  getInstroctor,
  getStutent,
  deleteAcount,
  deleteAcountByAdmin,
  getUserById,
  updateUserInformation,
  manageRate,
  getOnlineUsers,
  updateUserPhoto,
};
