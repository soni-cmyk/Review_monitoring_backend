import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
  addSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

/* CATEGORY */

router.post("/", createCategory);
router.get("/", getCategories);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

/* SUBCATEGORY */
router.post("/:id/subcategory", addSubCategory);
router.put("/:categoryId/subcategory/:subCategoryId", updateSubCategory);
router.delete("/:categoryId/subcategory/:subCategoryId", deleteSubCategory);

export default router;
