const couponModel = require("../model/couponModel");

const getCoupon = async (req, res) => {
  try {
    const { couponName } = req.params;
    const coupon = await couponModel.findOne({ title: couponName });
    if (!coupon) {
      return res.status(404).json(` Your Coupon is Expired or Deosn't Exist`);
    }
    return res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getCoupon };
