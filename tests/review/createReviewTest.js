import app from "../../src/app.js";
import Review from "../../src/models/ReviewModel.js";
import request from "supertest";
// It should always create review with token 
describe("Create Review", () => {
    it("should not allow creating review without token", async () => {
        const res = await request(app).post("/api/reviews").send({
            rating: 5,
            comment: "Great product",
            productId: "69492c41abd707d90176d1dc",
            userId: "694a66fb4a1e0325cac11789",
        });
        expect(res.statusCode).toBe(401);
        const review = await Review.findOne();
        expect(review).toBeNull();
    });
});
// It should always create reviews with valid token, if you are using fake token it throws an error
describe("Create Review - Fake Token", () => {
    it("should reject request with fake token", async () => {
        const fakeToken = "Bearer this.is.a.fake.token";
        const res = await request(app)
            .post("/api/reviews")
            .set("Authorization", fakeToken) //  fake token
            .send({
            rating: 5,
            comment: "Great product",
            productId: "69492c41abd707d90176d1dc"
        });
        // Expected behavior
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toMatch(/invalid|unauthorized|token/i);
        // Ensure DB is not modified
        const review = await Review.findOne();
        expect(review).toBeNull();
    });
});
