const express = require("express");
const router = express.Router();
const {
  getAllWorks,
  getWorkById,
  createWork,
  updateWork,
  deleteWork,
} = require("../controllers/work.controller");
const { protect } = require("../middlewares/auth.middleware");

// Public
router.get("/", getAllWorks);
router.get("/:id", getWorkById);

// Admin only
router.post("/", protect, createWork);
router.put("/:id", protect, updateWork);
router.delete("/:id", protect, deleteWork);

module.exports = router;
