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

router.post("/login-success", userController.loginSuccess)

router.post("/activation", userController.activateEmail);

router.post("/forgot", userController.forgotUserPassword);

router.post("/resend-activation", userController.resendActivateEmail);


router.post("/reset", passport.authenticate('jwt', { session: false }), userController.resetUserPassword);

router.put("/profile", passport.authenticate('jwt', { session: false }), userController.updateUserProfile);

router.put("/password", passport.authenticate('jwt', { session: false }), userController.changeUserPassword);

router.get("/info", passport.authenticate('jwt', { session: false }), userController.getUserInfo);

router.post("/refresh", userController.refreshAccessToken);

router.post("/logout",  userController.logout);

module.exports = router;
