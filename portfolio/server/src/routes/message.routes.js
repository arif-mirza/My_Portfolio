const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getAllMessages,
  getMessageById,
  markAsRead,
  deleteMessage,
} = require("../controllers/message.controller");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { createMessageSchema } = require("../schemas/message.schema");

// Public — contact form submission
router.post("/", validate(createMessageSchema), sendMessage);

// Admin only
router.get("/", protect, getAllMessages);
router.get("/:id", protect, getMessageById);
router.patch("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteMessage);

module.exports = router;
