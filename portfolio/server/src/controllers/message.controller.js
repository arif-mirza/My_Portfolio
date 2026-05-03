const prisma = require("../config/db");
const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

// ── POST /api/messages  (Public — contact form) ───────────────
const sendMessage = asyncHandler(async (req, res) => {
  const { name, email, subject, body } = req.body;

  const message = await prisma.message.create({
    data: { name, email, subject, body },
  });

  res.status(201).json(
    new ApiResponse(201, message, "Message sent successfully. I'll get back to you soon!")
  );
});

// ── GET /api/messages  (Admin) ────────────────────────────────
const getAllMessages = asyncHandler(async (req, res) => {
  const { unread } = req.query;
  const where = {};
  if (unread === "true") where.isRead = false;

  const messages = await prisma.message.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });

  const unreadCount = await prisma.message.count({ where: { isRead: false } });

  res.status(200).json(
    new ApiResponse(200, { messages, unreadCount }, "Messages fetched successfully.")
  );
});

// ── GET /api/messages/:id  (Admin) ───────────────────────────
const getMessageById = asyncHandler(async (req, res) => {
  const message = await prisma.message.findUnique({ where: { id: req.params.id } });
  if (!message) throw new ApiError(404, "Message not found.");
  res.status(200).json(new ApiResponse(200, message));
});

// ── PATCH /api/messages/:id/read  (Admin) ────────────────────
const markAsRead = asyncHandler(async (req, res) => {
  const message = await prisma.message.findUnique({ where: { id: req.params.id } });
  if (!message) throw new ApiError(404, "Message not found.");

  const updated = await prisma.message.update({
    where: { id: req.params.id },
    data: { isRead: true },
  });

  res.status(200).json(new ApiResponse(200, updated, "Message marked as read."));
});

// ── DELETE /api/messages/:id  (Admin) ────────────────────────
const deleteMessage = asyncHandler(async (req, res) => {
  const message = await prisma.message.findUnique({ where: { id: req.params.id } });
  if (!message) throw new ApiError(404, "Message not found.");

  await prisma.message.delete({ where: { id: req.params.id } });
  res.status(200).json(new ApiResponse(200, null, "Message deleted."));
});

module.exports = {
  sendMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
};
