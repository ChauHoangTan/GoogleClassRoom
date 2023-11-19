const express = require("express");
const userController = require("../Controllers/UserController");
const { verify } = require("../Middlewares/verifyToken");

const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.post("/activation", userController.activateEmail);
router.post("/forgot", userController.forgotUserPassword);
router.post("/reset", verify, userController.resetUserPassword);
router.put("/profile", verify, userController.updateUserProfile);
router.put("/password", verify, userController.changeUserPassword);
router.put("/password", verify, userController.changeUserPassword);


module.exports = router;
