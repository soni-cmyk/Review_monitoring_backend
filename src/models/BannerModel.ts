import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  imageUrl: string;
  title: string;
  link?: string;
  isActive: boolean;
  createdAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.model<IBanner>("Banner", bannerSchema);

export default Banner;
