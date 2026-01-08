import mongoose, { Document, Schema, Model } from "mongoose";

/* --------------------------
  TypeScript interface for Review
--------------------------- */
export interface IReview extends Document {
  productId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userIp?: string;
  review: string;
  ipAddress?: string;
  isFake: boolean;
  rating?: number;
  deletedAt?: Date | null;
  createdAt: Date;
}

/* --------------------------
  Schema definition
--------------------------- */
const reviewSchema = new Schema<IReview>(
  {
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
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

/* --------------------------
  Export typed model
--------------------------- */
const Review: Model<IReview> = mongoose.model<IReview>("Review", reviewSchema);

export default Review;
