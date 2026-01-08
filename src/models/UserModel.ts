import mongoose, { Document, Schema, Model } from "mongoose";

/* --------------------------
  TypeScript interface for User
--------------------------- */
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobile: string;
  role: "user" | "admin";
  createdAt: Date;
}

/* --------------------------
  Schema definition
--------------------------- */
const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true // bcrypt hash recommended
    },
    mobile: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

/* --------------------------
  Export typed model
--------------------------- */
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
