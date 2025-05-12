const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
async function checkPassword(req, res) {
   try {
    const { password, userId } = req.body;
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(400).json({ error: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ error: "Invalid password" });
    }
    const tokenData = {
        id: user._id,
        email: user.email,
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: "1d",
    }); 
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000,
    }
    res.cookie("token", token, cookieOptions);
    res.status(200).json({ 
        message: "Password is valid",
        token: token,
        data: {
            id: user._id,
            email: user.email,
            name: user.name,
            imageUrl: user.imageUrl
        }
    });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = checkPassword;