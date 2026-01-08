import { getFakeReviewsService } from "../services/fakeReviewsService.js";
import { Request, Response } from "express";

/* =====================================================
   GET FAKE REVIEWS (Admin)
===================================================== */
/**
 * @route   GET /api/reviews/fake
 * @desc    Get all detected fake reviews
 *
 * @auth    Required (Admin)
 *
 * @success response (200):
 *   - returns array of fake reviews
 *   - populated fields:
 *       - productId → name
 *       - userId    → email
 *
 * @error responses:
 *   - 500 Server error
 */
export const getFakeReviews = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const fakeReviews = await getFakeReviewsService();
    res.json(fakeReviews);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};