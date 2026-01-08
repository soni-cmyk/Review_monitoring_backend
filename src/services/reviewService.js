import Review from "../models/ReviewModel.js";
import TrackedIP from "../models/TrackedIPModel.js";
/* =====================================================
   ADD REVIEW (Detect fake via IP + product)
===================================================== */
export const addReviewService = async (data, user, req) => {
    const { productId, rating, review } = data;
    const userId = user.userId;
    if (!productId || !rating || !review) {
        throw new Error("All fields are required");
    }
    if (rating < 1 || rating > 5) {
        throw new Error("Rating must be between 1 and 5");
    }
    // Extract real IP address
    const ipAddress = (req.headers["x-forwarded-for"] ||
        req.socket.remoteAddress ||
        "")
        .split(",")[0]
        .trim();
    // Check duplicate review by same IP + product
    const existing = await Review.findOne({
        productId,
        ipAddress,
        deletedAt: null,
    });
    const isFake = Boolean(existing);
    const newReview = await Review.create({
        productId,
        userId,
        rating,
        review,
        ipAddress,
        isFake,
    });
    // Track fake IP
    if (isFake) {
        const tracked = await TrackedIP.findOne({ ipAddress });
        if (tracked) {
            tracked.fakeCount += 1;
            if (tracked.fakeCount >= 3) {
                tracked.isBlocked = true;
            }
            await tracked.save();
        }
        else {
            await TrackedIP.create({ ipAddress, fakeCount: 1 });
        }
    }
    return newReview;
};
/* =====================================================
   GET REVIEWS BY PRODUCT
===================================================== */
export const getReviewsByProductService = async (productId) => {
    return await Review.find({
        productId,
        deletedAt: null,
    })
        .populate("userId")
        .sort({ createdAt: -1 });
};
/* =====================================================
   DELETE REVIEW (Soft Delete)
===================================================== */
export const deleteReviewService = async (id) => {
    const review = await Review.findById(id);
    if (!review || review.deletedAt) {
        throw new Error("Review not found");
    }
    review.deletedAt = new Date();
    await review.save();
};
