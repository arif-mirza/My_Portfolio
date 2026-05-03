const { z } = require("zod");

const createMessageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().optional(),
  body: z.string().min(10, "Message must be at least 10 characters"),
});

module.exports = { createMessageSchema };
