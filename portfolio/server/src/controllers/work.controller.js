const prisma = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

// ── GET /api/works  (Public) ──────────────────────────────────
const getAllWorks = asyncHandler(async (_req, res) => {
  const works = await prisma.work.findMany({
    orderBy: [{ order: "asc" }, { createdAt: "desc" }],
  });
  res.status(200).json(new ApiResponse(200, works, "Works fetched successfully."));
});

// ── GET /api/works/:id  (Public) ─────────────────────────────
const getWorkById = asyncHandler(async (req, res) => {
  const work = await prisma.work.findUnique({ where: { id: req.params.id } });
  if (!work) throw new ApiError(404, "Work not found.");
  res.status(200).json(new ApiResponse(200, work));
});

// ── POST /api/works  (Admin) ──────────────────────────────────
const createWork = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (data.order !== undefined) data.order = parseInt(data.order, 10);

  const work = await prisma.work.create({ data });
  res.status(201).json(new ApiResponse(201, work, "Work created successfully."));
});

// ── PUT /api/works/:id  (Admin) ───────────────────────────────
const updateWork = asyncHandler(async (req, res) => {
  const existing = await prisma.work.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Work not found.");

  const data = { ...req.body };
  if (data.order !== undefined) data.order = parseInt(data.order, 10);

  const work = await prisma.work.update({ where: { id: req.params.id }, data });
  res.status(200).json(new ApiResponse(200, work, "Work updated successfully."));
});

// ── DELETE /api/works/:id  (Admin) ───────────────────────────
const deleteWork = asyncHandler(async (req, res) => {
  const existing = await prisma.work.findUnique({ where: { id: req.params.id } });
  if (!existing) throw new ApiError(404, "Work not found.");

  await prisma.work.delete({ where: { id: req.params.id } });
  res.status(200).json(new ApiResponse(200, null, "Work deleted successfully."));
});

module.exports = { getAllWorks, getWorkById, createWork, updateWork, deleteWork };
