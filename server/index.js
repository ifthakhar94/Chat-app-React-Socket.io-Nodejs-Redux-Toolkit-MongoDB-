const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const router = require("./routers");
const cookieParser = require("cookie-parser");

const app = express();

// Updated CORS configuration
app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL].filter(Boolean),
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;
//api endpoints
app.use("/api", router);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on port ${PORT}`);
    });
});



