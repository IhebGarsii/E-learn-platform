const express = require("express");
const paymentHistoryRouter = express.Router();
const { addNewPayment } = require("../controller/paymentHistoryController");

paymentHistoryRouter.post("/addNewPayment", addNewPayment);
module.exports = paymentHistoryRouter;
