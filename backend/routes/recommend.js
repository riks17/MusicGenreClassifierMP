import express from "express";
import { getRecommendations } from "../controllers/recommend.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/recommend
router.post("/", protect, getRecommendations);

export default router;
