const UserModel = require("../models/UserModel");
async function checkEmail(req, res) {
    try {
        const { email } = req.body;
        const user = await UserModel.findOne({ email }).select("-password");
        if (!user) {
            return res.status(400).json({
                error: true,
                message: "User not found",
            });
        }
        res.status(200).json({
            error: false,
            message: "User found",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error.message || error,
        });
    }
}

module.exports = checkEmail;