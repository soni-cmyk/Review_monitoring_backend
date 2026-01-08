import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminsOnlyMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; //  ADD THIS

const router = express.Router();

// CREATE product (with image upload)
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"), //  added
  createProduct
);

// UPDATE product (image optional)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"), //  added
  updateProduct
);

// DELETE product
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProduct
);

// READ all products
router.get("/", getAllProducts);

// READ single product
router.get("/:id", getProductById);

export default router;
