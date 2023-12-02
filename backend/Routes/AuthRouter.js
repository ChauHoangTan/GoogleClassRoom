const express = require("express");
const authController = require("../Controllers/AuthController");
const { verifyEmail } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");

const router = express.Router();

router.post("/register", authController.registerUser);

router.post("/login", (req, res, next) => { 
    passport.authenticate('local', { session: false }, (error, user) => {
        req.error = error,
        req.user = user
        next();
    })(req, res, next)
}, authController.loginUser);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));

router.get('/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user) => {
        req.user = user;
        next();
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login-success/google/${req.user?.authGoogleId}/${req.user?.authGoogleToken}`)
});

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }));

router.get('/facebook/callback', (req, res, next) => {
    passport.authenticate('facebook', (err, user) => {
        req.user = user;
        next();
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login-success/facebook/${req.user?.authFacebookId}/${req.user?.authFacebookToken}`)
});

router.get('/github',passport.authenticate('github', { scope: [ 'user:email' ], session: false }));

router.get('/github/callback', (req, res, next) => {
    passport.authenticate('github', (err, user) => {
        // if(err) {
        //     res.redirect(`${process.env.CLIENT_URL}/login`)
        // }
        // req.err = err;
        req.user = user;
        next();
    })(req, res, next)
}, (req, res) => {
    res.redirect(`${process.env.CLIENT_URL}/login-success/${req.user?.authGithubId}/${req.user?.authGithubToken}`)
});

router.post("/login-success", authController.loginSuccess)

router.post("/activation", verifyEmail, authController.activateEmail);

router.post("/forgot", authController.forgotUserPassword);

router.post("/resend-activation", authController.resendActivateEmail);

router.post("/checkUrl", verifyEmail, authController.checkUrlResetPassword);

router.post("/reset", verifyEmail, authController.resetUserPassword);

router.post("/refresh", authController.refreshAccessToken);

router.post("/logout",  authController.logout);

module.exports = router;
