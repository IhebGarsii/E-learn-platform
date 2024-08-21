const express = require("express");
const {
  getUserCart,
  addToCart,
  removeFromCart,
} = require("../controller/cartController");


const cartRouter = express.Router();

cartRouter.get("/getUserCart/:idUser", getUserCart);
cartRouter.get("/addToCart/:idUser/:idCourse", addToCart);
cartRouter.delete("/removeFromCart/:idCart/:idCourse", removeFromCart);

module.exports = cartRouter;
