import { generateToken } from "../Middlewares/verifyToken.js";
import User from "../Models/UserModel.js";
import bcrypt from "bcryptjs";

const registerUser = async(req, res) => {
    const {userName, fullName, password} = req.body;
    try {
        const userExists = await User.findOne({ userName });
        // check if user exists
        if(userExists) {
            res.status(400).json("User already exists");
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create user in DB
        const user = await User.create({
            userName,
            fullName,
            password: hashedPassword,
        });

        // if user create successfully send user data and token to client 
        if(user) {
            res.status(201).json({
                userName: user.userName,
                fullName: user.fullName,
                password: user.password,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json("Invalid user data");
        }
    } catch(error) {
        res.status(500).json(error);
    }
}

export {
    registerUser,
}