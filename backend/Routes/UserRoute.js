const express = require("express");
const userController = require("../Controllers/UserController");
const { verify } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");

const router = express.Router();

router.post("/register", userController.registerUser);

router.post("/login", (req, res, next) => { 
    passport.authenticate('local', { session: false }, (error, user) => {
        req.error = error,
        req.user = user
        next();
    })(req, res, next)
}, userController.loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, profile) => {
        req.user = profile;
        next();
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.id}`)
});

router.post("/login-success", userController.loginSuccess)
router.post("/activation", userController.activateEmail);

router.post("/forgot", userController.forgotUserPassword);

router.post("/reset", passport.authenticate('jwt', { session: false }), userController.resetUserPassword);

router.put("/profile", passport.authenticate('jwt', { session: false }), userController.updateUserProfile);

router.put("/password", passport.authenticate('jwt', { session: false }), userController.changeUserPassword);

router.put("/password", passport.authenticate('jwt', { session: false }), userController.changeUserPassword);

router.get("/secret", passport.authenticate('jwt', { session: false }), userController.secret)

module.exports = router;
