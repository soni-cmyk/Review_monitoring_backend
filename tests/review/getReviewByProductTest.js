import { jest } from "@jest/globals";
import mongoose from "mongoose";
import { getReviewsByProductService } from "../../src/services/reviewService.js";
import Review from "../../src/models/ReviewModel.js";
// Tell TypeScript this is a mocked module
jest.mock("../../src/models/ReviewModel.js");
const MockedReview = Review;
// Create productId for the test
const productId = new mongoose.Types.ObjectId();
// Mock reviews array
const mockReviews = [
    {
        _id: new mongoose.Types.ObjectId(),
        productId,
        rating: 5,
        review: "latest",
        userId: new mongoose.Types.ObjectId(),
        createdAt: new Date(),
        deletedAt: null,
    },
    {
        _id: new mongoose.Types.ObjectId(),
        productId,
        rating: 3,
        review: "older",
        userId: new mongoose.Types.ObjectId(),
        createdAt: new Date(Date.now() - 100000),
        deletedAt: null,
    },
];
// Mock chained Mongoose methods
beforeEach(() => {
    const sortMock = jest.fn()
        .mockResolvedValue(mockReviews); // .sort() returns Promise<MockReview[]>
    const populateMock = jest.fn().mockReturnValue({ sort: sortMock }); // .populate().sort()
    const findMock = jest.fn().mockReturnValue({ populate: populateMock }); // .find().populate().sort()
    MockedReview.find = findMock; // type-cast fixes TS never error
});
describe("getReviewsByProductService", () => {
    afterEach(() => jest.clearAllMocks());
    it("should return reviews sorted by newest first", async () => {
        const result = await getReviewsByProductService(productId);
        // Check that .find() was called correctly
        expect(MockedReview.find).toHaveBeenCalledWith({
            productId,
            deletedAt: null,
        });
        // Check that result matches mock data
        expect(result[0].review).toBe("latest");
        expect(result[1].review).toBe("older");
    });
});
