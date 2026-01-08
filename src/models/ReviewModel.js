import mongoose, { Schema } from "mongoose";
/* --------------------------
  Schema definition
--------------------------- */
const reviewSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    userIp: {
        type: String
    },
    review: {
        type: String,
        required: true
    },
    ipAddress: {
        type: String
    },
    isFake: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, {
    timestamps: { createdAt: true, updatedAt: false }
});
/* --------------------------
  Export typed model
--------------------------- */
const Review = mongoose.model("Review", reviewSchema);
export default Review;
