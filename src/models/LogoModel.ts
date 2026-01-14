import mongoose, { Schema, Document } from "mongoose";

export interface ILogo extends Document {
  link?: string;

  /* Logo upload fields */
  logoUrl: string;          // Required
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
  logoFileName?: string;
  logoMimeType?: string;
  logoSize?: number;
  logoPublicId?: string;

  /* Status */
  isActive: boolean;
}

const logoSchema = new Schema<ILogo>(
  {
    link: { type: String },

    logoUrl: {
      type: String,
      required: true,
    },
    logoAlt: { type: String },
    logoWidth: { type: Number },
    logoHeight: { type: Number },
    logoFileName: { type: String },
    logoMimeType: { type: String },
    logoSize: { type: Number },
    logoPublicId: { type: String },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);
export const Logo = mongoose.model<ILogo>("Logo", logoSchema);

export default Logo;