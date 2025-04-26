const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    profile_pic: {
        type: String,
        default: "",
    },
}, { timestamps: true });

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;