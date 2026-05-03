const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");
const { protect } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const validate = require("../middlewares/validate.middleware");
const { createProjectSchema, updateProjectSchema } = require("../schemas/project.schema");

// Public
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Admin only
router.post("/", protect, upload.single("image"), validate(createProjectSchema), createProject);
router.put("/:id", protect, upload.single("image"), validate(updateProjectSchema), updateProject);
router.delete("/:id", protect, deleteProject);

module.exports = router;
