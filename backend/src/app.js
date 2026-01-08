const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const recipesRoutes = require("./routes/recipes.routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

// Middlewares
app.use(helmet());
app.use(cors()); // OK even if you use Vite proxy; keeps you flexible
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Health + root
app.get("/", (req, res) => res.send("Hello World from backend!"));
app.get("/api/health", (req, res) => res.json({ ok: true }));

// API routes
app.use("/api/recipes", recipesRoutes);

// 404 + error handler (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
