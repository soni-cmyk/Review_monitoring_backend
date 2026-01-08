import Review from "../models/ReviewModel.js";
/* =====================================================
   GET FAKE REVIEWS
===================================================== */
export const getFakeReviewsService = async () => {
    return await Review.find({
        isFake: true,
        deletedAt: null,
    })
        .populate("productId", "name")
        .populate("userId", "email")
        .exec();
};
