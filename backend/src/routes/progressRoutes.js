const express = require("express");

const {
  getMyProgress,
  updateProgress,
} = require("../controllers/progressController");

const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/", authenticateToken, getMyProgress);

router.put(
  "/:contentId",
  authenticateToken,
  updateProgress
);

module.exports = router;