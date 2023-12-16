const { createAccessToken } = require("../Middlewares/verifyToken");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");

const {google} = require('googleapis')
const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

// @desc Update user profile
// @route PUT/api/users/profile
const updateUserProfile = async(req, res) => {
    const { email, firstName, lastName, image, phone, dob } = req.body;
    try {
        // find user in DB  
        const user = await User.findById(req.user.id);
        // if users exists update user data and save it in DB
        if(user) {
            user.email = email || user.email;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.image = image || user.image;
            user.phone = phone || user.phone;
            user.dob = dob || user.dob;

            const updatedUser = await user.save();
            // send updated user data and token to client
            return res.json({
                email: updatedUser.email,
                _id: updatedUser._id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                image: updatedUser.image,
                phone: updatedUser.phone,
                dob: updatedUser.dob,
                isAdmin: updatedUser.isAdmin,
                Authorization: createAccessToken(updatedUser._id),
            })
        }
        // else send error message
        else {
            res.status(400).json({message: "User not found"});

        }
        
    
    }  catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @desc Change user password
// @route PUT /api/users/password
const changeUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    try {
        // find user in DB
        const user = await User.findById(req.user.id);
        // compare old password with hashed password 
        const checkPassword = await bcrypt.compare(oldPassword, user.password);
        // if user exists and correct password  then update user password and save it in DB
        if(user && checkPassword) {
            // hash new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);
            user.password = hashedPassword;
            await user.save();
            return res.json({ message: "Password changed! "});
        }
        // else send error message
        else {
            res.status(400).json({message: "Invalid old password"});
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// @desc user info
// @route PUT /api/users/info
const getUserInfo = async (req, res) => {
    if(req.error) {
        return res.status(401).json({ message: 'Not authorized, token failed!' });
    }
    try {
        const user = await User.findById(req.user.id).select('-password -refreshToken')
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

//  ************** ADMIN CONTROLLERS **************
// @des Get all users
// @route GET /api/users
const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password -refreshToken'); 
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @des Delete all user
// @route Delete /api/user/:id
const deleteUser = async (req, res) => {
    try {
        console.log(req.params.id)
        // find user in DB
        const user = await User.findById(req.params.id);
        console.log(user)
        // if user exists delete user from DB
        if(user) {
            // else delete user from DB
            await user.remove();
            return res.json({ message: "User deleted successfully" });
        }
        // else send error message
        else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// @des ban all users
// @route ban /api/user/:id
const banUser = async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.params.id);
        // if user exists delete user from DB
        if(user) {
            // else delete user from DB
            user.isBanned = true
            await user.save();
            return res.json({ message: "User was banned successfully" });
        }
        // else send error message
        else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// @des block all users
// @route block /api/user/:id
const blockUser = async (req, res) => {
    try {
        // find user in DB
        const user = await User.findById(req.params.id);
        // if user exists delete user from DB
        if(user) {
            // else delete user from DB
            user.isBlocked = true
            await user.save();
            return res.json({ message: "User  was blocked successfully" });
        }
        // else send error message
        else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    updateUserProfile,
    changeUserPassword,
    getUserInfo,
    deleteUser,
    getAllUser,
    banUser,
    blockUser,
}