import { generateToken } from "../Middlewares/verifyToken.js";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

// @desc Register user
// @route POST /api/users/register
const registerUser = async(req, res) => {
    const { userName, firstName, lastName, password, image } = req.body;
    try {
        const userExists = await User.findOne({ userName });
        // check if user exists
        if(userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user in DB
        const user = await User.create({
            userName,
            firstName,
            lastName,
            password: hashedPassword,
            image,
        });

        // if user create successfully send user data and token to client 
        if(user) {
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                dob: user.dob,
                email: user.email,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        } else {
            res.status(400);
            throw new Error("Invalid user data");

        }
    } catch(error) {
        res.status(400).json({ message: error.message });
    }
};

// desc Login user
// @route POST api/user/login
const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    try {
        // find user in DB
        const user = await User.findOne({ userName });
        // compare password with hash password
        
        // if user exists and correct password send user data and token to client
        if(user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if(checkPassword) {
                res.status(200).json({
                    _id: user._id,
                    userName: user.userName,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    image: user.image,
                    isAdmin: user.isAdmin,
                    phone: user.phone,
                    dob: user.dob,
                    email: user.email,
                    token: generateToken(user._id)
                });
            }
            else {
                res.status(400);
                throw new Error(" Invalid password");
            }
        }  else {
            res.status(400);
            throw new Error(" Invalid userName ");
        } 

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc Update user profile
// @route PUT/api/users/profile
const updateUserProfile = async(req, res) => {
    const { firstName, lastName, image, phone, email, dob } = req.body;
    try {
        // find user in DB  
        const user = await User.findById(req.user.id);
        // if users exists update user data and save it in DB
        if(user) {
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.email = email || user.email;
            user.image = image || user.image;
            user.phone = phone || user.phone;
            user.dob = dob || user.dob;

            const updatedUser = await user.save();
            // send updated user data and token to client
            res.json({
                _id: updatedUser._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: updatedUser.email,
                image: updatedUser.image,
                phone: updatedUser.phone,
                dob: updatedUser.dob,
                isAdmin: updatedUser.isAdmin,
                token: generateToken(updatedUser._id),
            })
        }
        // else send error message
        else {
            res.status(404);
            throw new Error("User not found");
        }
        
    
    }  catch (error) {
        res.status(400).json({ message: error.message });
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
            res.json({ message: "Password changed! "});
        }
        // else send error message
        else {
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export {
    registerUser,
    loginUser,
    updateUserProfile,
    changeUserPassword,
}