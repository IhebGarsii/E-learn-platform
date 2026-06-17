const express = require("express");
const router = express.Router();
const {
  getRecommendationsForUser,
} = require("../controller/recommendationController");

// GET /recommendations/:userId
router.get("/:userId", getRecommendationsForUser);

module.exports = router;
