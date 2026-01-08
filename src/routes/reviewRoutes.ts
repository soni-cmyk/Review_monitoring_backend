import express from "express";
import {
  addReview,
  deleteReview, 
  getReviewsByProduct
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";
import {adminOnly} from "../middleware/adminsOnlyMiddleware.js";

const router = express.Router();

// User adds review
router.get("/:productId",protect, getReviewsByProduct)
router.post("/", protect, addReview);

// Admin deletes fake review
router.delete("/:id", protect, adminOnly, deleteReview);
export default router;
