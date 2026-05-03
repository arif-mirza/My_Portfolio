const { z } = require("zod");

const createProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  tech: z.string().min(2, "Tech stack is required"),
  githubUrl: z.string().url("Invalid GitHub URL").optional().or(z.literal("")),
  liveUrl: z.string().url("Invalid live URL").optional().or(z.literal("")),
  featured: z
    .union([z.boolean(), z.string()])
    .transform((v) => v === true || v === "true")
    .optional(),
  type: z.enum(["FEATURED", "OTHER"]).optional(),
  order: z.coerce.number().int().min(0).optional(),
});

const updateProjectSchema = createProjectSchema.partial();

module.exports = { createProjectSchema, updateProjectSchema };
