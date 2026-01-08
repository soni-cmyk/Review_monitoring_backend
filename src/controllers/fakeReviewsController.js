import { getFakeReviewsService } from "../services/fakeReviewsService.js";
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
export const getFakeReviews = async (req, res) => {
    try {
        const fakeReviews = await getFakeReviewsService();
        res.json(fakeReviews);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
};
