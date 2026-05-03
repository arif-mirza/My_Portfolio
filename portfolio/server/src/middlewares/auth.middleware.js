const jwt = require("jsonwebtoken");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const prisma = require("../config/db");

/**
 * Protect routes — verifies JWT from Authorization header
 * Sets req.user with the authenticated user record
 */
const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Access denied. No token provided.");
  }

  const token = authHeader.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired token.");
  }

  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: { id: true, name: true, email: true, role: true },
  });

  if (!user) {
    throw new ApiError(401, "User belonging to this token no longer exists.");
  }

  req.user = user;
  next();
});

/**
 * Restrict access to specific roles
 * @param  {...string} roles - Allowed roles
 */
const restrictTo = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError(403, "You do not have permission to perform this action."));
  }
  next();
};

module.exports = { protect, restrictTo };
