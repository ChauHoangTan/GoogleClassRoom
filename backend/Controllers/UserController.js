import { generateToken } from "../Middlewares/verifyToken.js";
import asyncHandler from "express-async-handler";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

// @desc Register user
// @route POST /api/users/
const registerUser = async(req, res) => {
    const { userName, fullName, password, image } = req.body;
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
            fullName,
            password: hashedPassword,
            image,
        });

        // if user create successfully send user data and token to client 
        if(user) {
            res.status(201).json({
                _id: user._id,
                userName: user.userName,
                fullName: user.fullName,
                password: user.password,
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
        const checkPassword = await bcrypt.compare(password, user.password);

        // if user exists and correct password send user data and token to client
        if(user && checkPassword) {
            res.status(200).json({
                _id: user._id,
                userName: user.userName,
                fullName: user.fullName,
                password: user.password,
                image: user.image,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            });
        }  else {
            res.status(400);
            throw new Error(" Invalid email or password");
        } 

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    registerUser,
    loginUser,
}