require("dotenv").config();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../Models/UserModel");
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var GoogleStrategy = require('passport-google-oauth20').Strategy;

// Passport jwt
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if (!user) {
            return done(null, false);
        } 

        done(null, user)
    } catch (error) {
        done(error, false);
    }
}))

// Passport local
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done("Invalid email", false);
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if(!isCorrectPassword) {
            return done("Invalid password", false);
        }

        done(null, user);
    } catch (error) {
        done(error, false);
    }
}))

