const express = require("express");
const router = express.Router();
const registerUser = require("../controller/registerUser");
const checkEmail = require("../controller/checkEmail");
const checkPassword = require("../controller/checkPassword");
const userDetails = require("../controller/userDetails");
const logout = require("../controller/logout");
const updateUserDetails = require("../controller/updateUserDetails");
// register user
router.post("/register", registerUser);

// check email
router.post("/check-email", checkEmail);

// check password
router.post("/check-password", checkPassword);

// user details
router.get("/user-details", userDetails);

// logout
router.get("/logout", logout);

// update user details
router.post("/update-user", updateUserDetails); 

module.exports = router;