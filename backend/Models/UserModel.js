const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        studentId:  {
            type: String,
            trim: true,
            default: "",
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
            unique: true,
            trim: true,   
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
        isAdmin: { 
            type: Boolean,
            default: false, 
        },
        isThirdPartyLogin: {
            type: Boolean,
            default: false,
        },
        authGoogleId: { 
            type: String,
            default: "",
        },
        authFacebookId: { 
            type: String,
            default: "",
        },
        authGoogleToken: { 
            type: String,
            default: "",
        },
        authFacebookToken: { 
            type: String,
            default: "",
        },
        isBanned:  { 
            type: Boolean, 
            default: false 
        },
        isBlocked:  { 
            type: Boolean, 
            default: false 
        },
        isVerifiedEmail: { 
            type: Boolean, 
            default: false 
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", UserSchema);  