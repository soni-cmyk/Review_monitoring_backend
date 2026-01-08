import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../../src/app.js";
import User from "../../src/models/UserModel.js";
import { Types } from "mongoose";

process.env.JWT_SECRET = "testsecret";

describe("Admin Access", () => {

  it("should reject request without token", async () => {
    const res = await request(app).get("/api/admin/fake-reviews");
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Not authorized, no token");
  });

  it("should reject request with invalid token", async () => {
    const res = await request(app)
      .get("/api/admin/fake-reviews")
      .set("Authorization", "Bearer invalidtoken123");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Token invalid or expired");
  });

  it("should reject NON-ADMIN role", async () => {
    const user = await User.create({
      firstName: "User",
      lastName: "Test",
      email: "user@test.com",
      password: "user123",
      mobile: "9999999999",
      role: "user"
    });

    const token = jwt.sign(
      { userId: user._id as Types.ObjectId, role: "user" },
      process.env.JWT_SECRET as string
    );

    const res = await request(app)
      .get("/api/admin/fake-reviews")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe("Admin access only");
  });

  it("should allow ADMIN role", async () => {
    const admin = await User.create({
      firstName: "Admin",
      lastName: "Test",
      email: "admin@test.com",
      password: "admin123",
      mobile: "8888888888",
      role: "admin"
    });

    const token = jwt.sign(
      { userId: admin._id as Types.ObjectId, role: "admin" },
      process.env.JWT_SECRET as string
    );

    const res = await request(app)
      .get("/api/admin/fake-reviews")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

});
