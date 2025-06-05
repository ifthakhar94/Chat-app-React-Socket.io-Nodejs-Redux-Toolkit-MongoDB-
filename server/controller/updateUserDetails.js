const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(req, res) {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1] || "";
        console.log("Token received:", token);
        
        const user = await getUserDetailsFromToken(token);
        console.log("User from token:", user);
        
        if (!user || user.logout) {
            return res.status(401).json({ 
                message: "Session expired, please login again", 
                success: false 
            });
        }

        const { name, profile_pic } = req.body;
        console.log("Update payload:", { name, profile_pic });
        
        // Update the user
        const updateResult = await UserModel.updateOne(
            { _id: user._id }, 
            { $set: { name, profile_pic } }
        );
        console.log("Update result:", updateResult);

        // Get the updated user data
        const updatedUser = await UserModel.findById(user._id).select('-password');
        console.log("Updated user:", updatedUser);
        
        return res.json({ 
            message: "User details updated successfully", 
            data: updatedUser, 
            success: true 
        });
    } catch (error) {
        console.error("Update error:", error);
        return res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = updateUserDetails;