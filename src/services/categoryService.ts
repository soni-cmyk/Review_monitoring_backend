import Category from "../models/CategoryModel.js";

/* ================= CATEGORY ================= */

export const createCategoryService = async (data: {
  name: string;
  slug: string;
}) => {
  return await Category.create(data);
};

export const getAllCategoriesService = async () => {
  return await Category.find().sort({ createdAt: -1 });
};

export const updateCategoryService = async (
  id: string,
  data: { name?: string; slug?: string; isActive?: boolean }
) => {
  return await Category.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteCategoryService = async (id: string) => {
  return await Category.findByIdAndDelete(id);
};

/* ================= SUBCATEGORY ================= */

export const addSubCategoryService = async (
  categoryId: string,
  subCategory: { name: string; slug: string }
) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    { $push: { subCategories: subCategory } },
    { new: true }
  );
};

export const updateSubCategoryService = async (
  categoryId: string,
  subCategoryId: string,
  data: { name?: string; slug?: string }
) => {
  return await Category.findOneAndUpdate(
    { _id: categoryId, "subCategories._id": subCategoryId },
    {
      $set: {
        "subCategories.$.name": data.name,
        "subCategories.$.slug": data.slug,
      },
    },
    { new: true }
  );
};

export const deleteSubCategoryService = async (
  categoryId: string,
  subCategoryId: string
) => {
  return await Category.findByIdAndUpdate(
    categoryId,
    { $pull: { subCategories: { _id: subCategoryId } } },
    { new: true }
  );
};
