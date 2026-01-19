import Category from "../models/CategoryModel.js";

/* ================= CATEGORY ================= */

/**
 * CREATE CATEGORY
 * Payload (req.body):
 * {
 *   name: string;        // required, unique
 *   slug: string;        // required, unique
 * }
 */
export const createCategoryService = async (data: {
  name: string;
  slug: string;
}) => {
  return await Category.create(data);
};

/**
 * GET ALL CATEGORIES
 * No payload required
 */
export const getAllCategoriesService = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

/**
 * UPDATE CATEGORY
 * Params:
 *   id: string;   // categoryId
 *
 * Payload (req.body):
 * {
 *   name?: string;       // optional, must be unique
 *   slug?: string;       // optional, must be unique
 *   isActive?: boolean; // optional
 * }
 */
export const updateCategoryService = async (
  id: string,
  data: { name?: string; slug?: string; isActive?: boolean },
) => {
  return await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

/**
 * DELETE CATEGORY
 * Params:
 *   id: string;   // categoryId
 *
 * No payload required
 */
export const deleteCategoryService = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

/* ================= SUBCATEGORY ================= */

/**
 * GET ALL SUBCATEGORIES (FLATTENED)
 * No payload required
 *
 * Response shape:
 * [
 *   {
 *     _id: string;                 // subCategoryId
 *     name: string;
 *     slug: string;
 *     parentCategory: {
 *       _id: string;               // categoryId
 *       name: string;
 *     };
 *   }
 * ]
 */
export const getSubCategoriesService = async () => {
  const categories = await Category.find(
    {},
    { name: 1, subCategories: 1 },
  ).lean();

  const subCategories = categories.flatMap((category) =>
    category.subCategories.map((sub) => ({
      _id: sub._id,
      name: sub.name,
      slug: sub.slug,
      parentCategory: {
        _id: category._id,
        name: category.name,
      },
    })),
  );

  return subCategories;
};

/**
 * ADD SUBCATEGORY
 * Params:
 *   categoryId: string
 *
 * Payload (req.body):
 * {
 *   name: string;     // required
 *   slug: string;     // required
 * }
 */
export const addSubCategoryService = async (
  categoryId: string,
  subCategory: { name: string; slug: string },
) => {
  //  Ensure category exists
  const category = await Category.findById(categoryId);

  if (!category) {
    throw new Error("Category not found");
  }

  //  Prevent duplicate slug (case-insensitive)
  const exists = category.subCategories.some(
    (s) => s.slug === subCategory.slug,
  );

  if (exists) {
    return null; // controller will handle duplicate
  }

  // Push safely
  category.subCategories.push(subCategory);
  await category.save();

  return category;
};

/**
 * UPDATE SUBCATEGORY
 * Params:
 *   categoryId: string
 *   subCategoryId: string
 *
 * Payload (req.body):
 * {
 *   name?: string;    // optional
 *   slug?: string;    // optional
 * }
 */
export const updateSubCategoryService = async (
  categoryId: string,
  subCategoryId: string,
  data: { name?: string; slug?: string },
) => {
  const updateFields: Record<string, string> = {};

  if (data.name) {
    updateFields["subCategories.$.name"] = data.name;
  }

  if (data.slug) {
    updateFields["subCategories.$.slug"] = data.slug;
  }

  return await Category.findOneAndUpdate(
    { _id: categoryId, "subCategories._id": subCategoryId },
    { $set: updateFields },
    { new: true },
  );
};


/**
 * DELETE SUBCATEGORY
 * Params:
 *   categoryId: string
 *   subCategoryId: string
 *
 * No payload required
 */
export const deleteSubCategoryService = async (
  categoryId: string,
  subCategoryId: string,
) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    {
      $pull: {
        subCategories: { _id: subCategoryId },
      },
    },
    { new: true },
  );
};
