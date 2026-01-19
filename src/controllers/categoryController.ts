import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  addSubCategoryService,
  updateSubCategoryService,
  deleteSubCategoryService,
  getSubCategoriesService,
} from "../services/categoryService.js";

/* ================= CATEGORY ================= */

export const createCategory = async (req: Request, res: Response) => {
  const { name, slug = name.toLowerCase().replace(/\s+/g, "-") } = req.body;
  const category = await createCategoryService({ name, slug });
  res.status(201).json(category);
};

export const getCategories = async (_req: Request, res: Response) => {
  const categories = await getAllCategoriesService();
  res.status(200).json(categories);
};

export const updateCategory = async (req: Request, res: Response) => {
  const category = await updateCategoryService(req.params.id, req.body);
  res.status(200).json(category);
};

export const deleteCategory = async (req: Request, res: Response) => {
  await deleteCategoryService(req.params.id);
  res.status(200).json({ message: "Category deleted" });
};

/* ================= SUBCATEGORY ================= */

export const getSubCategories = async (req: Request, res: Response) => {
  const category = await getSubCategoriesService();
  res.status(200).json(category);
};
export const addSubCategory = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Subcategory name is required" });
    }

    const slug =
      req.body.slug ||
      name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

    const category = await addSubCategoryService(req.params.id, {
      name: name.trim(),
      slug,
    });

    if (!category) {
      return res.status(400).json({
        message: "Subcategory with this slug already exists in this category",
      });
    }

    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to add subcategory",
    });
  }
};

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { categoryId, subCategoryId } = req.params;
    const { name, slug } = req.body;

    // Validate params
    if (!categoryId || !subCategoryId) {
      return res.status(400).json({
        message: "categoryId and subCategoryId are required in params",
      });
    }

    //  Validate body
    if (!name && !slug) {
      return res.status(400).json({
        message: "At least one field (name or slug) is required",
      });
    }

    // Build payload for service
    const payload: { name?: string; slug?: string } = {};

    if (name) {
      payload.name = name.trim();
      payload.slug =
        slug?.trim() || name.toLowerCase().trim().replace(/\s+/g, "-");
    } else if (slug) {
      payload.slug = slug.trim();
    }

    // Call service
    const category = await updateSubCategoryService(
      categoryId,
      subCategoryId,
      payload,
    );

    if (!category) {
      return res.status(404).json({
        message: "Category or Subcategory not found",
      });
    }

    // Success response
    res.status(200).json({
      message: "Subcategory updated successfully",
      category,
    });
  } catch (error: any) {
    console.error("Update SubCategory Error:", error.message);

    res.status(500).json({
      message: "Failed to update subcategory",
      error: error.message,
    });
  }
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  const { categoryId, subCategoryId } = req.params;
  const category = await deleteSubCategoryService(categoryId, subCategoryId);
  res.status(200).json(category);
};
