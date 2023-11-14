const express = require("express");
const userController = require("../Controllers/UserController.js");
const { verify } = require("../Middlewares/verifyToken.js");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.put("/profile", verify, userController.updateUserProfile);
router.put("/password", verify, userController.changeUserPassword);

module.exports = router;
