const express = require("express");

const { register, login } = require("../controllers/authController");
const authenticateToken = require("../middleware/authenticateToken");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.post(
  "/register",
  authenticateToken,
  requireRole("admin"),
  register
);

router.post("/login", login);

module.exports = router;    