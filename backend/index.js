import cors from "cors";
import dotenv from "dotenv";
import express from "express";

// Database
import { mongoClient } from "./libs/db.js";

// Routes
import courseRouter from "./routes/course.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Connect to MongoDB


app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Welcome to ChaiCode API ☕️",
  });
});

app.use("/api/v1/courses", courseRouter);

app.listen(8080, '0.0.0.0', () => {
  console.log("Backend server running at http://0.0.0.0:8080");
});
