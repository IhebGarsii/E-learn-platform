const cartModel = require("../model/cartModel");
const coursesModel = require("../model/coursesModel");
const addToCart = async (req, res) => {
  try {
    const { idUser, idCourse } = req.params;
    const course = await coursesModel.findById(idCourse);
    console.log(course);

    if (!course) {
      console.log(idCourse);
      return res.status(404).json({ message: "Course not found" });
    }

    const cartt = await cartModel.findOne({ idUser });
    console.log(cartt, "cartt");

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
    const cart = await cartModel.findOne({ idUser }).populate("courses");
    console.log(cart);

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
