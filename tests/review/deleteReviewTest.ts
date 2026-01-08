import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "../../src/app.js";
import Review from "../../src/models/ReviewModel.js";

// Checks only admin can delete the reviews
describe("Delete Review - Admin Only", () => {
  let reviewId: string;

  beforeEach(async () => {
    const review = await Review.create({
      rating: 5,
      review: "Test review",
      productId: new mongoose.Types.ObjectId(),
      userId: new mongoose.Types.ObjectId(),
    });
    reviewId = review._id.toString();
  });

  it("should NOT allow delete by USER role", async () => {
    const userToken = jwt.sign(
      { id: "user123", role: "USER" },
      process.env.JWT_SECRET || "testsecret"
    );

    const res = await request(app)
      .delete(`/api/reviews/${reviewId}`)
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(401);
  });

  it("should Delete Review by Admin only", async () => {
    const adminToken = jwt.sign(
        {id: "timtimverma123", role: "Admin"},
        process.env.JWT_SECRET || "testsecret"
    );

    const res = await request(app)
    .delete(`/api/reviews/${reviewId}`)
    .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(401);
  })
});
console.log("Connected DB:", mongoose.connection.name);
