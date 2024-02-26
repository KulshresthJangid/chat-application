import mongoose from "mongoose";

export const USER_TYPES = {
    CONSUMER: "consumer",
    SUPPORT: "support",
};

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    type: String,
}, {
    timestamps: true,
    collection: "users",
});


export default mongoose.model("User", userSchema);