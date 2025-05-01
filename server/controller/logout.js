async function logout(req, res) {
    try {
        const cookieOptions = {
            http: true,
            secure:true
        }
        return res.cookie("token", "", cookieOptions).status(200).json({ message: "Logged out successfully", success: true }, );
    } catch (error) {
        return res.status(500).json({ error: error.message, error: true });
    }
}

module.exports = logout;
