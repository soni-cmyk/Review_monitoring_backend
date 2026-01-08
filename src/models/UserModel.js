import mongoose, { Schema } from "mongoose";
/* --------------------------
  Schema definition
--------------------------- */
const userSchema = new Schema({
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
}, {
    timestamps: { createdAt: true, updatedAt: false }
});
/* --------------------------
  Export typed model
--------------------------- */
const User = mongoose.model("User", userSchema);
export default User;
