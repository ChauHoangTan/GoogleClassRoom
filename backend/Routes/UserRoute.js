const express = require("express");
const userController = require("../Controllers/UserController");
const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");

const router = express.Router();


router.put("/profile", passport.authenticate('jwt', { session: false }), userController.updateUserProfile);

router.put("/password", passport.authenticate('jwt', { session: false }), userController.changeUserPassword);

router.get("/info", passport.authenticate('jwt', { session: false }), userController.getUserInfo);

router.get("/all", passport.authenticate('jwt', { session: false }), admin, userController.getAllUser);


// router.post("/detail/:id", passport.authenticate('jwt', { session: false }), admin, userController.getAllUser);

router.delete("/all/:id", passport.authenticate('jwt', { session: false }), admin, userController.deleteUser);

router.post("/block/:id", passport.authenticate('jwt', { session: false }), admin, userController.blockUser);

router.post("/ban/:id", passport.authenticate('jwt', { session: false }), admin, userController.banUser);

module.exports = router;
