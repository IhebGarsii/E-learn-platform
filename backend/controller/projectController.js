const projectModel = require("../model/projectModel");
const userModel = require("../model/userModel");

const createProject = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.idUser);
    if (!user) {
      return res.status(404).json("User Not Found");
    }
    const images = req.files["images"]
      ? req.files["images"].map((file) => file.originalname)
      : [];
    const project = await projectModel.create({
      ...req.body,
      images,
    });
    user.projects.push(project._id);
    await user.save();
    return res.status(201).json(project);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { createProject };
