const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const conn = mongoose.connection;
        conn.on("error", (error) => {
            console.log("🔴 MongoDB connection failed", error);
        });
        conn.on("connected", () => {
            console.log("🟢 MongoDB connected");
        });
        conn.on("disconnected", () => {
            console.log("🔴 MongoDB disconnected");
        });
        } catch (error) {
        console.log("🔴 MongoDB connection failed", error);
        process.exit(1);
    }
}

module.exports = connectDB;