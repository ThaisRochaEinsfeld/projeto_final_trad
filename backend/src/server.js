const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

const authenticateToken = require("./middleware/authenticateToken");
const requireRole = require("./middleware/requireRole");

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Onboarding API is running" });
});

app.use("/auth", authRoutes);

app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: "Authenticated user",
    user: req.user,
  });
});

app.get(
  "/admin",
  authenticateToken,
  requireRole("admin"),
  (req, res) => {
    res.json({
      message: "Welcome admin",
    });
  }
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});