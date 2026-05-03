const express = require("express");
const router = express.Router();
const { registerAdmin, loginAdmin, getMe } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const { loginSchema, registerSchema } = require("../schemas/auth.schema");

router.post("/register", validate(registerSchema), registerAdmin);
router.post("/login", validate(loginSchema), loginAdmin);
router.get("/me", protect, getMe);

module.exports = router;
