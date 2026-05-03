const prisma = require("../config/db");
const { z } = require("zod");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const experienceSchema = z.object({
  label: z.string().min(1, "Label is required"),
  title: z.string().min(1, "Title is required"),
  companyName: z.string().min(1, "Company Name is required"),
  companyUrl: z.string().url("Invalid Company URL").optional().or(z.literal("")),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
  order: z.string().or(z.number()).transform(Number).default(0),
});

const { deleteImage } = require("../services/cloudinary.service");

exports.getAllExperiences = async (req, res, next) => {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    res.json(experiences);
  } catch (error) {
    next(error);
  }
};

exports.createExperience = async (req, res, next) => {
  try {
    const validatedData = experienceSchema.parse(req.body);

    let imageUrl = null;
    let imagePublicId = null;

    if (req.file) {
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }

    const experience = await prisma.experience.create({
      data: {
        ...validatedData,
        imageUrl,
        imagePublicId,
      },
    });

    res.status(201).json(experience);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    next(error);
  }
};

exports.updateExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const validatedData = experienceSchema.parse(req.body);

    const existingExp = await prisma.experience.findUnique({ where: { id } });
    if (!existingExp) return res.status(404).json({ message: "Experience not found" });

    let imageUrl = existingExp.imageUrl;
    let imagePublicId = existingExp.imagePublicId;

    if (req.file) {
      if (existingExp.imagePublicId) {
        await deleteImage(existingExp.imagePublicId);
      }
      imageUrl = req.file.path;
      imagePublicId = req.file.filename;
    }

    const updatedExp = await prisma.experience.update({
      where: { id },
      data: {
        ...validatedData,
        imageUrl,
        imagePublicId,
      },
    });

    res.json(updatedExp);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: error.errors[0].message });
    }
    next(error);
  }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingExp = await prisma.experience.findUnique({ where: { id } });
    if (!existingExp) return res.status(404).json({ message: "Experience not found" });

    if (existingExp.imagePublicId) {
      await deleteImage(existingExp.imagePublicId);
    }

    await prisma.experience.delete({ where: { id } });
    res.json({ message: "Experience deleted" });
  } catch (error) {
    next(error);
  }
};
