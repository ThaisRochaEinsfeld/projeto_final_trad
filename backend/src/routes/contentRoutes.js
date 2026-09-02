const express = require("express");

const {
  createContent,
  getContents,
  getContentById,
  updateContent,
  deleteContent,
} = require("../controllers/contentController");

const authenticateToken = require("../middleware/authenticateToken");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/", authenticateToken, getContents);

router.get("/:id", authenticateToken, getContentById);

router.post(
  "/",
  authenticateToken,
  requireRole("admin"),
  createContent
);

router.put(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  updateContent
);

router.delete(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  deleteContent
);

module.exports = router;