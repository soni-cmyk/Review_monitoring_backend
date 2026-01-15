import mongoose, { Schema, Document } from "mongoose";

export interface ISubCategory {
  _id?: string;
  name: string;
  slug: string;
}

export interface ICategory extends Document {
  name: string;
  slug: string;
  isActive: boolean;
  subCategories: ISubCategory[];
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: { type: String, required: true },
    slug: { type: String },
  },
  { _id: true }
);

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String,  unique: true },
    isActive: { type: Boolean, default: true },
    subCategories: [SubCategorySchema],
  },
  { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
