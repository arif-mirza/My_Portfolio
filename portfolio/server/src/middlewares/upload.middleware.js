const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");
const ApiError = require("../utils/ApiError");

// ── Cloudinary storage engine ─────────────────────────────────
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "portfolio/projects",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
    transformation: [{ width: 1200, height: 800, crop: "limit", quality: "auto" }],
  },
});

// ── File filter ───────────────────────────────────────────────
const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only JPEG, PNG, WebP, and GIF images are allowed."), false);
  }
};

// ── Multer instance ───────────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

module.exports = upload;
