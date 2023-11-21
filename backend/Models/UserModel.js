const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        firstName:  {
            type: String,
            required: [true, "Please add a full name"],
        },
        lastName:  {
            type: String,
            required: [true, "Please add a full name"],
        },
        email: {
            type: String,
            default: "",
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be at least 6 characters"],
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
        authType: { 
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