const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const projectRoutes = require("./project.routes");
const workRoutes = require("./work.routes");
const messageRoutes = require("./message.routes");
const experienceRoutes = require("./experience.routes");

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/works", workRoutes);
router.use("/messages", messageRoutes);
router.use("/experience", experienceRoutes);

// Health check
router.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});

module.exports = router;
