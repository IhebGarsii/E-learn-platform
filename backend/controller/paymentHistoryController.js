const paymentHistoryModel = require("../model/paymentHistoryModel");
const getPaymentHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userHistory = await paymentHistoryModel
      .find({
        userId,
        paymentStatus: "paid",
      })
      .sort({ purchasedAt: -1 });

    if (!userHistory.length) {
      return res.status(404).json({ message: "No payment history found" });
    }
    return res.status(200).json(userHistory);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addNewPayment = async (req, res) => {
  try {
    console.log(req.body, "addNewPayment");
    const newPayment = await paymentHistoryModel.create({
      userId,
      courseIds,
      totalAmount,
      currency: "dinar",
      paymentStatus: "paid", // only after success
      paymentMethod,
      purchasedAt: new Date(),
    });
    if (!newPayment) {
      return res.status(400).json("couldn t create the payment");
    }
    await newPayment.save();
    return res.status(201).json("payment is created");
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const calculateStat = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = {
  getPaymentHistoryByUser,
  addNewPayment,
};
