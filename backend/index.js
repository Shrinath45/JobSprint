
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import messageRoutes from "./routes/message.routes.js";
import savedJobRoutes from "./routes/savedJob.route.js"; // ✅ New route for saved jobs

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/messages", messageRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.get("/", (req, res) => {
    res.send("🚀 Job Portal Backend is Running Successfully");
}); // ✅ Save for later jobs route

// Connect to DB and start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server running at port ${PORT}`);
});
