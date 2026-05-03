const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const prisma = require("../config/db");
const ApiError = require("../utils/ApiError");

/**
 * Generate a signed JWT token
 * @param {string} id - User ID
 */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

/**
 * Register a new admin user
 * Restricted to first-time setup (only 1 admin allowed unless SUPER_ADMIN)
 */
const register = async ({ name, email, password }) => {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new ApiError(409, "An account with this email already exists.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role: "ADMIN" },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });

  const token = signToken(user.id);
  return { user, token };
};

/**
 * Login with email + password — returns JWT token
 */
const login = async ({ email, password }) => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = signToken(user.id);

  const { password: _, ...safeUser } = user;
  return { user: safeUser, token };
};

module.exports = { register, login };
