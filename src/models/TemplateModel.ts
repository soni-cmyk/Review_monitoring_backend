import mongoose, { Document, Schema } from "mongoose";

export interface IPage extends Document {
  title: string;
  slug: string ;
  content: string;
}

const PageSchema: Schema<IPage> = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IPage>("Page", PageSchema);
