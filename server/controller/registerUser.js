async function registerUser(req, res) {
    try {
        const { name, email, password, profile_pic } = req.body;
        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
       const payload = {
        name,
        email,
        profile_pic,
        password: hashedPassword
    }
    const user = new UserModel(payload);
   const userData = await user.save();
    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user: userData,
    });
       


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || error,
        });
    }
}

module.exports = registerUser;