const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { register, login } = require("../services/auth.service");

// POST /api/auth/register
const registerAdmin = asyncHandler(async (req, res) => {
  const { user, token } = await register(req.body);
  res.status(201).json(new ApiResponse(201, { user, token }, "Admin registered successfully."));
});

// POST /api/auth/login
const loginAdmin = asyncHandler(async (req, res) => {
  const { user, token } = await login(req.body);
  res.status(200).json(new ApiResponse(200, { user, token }, "Login successful."));
});

// GET /api/auth/me  (protected)
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "Authenticated user."));
});

module.exports = { registerAdmin, loginAdmin, getMe };
