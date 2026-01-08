import mongoose from "mongoose";
const trackedIPSchema = new mongoose.Schema({
    ipAddress: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    fakeCount: {
        type: Number,
        default: 0
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // adds createdAt & updatedAt
});
// Prevent model overwrite error in dev
const TrackedIP = mongoose.models.TrackedIP ||
    mongoose.model("TrackedIP", trackedIPSchema);
export default TrackedIP;
