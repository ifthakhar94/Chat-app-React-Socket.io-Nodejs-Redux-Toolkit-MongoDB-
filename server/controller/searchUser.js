const UserModel = require("../models/UserModel");

async function searchUser(req, res) {
    try {
        const { search } = req.body;
        const query = new RegExp(search, "i", "g");
        const users = await UserModel.find({
            $or: [
                { name: query },
                { email: query }
            ]
        }).select("-password");
        return res.json({
            success: true,
            message: "Users fetched successfully",
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = searchUser;    