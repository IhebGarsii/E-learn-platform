const express = require("express");
const paymentHistoryRouter = express.Router();
const { addNewPayment } = require("../controller/paymentHistoryController");
const multer = require("multer");
const upload = multer();
paymentHistoryRouter.post("/addNewPayment", upload.none(), addNewPayment);
module.exports = paymentHistoryRouter;
