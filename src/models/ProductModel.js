import { Schema, model } from "mongoose";
export const SUPPLIERS = ["SUP1", "SUP2", "SUP3"];
const productSchema = new Schema({
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
}, {
    timestamps: true,
});
const Product = model("Product", productSchema);
export default Product;
