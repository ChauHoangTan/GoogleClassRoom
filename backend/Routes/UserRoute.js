const express = require("express");
const userController = require("../Controllers/UserController");
const { verify } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", passport.authenticate('local', { session: false }), userController.loginUser);
router.post("/auth/google", passport.authenticate('google'), userController.authGoogle);

router.post("/activation", userController.activateEmail);
router.post("/forgot", userController.forgotUserPassword);
router.post("/reset", passport.authenticate('jwt', { session: false }), userController.resetUserPassword);
router.put("/profile", passport.authenticate('jwt', { session: false }), userController.updateUserProfile);
router.put("/password", passport.authenticate('jwt', { session: false }), userController.changeUserPassword);
router.put("/password", passport.authenticate('jwt', { session: false }), userController.changeUserPassword);
router.get("/secret", passport.authenticate('jwt', { session: false }), userController.secret)

module.exports = router;
