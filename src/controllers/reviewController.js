import { addReviewService, getReviewsByProductService, deleteReviewService, } from "../services/reviewService.js";
/* =====================================================
   ADD REVIEW
===================================================== */
/**
 * @route   POST /api/reviews
 * @desc    Add a review to a product (detects fake via IP)
 *
 * @required body:
 *   - productId (string) Product ID
 *   - rating    (number) Rating value (1–5)
 *   - review    (string) Review text
 *
 * @auth    Required (JWT)
 *
 * @success response (201):
 *   - returns created review object
 *
 * @error responses:
 *   - 400 Missing fields or invalid rating
 *   - 500 Failed to add review
 */
export const addReview = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const review = await addReviewService(req.body, req.user, req);
        res.status(201).json(review);
    }
    catch (error) {
        const err = error;
        console.error("Add review error:", error);
        res.status(400).json({ message: err.message });
    }
};
/* =====================================================
   GET REVIEWS BY PRODUCT (User-facing)
===================================================== */
/**
 * @route   GET /api/reviews/:productId
 * @desc    Get all reviews for a product
 *
 * @required params:
 *   - productId (string) Product ID
 *
 * @success response (200):
 *   - returns array of reviews
 *
 * @error responses:
 *   - 500 Failed to fetch reviews
 */
export const getReviewsByProduct = async (req, res) => {
    try {
        const reviews = await getReviewsByProductService(req.params.productId);
        res.status(200).json(reviews);
    }
    catch (error) {
        const err = error;
        console.error("Get reviews error:", error);
        res.status(500).json({ message: "Failed to fetch reviews" });
    }
};
/* =====================================================
   DELETE REVIEW (Admin – Soft Delete)
===================================================== */
/**
 * @route   DELETE /api/reviews/:id
 * @desc    Soft delete a review (Admin only)
 *
 * @required params:
 *   - id (string) Review ID
 *
 * @auth    Required (Admin)
 *
 * @success response (200):
 *   - { message: "Review deleted successfully" }
 *
 * @error responses:
 *   - 404 Review not found
 *   - 400 Invalid request
 */
export const deleteReview = async (req, res) => {
    try {
        await deleteReviewService(req.params.id);
        res.json({ message: "Review deleted successfully" });
    }
    catch (error) {
        const err = error;
        console.error("Delete review error:", error);
        res.status(err.message === "Review not found" ? 404 : 400).json({ message: err.message });
    }
};
