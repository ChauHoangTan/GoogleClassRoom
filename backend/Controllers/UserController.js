const { createActivationToken, createAccessToken, createRefreshToken } = require("../Middlewares/verifyToken");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const sendMail = require('./sendMail')
const jwt = require("jsonwebtoken");

const {google} = require('googleapis')
const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

// @desc Register user
// @route POST /api/users/register
// const registerUser = async(req, res) => {
//     const { userName, firstName, lastName, password, image } = req.body;
//     try {
//         const userExists = await User.findOne({ userName });
//         // check if user exists
//         if(userExists) {
//             res.status(400);
//             throw new Error("User already exists");
//         }

//         // hash password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // create user in DB
//         const user = await User.create({
//             userName,
//             firstName,
//             lastName,
//             password: hashedPassword,
//             image,
//         });

//         // if user create successfully send user data and token to client 
//         if(user) {
//             res.status(201).json({
//                 _id: user._id,
//                 userName: user.userName,
//                 firstName: user.firstName,
//                 lastName: user.lastName,
//                 phone: user.phone,
//                 dob: user.dob,
//                 email: user.email,
//                 image: user.image,
//                 isAdmin: user.isAdmin,
//                 token: createAccessToken(user._id)
//             });
//         } else {
//             res.status(400);
//             throw new Error("Invalid user data");

//         }
//     } catch(error) {
//         res.status(400).json({ message: error.message });
//     }
// };

const registerUser = async(req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        // check if user exists
        if(userExist) {
            if(!userExist.isVerifiedEmail) {
                return res.status(400).json({message: "Account need to been verified."});
            }
    
            res.status(400);
            throw new Error("User already exists");
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            email,
            firstName,
            lastName,
            password: hashedPassword,
        });
        

        const activation_token = createActivationToken(newUser.email)

        const url = `${CLIENT_URL}/user/activate/${activation_token}`
        await sendMail(email, url, "Verify your email address")

        return res.json({ message: "Register Success! Please activate your email to start." })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

const resendActivateEmail = async(req, res) => {
    const { email} = req.body;
    try {
        const userExist = await User.findOne({ email });
        // check if user exists
        if(!userExist) {
            res.status(400);
            throw new Error("This email is not exists in system.");
        }

        if(userExist.isVerifiedEmail) {
            throw new Error("This email already verified.");
        }

        const activation_token = createActivationToken(userExist.email)

        const url = `${CLIENT_URL}/user/activate/${activation_token}`
        await sendMail(email, url, "Verify your email address")

        return res.json({ message: "Resend Success! Please activate your email to start." })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

const activateEmail = async (req, res) => {
    try {
        const { activation_token } = req.body;
        const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

        const { email } = user;

        const userExist = await User.findOne({ email });
        if(!userExist) {
            return res.status(400).json({message: "This email is not exists in system."});
        }

        if(userExist.isVerifiedEmail) {
            return res.status(400).json({message: "This email already verified."});
        }

        userExist.isVerifiedEmail = true;
        const newUser = await userExist.save();

        if(newUser) {
            return res.status(200).json({ message: "Account has been activated!" })
        } else {
            res.status(400)
            throw new Error("Invalid user data");
        }
    } catch (error) {
        return res.status(500).json({ message: "This Activation Email is unavailable!" });
    }
};

// desc Login user
// @route POST api/user/login
const loginUser = async (req, res) => {
    try {
        if(req.user) {
            const Authorization = createAccessToken(req.user._id)
            // res.setHeader("Authorization", Authorization)
            return res.status(200).json({ ...req.user._doc, Authorization });
        } else {
            return res.status(400).json({ message: req.error })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// desc Login user
// @route POST api/user/login-success
const loginSuccess = async (req, res) => {
    const { userId, tokenLogin, provider } = req.body;
    try {
        if (!userId || !tokenLogin || !provider) {
            return res.status(400).json({ message: "Missing inputs" });
        }

        const user = provider === "google" 
            ? await User.findOne({ 
                authGoogleId: userId, 
                authGoogleToken: tokenLogin 
            }) 
            :  await User.findOne({ 
                authFacebookId: userId, 
                authFacebookToken: tokenLogin 
            });

        const Authorization = createAccessToken(user._id)

        return res.status(200).json({...user._doc, Authorization})
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// const loginSuccessService = (userId, tokenLogin) => new Promise(async(resolve, reject) => {
//     try {
//         const user = await User.findOne({ 
//             authGoogleId: userId, 
//             authGoogleToken: tokenLogin 
//         });

//         const Authorization = createAccessToken(user._id)
//         const newLoginToken = createRefreshToken(user._id);

//         resolve({...user._doc, Authorization});

//         if (user) {
//             await User.findOneAndUpdate(
//                 { _id: userId },
//                 { $set: { authGoogleToken: newLoginToken } }
//             );
//         }

//     } catch (error) {
//         reject({message: error.message});
//     }  
// })


// desc Login user
// @route POST api/user/auth/google
const authGoogle = async (req, res) => {
    console.log('auth google', req.user);
};

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
            res.status(404);
            throw new Error("User not found");
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
            res.status(401);
            throw new Error("Invalid old password");
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

// @desc user forgot password
// @route PUT /api/users/forgot
const forgotUserPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // find user in DB
        const user = await User.findOne({ email });
        // if user exists, send email to user to get url change password 
        if(user) {
            const access_token = createAccessToken(user._id);
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

            sendMail(email, url, "Reset your password");
            return res.json({ message: "Re-send the password, please check your email." });
        }
        // else send error message
        else {
        console.log(email)
            res.status(401);
            throw new Error("This email does not exist");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @desc user reset password
// @route PUT /api/users/reset
const resetUserPassword = async (req, res) => {
    const { newPassword } = req.body;
    try {
        const user = await User.findById(req.user.id);

        const isExistPassword = await bcrypt.compare(newPassword, user.password);
        if(isExistPassword) {
            return res.status(404).json({ message: "New password must be different old" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        return res.json({ message: "Password successfully changed!"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const secret = async (req, res) => {
    console.log("hello");
}

module.exports = {
    registerUser,
    activateEmail,
    loginUser,
    loginSuccess,
    updateUserProfile,
    changeUserPassword,
    forgotUserPassword,
    resetUserPassword,
    secret,
    authGoogle,
    resendActivateEmail,
}