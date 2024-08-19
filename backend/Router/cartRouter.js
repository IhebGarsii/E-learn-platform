const express = require("express");
const { getUserCart, addToCart } = require("../controller/cartController");
const { model } = require("mongoose");

const cartRouter = express.Router();

cartRouter.get("/getUserCart/:idUser", getUserCart);
cartRouter.get("/addToCart/:idUser/:idCourse", addToCart);

module.exports = cartRouter;
