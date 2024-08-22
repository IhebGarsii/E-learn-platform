const cartModel = require("../model/cartModel");
const coursesModel = require("../model/coursesModel");
const cartRouter = require("../Router/cartRouter");
const addToCart = async (req, res) => {
  try {
    const { idUser, idCourse } = req.params;
    const course = await coursesModel.findById(idCourse);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const cartt = await cartModel
      .findOne({ idUser })
      .populate("courses")
      .populate({
        path: "courses.studentsId",
        model: "userModel",
      });
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
    const exist = cartt.courses.find((courseId) => courseId.equals(idCourse));
    console.log(exist, "exeeeeeeeeeeeeeeist");
    if (exist) {
      return res.status(500).json("you already have this course in the cart");
    }
    cartt.quantity++;
    cartt.totalPrice += course.price;
    cartt.courses.push(idCourse);
    await cartt.save();
    console.log("cartt", cartt);
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
    console.log("cart");

    return res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    return res.status(500).error;
  }
};
const removeFromCart = async (req, res) => {
  try {
    const { idCourse, idCart } = req.params;
    const cart = await cartModel.findById(idCart);
    if (!cart) {
      return res.status(404).json("Cart Not Found");
    }

    cart.courses = cart.courses.filter(
      (course) => course.toString() !== idCourse
    );

    cart.quantity = cart.courses.length;
    const course = await coursesModel.findById(idCourse);
    if (course) {
      cart.totalPrice -= course.price;
    }

    await cart.save();
    console.log("cart", cart);
    const cartt = await cartModel.findById(idCart).populate("courses");

    return res.status(201).json(cartt);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while removing the item from the cart.",
    });
  }
};

module.exports = { addToCart, getUserCart, removeFromCart };
