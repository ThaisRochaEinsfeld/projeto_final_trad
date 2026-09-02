const express = require("express");

const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const authenticateToken = require("../middleware/authenticateToken");
const requireRole = require("../middleware/requireRole");

const router = express.Router();

router.get("/", authenticateToken, getCategories);

router.get("/:id", authenticateToken, getCategoryById);

router.post(
  "/",
  authenticateToken,
  requireRole("admin"),
  createCategory
);

router.put(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  updateCategory
);

router.delete(
  "/:id",
  authenticateToken,
  requireRole("admin"),
  deleteCategory
);

module.exports = router;