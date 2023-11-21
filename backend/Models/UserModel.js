const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        studentId:  {
            type: String,
            unique: true,
            trim: true,
        },
        firstName:  {
            type: String,
            required: true,
        },
        lastName:  {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default: "",
        },
        password: {
            type: String,
        },
        image: {
            type: String,
            default: "",
        },
        phone: {
            type: String,
            default: "",
        },
        dob: {
            type: String,
            default: "",
        },

        role: { 
            type: String, 
            enum: ['admin', 'teacher', 'student'], 
            required: true,
            default: 'student', 
        },
        typeLogin: { 
            type: String, 
            enum: ['local', 'google', 'facebook'], 
            required: true,
            default: 'local', 
        },
        authGoogleId: { 
            type: String 
        },
        authFacebookId: { 
            type: String 
        },
        authGoogleToken: { 
            type: String 
        },
        authFacebookToken: { 
            type: String 
        },
        isBanned:  { 
            type: Boolean, 
            default: false 
        },
        isBlocked:  { 
            type: Boolean, 
            default: false 
        },
        isVerified: { 
            type: Boolean, 
            default: false 
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", UserSchema);  