import { Request, Response } from "express";
import {
  createCategoryService,
  getAllCategoriesService,
  updateCategoryService,
  deleteCategoryService,
  addSubCategoryService,
  updateSubCategoryService,
  deleteSubCategoryService,
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

export const addSubCategory = async (req: Request, res: Response) => {
  const category = await addSubCategoryService(req.params.id, req.body);
  res.status(201).json(category);
};

export const updateSubCategory = async (req: Request, res: Response) => {
  const { categoryId, subCategoryId } = req.params;
  const category = await updateSubCategoryService(
    categoryId,
    subCategoryId,
    req.body
  );
  res.status(200).json(category);
};

export const deleteSubCategory = async (req: Request, res: Response) => {
  const { categoryId, subCategoryId } = req.params;
  const category = await deleteSubCategoryService(categoryId, subCategoryId);
  res.status(200).json(category);
};
