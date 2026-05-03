const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experience.controller");

const router = express.Router();

router.get("/", getAllExperiences);
router.post("/", protect, upload.single("image"), createExperience);
router.put("/:id", protect, upload.single("image"), updateExperience);
router.delete("/:id", protect, deleteExperience);

module.exports = router;
