const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: [true, "Please add an userName"],
            unique: true,
            trim: true,
        },
        firstName:  {
            type: String,
            required: [true, "Please add a full name"],
        },
        lastName:  {
            type: String,
            required: [true, "Please add a full name"],
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
        email: {
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
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("User", UserSchema);  