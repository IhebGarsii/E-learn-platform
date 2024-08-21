const cartModel = require("../model/cartModel");
const coursesModel = require("../model/coursesModel");
const addToCart = async (req, res) => {
  try {
    const { idUser, idCourse } = req.params;
    const course = await coursesModel.findById(idCourse);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    const cartt = await cartModel.findOne({ idUser });

    if (!cartt) {
      console.log("!cartt");
      const cart = await cartModel.create({
        courses: idCourse,
        quantity: 1,
        totalPrice: course.price,
        idUser,
      });
      return res.status(201).json(cart);
    }
    console.log("cart");
    const exist = cartt.courses.find((courseId) => courseId.equals(idCourse));
    if (exist) {
      return res.status(301).json("you already have this course in the cart");
    }
    console.log(exist, "exist");
    cartt.quantity++;
    cartt.totalPrice += course.price;
    cartt.courses.push(idCourse);
    await cartt.save();
    return res.status(201).json(cartt);
  } catch (error) {
    console.log(error);
    return res.status(500).error;
  }
};
const getUserCart = async (req, res) => {
  try {
    const { idUser } = req.params;
    const cart = await cartModel
      .findOne({ idUser })
      .populate("courses")
      .populate({
        path: "courses",
        populate: {
          path: "instructorId", // Path to populate user in comments
          model: "userModel", // Model to populate from
        },
      });

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).error;
  }
};
const remouveFromCart = async (req, res) => {
  try {
    const { idUser, idCourse } = req.params;
    const cart = await cartModel.findOne({ idUser });
    cart.courses.filter((courses) => courses === idCourse);
    if (!cart) {
      return res.status(404).json("Cart Not Found");
    }
    return res.status(201).json(cart);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addToCart, getUserCart };
