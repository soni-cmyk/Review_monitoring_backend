import mongoose, { Schema, Document } from "mongoose";

export interface IBanner extends Document {
  imageUrl: string;
  title: string;
  link?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  isActive: boolean;
  createdAt: Date;
}

const bannerSchema = new Schema<IBanner>(
  {
    imageUrl: { type: String, required: true },
    title: { type: String, required: true },
    link: { type: String },
    description: { type: String },
    buttonText: { type: String },
    buttonLink: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Banner = mongoose.model<IBanner>("Banner", bannerSchema);

export default Banner;
