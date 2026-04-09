import express from "express";
import { saveJob, getSavedJobsByUser, removeSavedJob } from "../controllers/savedJob.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

// ✅ FIXED ROUTES
router.post("/", isAuthenticated, saveJob);        // Save job
router.get("/", isAuthenticated, getSavedJobsByUser); // Get saved jobs (NO userId param)
router.delete("/:id", isAuthenticated, removeSavedJob); // Remove saved job

export default router;