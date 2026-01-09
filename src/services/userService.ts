import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

/* =====================================================
   REGISTER USER
===================================================== */
export const registerUserService = async (data: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password: string;
  mobile?: string;
  role?: string;
}) => {
  const { firstName, lastName, email, password, mobile, role } = data;

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    mobile,
    role: role || "user",
  });

  // ⭐ generate JWT after signup
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // return everything needed by frontend
  return {
    token,
    role: user.role,
    userId: user._id as Types.ObjectId,
    user,
  };
};

/* =====================================================
   LOGIN USER
===================================================== */
export const loginUserService = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  return {
    token,
    role: user.role,
    userId: user._id as Types.ObjectId,
  };
};
