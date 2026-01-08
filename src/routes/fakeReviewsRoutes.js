import { Router } from "express";
import { getFakeReviews } from "../controllers/fakeReviewsController.js";
import { adminOnly } from "../middleware/adminsOnlyMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
const router = Router();
router.get("/fake-reviews", protect, adminOnly, getFakeReviews);
export default router;
