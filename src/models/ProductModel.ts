import { Schema, model, Document, Types } from "mongoose";

export const SUPPLIERS = ["SUP1", "SUP2", "SUP3"] as const;

/**
 * Image sub-document type
 */
interface ProductImage {
  url: string;
  publicId?: string;
  originalName?: string;
}

/**
 * Product document type
 */
export interface ProductDocument extends Document {
  name: string;
  desc?: string;
  sku: string;
  image: ProductImage;
  supplierId: (typeof SUPPLIERS)[number];
  categoryId: Types.ObjectId;
  subCategoryIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    desc: {
      type: String,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
      },
      originalName: {
        type: String,
      },
    },

    supplierId: {
      type: String,
      enum: SUPPLIERS,
      required: true,
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategoryIds: [
      {
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

/* Optional but recommended */
productSchema.index({ categoryId: 1 });
productSchema.index({ subCategoryIds: 1 });

const Product = model<ProductDocument>("Product", productSchema);

export default Product;
