import { jest } from "@jest/globals";
const Product = {
    create: jest.fn(),
    find: jest.fn().mockReturnThis(),
    sort: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndDelete: jest.fn()
};
export default Product;
