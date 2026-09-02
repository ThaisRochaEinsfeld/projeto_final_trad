const express = require("express");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

const authenticateToken = require("./middleware/authenticateToken");
const requireRole = require("./middleware/requireRole");
const cors = require("cors");
const contentRoutes = require("./routes/contentRoutes");


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

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

app.use("/contents", contentRoutes);

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