import request from "supertest";
import app from "../../src/app.js";
process.env.JWT_SECRET = "testsecret";
describe("User Authentication", () => {
    // Test case: Successful user signup
    it("should register user successfully", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: "password123", // You should hash this in your actual model
            mobile: "1234567890",
        });
        expect(res.statusCode).toBe(201); // 201: Created
    });
    // Test case: user can't register without missing fields
    it("shouldn't register user successfully", async () => {
        const res = await request(app)
            .post("/api/users/register")
            .send({
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@test.com",
            password: "password123", // You should hash this in your actual model
        });
        expect(res.statusCode).toBe(400); // 400: Bad Request
    });
    // Test case: Signup fails due to already existing email
    it("should return error if email already exists", async () => {
        // First create a user
        await request(app).post("/api/users/register").send({
            firstName: "Alice",
            lastName: "Wonder",
            email: "alice@test.com",
            password: "password123", // You should hash this in your actual model
            mobile: "1231231234",
        });
        // Then try to register again with the same email
        const res = await request(app)
            .post("/api/users/register")
            .send({
            firstName: "Bob",
            lastName: "Marley",
            email: "alice@test.com", // Same email as before
            password: "password123",
            mobile: "1234567890",
        });
        expect(res.statusCode).toBe(400); // 400: Bad Request
    });
    // Test case: Successful user login
    it("should login user with correct credentials", async () => {
        // Register a user first
        await request(app).post("/api/users/register").send({
            firstName: "Jane",
            lastName: "Smith",
            email: "jane.smith@test.com",
            password: "password123", // You should hash this in your actual model
            mobile: "5555555555",
        });
        // Then login with correct credentials
        const res = await request(app)
            .post("/api/users/login")
            .send({
            email: "jane.smith@test.com",
            password: "password123", // Correct password
        });
        expect(res.statusCode).toBe(200); // 200: OK
        expect(res.body.token).toBeDefined(); // Should return a JWT token
    });
    // Test case: Login fails with incorrect email
    it("should fail login with incorrect email", async () => {
        // Try to login with an unregistered email
        const res = await request(app)
            .post("/api/users/login")
            .send({
            email: "wrong.email@test.com", // Non-existent email
            password: "password123",
        });
        expect(res.statusCode).toBe(401); // 401: Unauthorized
        expect(res.body.message).toBe("Invalid credentials");
    });
    // Test case: Login fails with incorrect password
    it("should fail login with incorrect password", async () => {
        // First register a user
        await request(app).post("/api/users/register").send({
            firstName: "James",
            lastName: "Bond",
            email: "james.bond@test.com",
            password: "password123", // You should hash this in your actual model
            mobile: "7777777777",
        });
        // Then try to login with the correct email but wrong password
        const res = await request(app)
            .post("/api/users/login")
            .send({
            email: "james.bond@test.com",
            password: "wrongpassword", // Incorrect password
        });
        expect(res.statusCode).toBe(401); // 401: Unauthorized
        expect(res.body.message).toBe("Invalid credentials");
    });
});
