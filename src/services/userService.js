import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
/* =====================================================
   REGISTER USER
===================================================== */
export const registerUserService = async (data) => {
    const { firstName, lastName, email, password, mobile, role } = data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        mobile,
        role: role || "user", // default role
    });
    return user;
};
/* =====================================================
   LOGIN USER
===================================================== */
export const loginUserService = async (data) => {
    const { email, password } = data;
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({
        userId: user._id,
        role: user.role,
    }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return {
        token,
        role: user.role,
        userId: user._id,
    };
};
