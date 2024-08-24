const express = require("express");
const { getCoupon } = require("../controller/couponController");
const couponRouer = express.Router();

couponRouer.get("/getCoupon/:couponName", getCoupon);

module.exports = couponRouer;
