const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userStatsModel = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },

  // 💰 Spending behavior
  totalSpent: { type: Number, default: 0 },
  avgOrderValue: { type: Number, default: 0 },

  // 📚 Purchase behavior
  totalCoursesBought: { type: Number, default: 0 },
  lastPurchaseAt: Date,

  // 🎯 Interests
  favoriteCategories: [
    {
      category: String,
      count: Number,
    },
  ],

  favoriteTags: [
    {
      tag: String,
      count: Number,
    },
  ],
});

module.export = mongoose.Model("userStatsModel", userStatsModel);
