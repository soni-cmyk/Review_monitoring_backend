import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import app from "../../src/app.js";
describe("Products", () => {
    it("should fetch products (public)", async () => {
        const res = await request(app).get("/api/products");
        expect(res.statusCode).toBe(200);
    });
    it("should allow admin to create product", async () => {
        const token = jwt.sign({ id: new mongoose.Types.ObjectId(), role: "ADMIN" }, process.env.JWT_SECRET || "testsecret");
        const res = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send({
            name: "Product",
            price: 100
        });
        expect(res.statusCode).toBe(401);
    });
    it("should block non-admin product creation", async () => {
        const token = jwt.sign({ id: new mongoose.Types.ObjectId(), role: "USER" }, process.env.JWT_SECRET || "testsecret");
        const res = await request(app)
            .post("/api/products")
            .set("Authorization", `Bearer ${token}`)
            .send({
            name: "Product",
            price: 100
        });
        expect(res.statusCode).toBe(401);
    });
});
