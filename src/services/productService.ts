import Product from "../models/ProductModel.js";
import Category from "../models/CategoryModel.js";
import Review from "../models/ReviewModel.js";
import { Types } from "mongoose";

/* ===============================
   CREATE PRODUCT
================================ */
export const createProductService = async (
  data: {
    name?: string;
    desc?: string;
    sku?: string;
    supplierId?: string;
    categoryId?: string;
    subCategoryIds?: string[] | string;
  },
  file: Express.Multer.File | undefined
) => {
  const {
    name,
    desc,
    sku,
    supplierId,
    categoryId,
    subCategoryIds,
  } = data;

  if (!name || !sku || !supplierId || !categoryId || !subCategoryIds) {
    throw new Error("Required fields missing");
  }

  if (!file) {
    throw new Error("Product image is required");
  }

  const subIds = Array.isArray(subCategoryIds)
    ? subCategoryIds
    : [subCategoryIds];

  // Validate category
  const category = await Category.findById(categoryId);
  if (!category) throw new Error("Category not found");

  // Validate subcategories belong to category
  const validSubIds = category.subCategories.map((s: any) =>
    s._id.toString()
  );

  const invalidIds = subIds.filter(
    (id) => !validSubIds.includes(id)
  );

  if (invalidIds.length > 0) {
    throw new Error("One or more subcategories are invalid for this category");
  }

  const product = await Product.create({
    name,
    desc,
    sku,
    supplierId,
    categoryId: new Types.ObjectId(categoryId),
    subCategoryIds: subIds.map((id) => new Types.ObjectId(id)),
    image: {
      url: file.path,
      publicId: (file as any).filename,
      originalName: file.originalname,
    },
  });

  return await hydrateProduct(product);
};

/* ===============================
   GET ALL PRODUCTS
================================ */
export const getAllProductsService = async () => {
  const products = await Product.find()
    .populate("categoryId", "name slug subCategories")
    .sort({ createdAt: -1 });

  const hydrated = await Promise.all(
    products.map((p) => hydrateProduct(p))
  );

  const ratings = await Review.aggregate<{
    _id: Types.ObjectId;
    averageRating: number;
    totalReviews: number;
  }>([
    { $match: { isFake: false } },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const ratingMap: Record<
    string,
    { averageRating: number; totalReviews: number }
  > = {};

  ratings.forEach((r: any) => {
    ratingMap[r._id.toString()] = {
      averageRating: Number(r.averageRating.toFixed(1)),
      totalReviews: r.totalReviews,
    };
  });

  return hydrated.map((product: any) => {
    const rating = ratingMap[product._id.toString()] || {
      averageRating: 0,
      totalReviews: 0,
    };

    return {
      ...product,
      averageRating: rating.averageRating,
      totalReviews: rating.totalReviews,
    };
  });
};

/* ===============================
   GET SINGLE PRODUCT
================================ */
export const getProductByIdService = async (id: string) => {
  const product = await Product.findById(id).populate(
    "categoryId",
    "name slug subCategories"
  );

  if (!product) throw new Error("Product not found");

  const hydrated = await hydrateProduct(product);

  const ratingStats = await Review.aggregate<{
    _id: Types.ObjectId;
    averageRating: number;
    totalReviews: number;
  }>([
    {
      $match: {
        productId: product._id,
        isFake: false,
      },
    },
    {
      $group: {
        _id: "$productId",
        averageRating: { $avg: "$rating" },
        totalReviews: { $sum: 1 },
      },
    },
  ]);

  const averageRating =
    ratingStats.length > 0
      ? Number(ratingStats[0].averageRating.toFixed(1))
      : 0;

  const totalReviews =
    ratingStats.length > 0 ? ratingStats[0].totalReviews : 0;

  return {
    ...hydrated,
    averageRating,
    totalReviews,
  };
};

/* ===============================
   UPDATE PRODUCT
================================ */
export const updateProductService = async (
  id: string,
  data: {
    name?: string;
    desc?: string;
    supplierId?: string;
    categoryId?: string;
    subCategoryIds?: string[] | string;
  },
  file?: Express.Multer.File
) => {
  const updateData: any = {
    name: data.name,
    desc: data.desc,
    supplierId: data.supplierId,
    categoryId: data.categoryId,
  };

  let subIds: string[] | undefined;

  if (data.subCategoryIds) {
    subIds = Array.isArray(data.subCategoryIds)
      ? data.subCategoryIds
      : [data.subCategoryIds];

    updateData.subCategoryIds = subIds.map(
      (id) => new Types.ObjectId(id)
    );
  }

  // Validate category + subcategories
  if (data.categoryId && subIds) {
    const category = await Category.findById(data.categoryId);
    if (!category) throw new Error("Category not found");

    const validSubIds = category.subCategories.map((s: any) =>
      s._id.toString()
    );

    const invalidIds = subIds.filter(
      (id) => !validSubIds.includes(id)
    );

    if (invalidIds.length > 0) {
      throw new Error("One or more subcategories are invalid for this category");
    }
  }

  if (file) {
    updateData.image = {
      url: file.path,
      publicId: (file as any).filename,
      originalName: file.originalname,
    };
  }

  const product = await Product.findByIdAndUpdate(id, updateData, {
    new: true,
  }).populate("categoryId", "name slug subCategories");

  if (!product) throw new Error("Product not found");

  return await hydrateProduct(product);
};

/* ===============================
   DELETE PRODUCT
================================ */
export const deleteProductService = async (id: string): Promise<void> => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
};

/* ===============================
   HELPER: HYDRATE SUBCATEGORIES
================================ */
const hydrateProduct = async (product: any) => {
  const category = product.categoryId;

  let subCategories: any[] = [];

  if (category && category.subCategories?.length) {
    const productSubIds = product.subCategoryIds.map((id: any) =>
      id.toString()
    );

    subCategories = category.subCategories.filter((sub: any) =>
      productSubIds.includes(sub._id.toString())
    );
  }

  return {
    ...product.toObject(),
    categoryId: {
      _id: category._id,
      name: category.name,
      slug: category.slug,
    },
    subCategories,
  };
};
