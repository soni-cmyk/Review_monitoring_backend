import { createProductService, getAllProductsService, getProductByIdService, updateProductService, deleteProductService, } from "../services/productService.js";
/* ===============================
   CREATE PRODUCT
================================ */
/**
 * @route   POST /api/products
 * @desc    Create a new product
 *
 * @required body:
 *   - name        (string)  Product name
 *   - sku         (string)  Unique product SKU
 *   - supplierId  (string)  Supplier ID reference
 *
 * @optional body:
 *   - desc        (string)  Product description
 *
 * @required file:
 *   - image       (file)    Product image (multipart/form-data)
 *
 * @success response (201):
 *   - returns created product object
 *
 * @error responses:
 *   - 400 Required fields missing
 *   - 400 Product image is required
 */
export const createProduct = async (req, res) => {
    try {
        const product = await createProductService(req.body, req.file);
        res.status(201).json(product);
    }
    catch (error) {
        const err = error;
        res.status(400).json({ message: err.message });
    }
};
/* ===============================
   GET ALL PRODUCTS
================================ */
/**
 * @route   GET /api/products
 * @desc    Get all products with rating statistics
 *
 * @success response (200):
 *   - returns array of products
 *   - each product includes:
 *       - averageRating (number)
 *       - totalReviews  (number)
 *
 * @error responses:
 *   - 500 Server error
 */
export const getAllProducts = async (req, res) => {
    try {
        const products = await getAllProductsService();
        res.json(products);
    }
    catch (error) {
        const err = error;
        res.status(500).json({ message: err.message });
    }
};
/* ===============================
   GET SINGLE PRODUCT
================================ */
/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID with rating stats
 *
 * @required params:
 *   - id (string) Product ID
 *
 * @success response (200):
 *   - returns product object
 *   - includes:
 *       - averageRating (number)
 *       - totalReviews  (number)
 *
 * @error responses:
 *   - 404 Product not found
 *   - 400 Invalid product ID
 */
export const getProductById = async (req, res) => {
    try {
        const product = await getProductByIdService(req.params.id);
        res.json(product);
    }
    catch (error) {
        const err = error;
        res.status(err.message === "Product not found" ? 404 : 400).json({
            message: err.message,
        });
    }
};
/* ===============================
   UPDATE PRODUCT
================================ */
/**
 * @route   PUT /api/products/:id
 * @desc    Update an existing product
 *
 * @required params:
 *   - id (string) Product ID
 *
 * @optional body:
 *   - name        (string) Product name
 *   - desc        (string) Product description
 *   - supplierId  (string) Supplier ID
 *
 * @optional file:
 *   - image       (file)   New product image
 *
 * @success response (200):
 *   - returns updated product object
 *
 * @error responses:
 *   - 404 Product not found
 *   - 400 Validation or update error
 */
export const updateProduct = async (req, res) => {
    try {
        const product = await updateProductService(req.params.id, req.body, req.file);
        res.json(product);
    }
    catch (error) {
        const err = error;
        res.status(err.message === "Product not found" ? 404 : 400).json({
            message: err.message,
        });
    }
};
/* ===============================
   DELETE PRODUCT
================================ */
/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 *
 * @required params:
 *   - id (string) Product ID
 *
 * @success response (200):
 *   - { message: "Product deleted successfully" }
 *
 * @error responses:
 *   - 404 Product not found
 *   - 400 Invalid product ID
 */
export const deleteProduct = async (req, res) => {
    try {
        await deleteProductService(req.params.id);
        res.json({ message: "Product deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(err.message === "Product not found" ? 404 : 400).json({
            message: err.message,
        });
    }
};
