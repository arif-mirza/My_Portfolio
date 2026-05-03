const ApiError = require("../utils/ApiError");

/**
 * Global Express error handler — must be the last middleware
 * Catches all errors forwarded via next(err)
 */
const errorHandler = (err, req, res, _next) => {
  let error = { ...err };
  error.message = err.message;

  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.error("❌ Error:", err);
  }

  // Prisma: record not found
  if (err.code === "P2025") {
    error = new ApiError(404, "Resource not found.");
  }

  // Prisma: unique constraint violation
  if (err.code === "P2002") {
    const field = err.meta?.target?.join(", ") || "field";
    error = new ApiError(409, `Duplicate value for: ${field}`);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token.");
  }
  if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token expired. Please log in again.");
  }

  // Multer file size error
  if (err.code === "LIMIT_FILE_SIZE") {
    error = new ApiError(400, "File too large. Maximum size is 5MB.");
  }

  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: error.errors || [],
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
