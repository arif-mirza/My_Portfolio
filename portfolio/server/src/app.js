require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");
const ApiError = require("./utils/ApiError");

const app = express();

// ── Security ──────────────────────────────────────────────────
app.use(helmet());

// ── CORS ──────────────────────────────────────────────────────
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body Parser ───────────────────────────────────────────────
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ── Logger ────────────────────────────────────────────────────
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ── API Routes ────────────────────────────────────────────────
app.use("/api", routes);

// ── 404 Handler ───────────────────────────────────────────────
app.all("*", (req, _res, next) => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found.`));
});

// ── Global Error Handler ──────────────────────────────────────
app.use(errorHandler);

module.exports = app;
