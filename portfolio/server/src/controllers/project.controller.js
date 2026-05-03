const prisma = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const { deleteImage } = require("../services/cloudinary.service");

// ── GET /api/projects  (Public) ───────────────────────────────
const getAllProjects = asyncHandler(async (req, res) => {
  const { type, featured } = req.query;

  const where = {};
  if (type) where.type = type.toUpperCase();
  if (featured !== undefined) where.featured = featured === "true";

  const projects = await prisma.project.findMany({
    where,
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });

  res.status(200).json(new ApiResponse(200, projects, "Projects fetched successfully."));
});

// ── GET /api/projects/:id  (Public) ──────────────────────────
const getProjectById = asyncHandler(async (req, res) => {
  const project = await prisma.project.findUnique({
    where: { id: req.params.id },
  });

  if (!project) throw new ApiError(404, "Project not found.");

  res.status(200).json(new ApiResponse(200, project));
});

// ── POST /api/projects  (Admin) ───────────────────────────────
const createProject = asyncHandler(async (req, res) => {
  const data = { ...req.body };

  if (req.file) {
    data.imageUrl = req.file.path;
    data.imagePublicId = req.file.filename;
  }

  // Coerce types from multipart
  if (data.featured !== undefined) data.featured = data.featured === "true" || data.featured === true;
  if (data.order !== undefined) data.order = parseInt(data.order, 10);

  const project = await prisma.project.create({ data });

  res.status(201).json(new ApiResponse(201, project, "Project created successfully."));
});

// ── PUT /api/projects/:id  (Admin) ───────────────────────────
const updateProject = asyncHandler(async (req, res) => {
  const existing = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Project not found.");

  const data = { ...req.body };

  if (req.file) {
    // Delete old image from Cloudinary
    await deleteImage(existing.imagePublicId);
    data.imageUrl = req.file.path;
    data.imagePublicId = req.file.filename;
  }

  if (data.featured !== undefined) data.featured = data.featured === "true" || data.featured === true;
  if (data.order !== undefined) data.order = parseInt(data.order, 10);

  const project = await prisma.project.update({
    where: { id: req.params.id },
    data,
  });

  res.status(200).json(new ApiResponse(200, project, "Project updated successfully."));
});

// ── DELETE /api/projects/:id  (Admin) ────────────────────────
const deleteProject = asyncHandler(async (req, res) => {
  const existing = await prisma.project.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Project not found.");

  await deleteImage(existing.imagePublicId);
  await prisma.project.delete({ where: { id: req.params.id } });

  res.status(200).json(new ApiResponse(200, null, "Project deleted successfully."));
});

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
};
