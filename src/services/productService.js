import Product from "../models/ProductModel.js";
import Review from "../models/ReviewModel.js";
/* ===============================
   CREATE PRODUCT
================================ */
export const createProductService = async (data, file) => {
    const { name, desc, sku, supplierId } = data;
    if (!name || !sku || !supplierId) {
        throw new Error("Required fields missing");
    }
    if (!file) {
        throw new Error("Product image is required");
    }
    return await Product.create({
        name,
        desc,
        sku,
        supplierId,
        image: {
            url: `/uploads/products/${file.filename}`,
            originalName: file.originalname,
        },
    });
};
/* ===============================
   GET ALL PRODUCTS
================================ */
export const getAllProductsService = async () => {
    const products = await Product.find().sort({ createdAt: -1 });
    const ratings = await Review.aggregate([
        { $match: { isFake: false } },
        {
            $group: {
                _id: "$productId",
                averageRating: { $avg: "$rating" },
                totalReviews: { $sum: 1 },
            },
        },
    ]);
    const ratingMap = {};
    ratings.forEach((r) => {
        ratingMap[r._id.toString()] = {
            averageRating: Number(r.averageRating.toFixed(1)),
            totalReviews: r.totalReviews,
        };
    });
    return products.map((product) => {
        const rating = ratingMap[product._id.toString()] || {
            averageRating: 0,
            totalReviews: 0,
        };
        return {
            ...product.toObject(),
            averageRating: rating.averageRating,
            totalReviews: rating.totalReviews,
        };
    });
};
/* ===============================
   GET SINGLE PRODUCT
================================ */
export const getProductByIdService = async (id) => {
    const product = await Product.findById(id);
    if (!product)
        throw new Error("Product not found");
    const ratingStats = await Review.aggregate([
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
    const averageRating = ratingStats.length > 0
        ? Number(ratingStats[0].averageRating.toFixed(1))
        : 0;
    const totalReviews = ratingStats.length > 0 ? ratingStats[0].totalReviews : 0;
    return {
        ...product.toObject(),
        averageRating,
        totalReviews,
    };
};
/* ===============================
   UPDATE PRODUCT
================================ */
export const updateProductService = async (id, data, file) => {
    const updateData = {
        name: data.name,
        desc: data.desc,
        supplierId: data.supplierId,
    };
    if (file) {
        updateData.image = {
            url: `/uploads/products/${file.filename}`,
            originalName: file.originalname,
        };
    }
    const product = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
    });
    if (!product)
        throw new Error("Product not found");
    return product;
};
/* ===============================
   DELETE PRODUCT
================================ */
export const deleteProductService = async (id) => {
    const product = await Product.findByIdAndDelete(id);
    if (!product)
        throw new Error("Product not found");
};
