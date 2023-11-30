const { createActivationToken, createAccessToken, createRefreshToken } = require("../Middlewares/verifyToken");
const User = require("../Models/UserModel");
const bcrypt = require("bcryptjs");
const sendMail = require('./sendMail')
const jwt = require("jsonwebtoken");

const {google} = require('googleapis')
const {OAuth2} = google.auth

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

// desc user register
// @route POST api/user/register
const registerUser = async(req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {
        const userExist = await User.findOne({ email });
        // check if user exists
        if(userExist) {
            if(!userExist.isVerifiedEmail) {
                return res.status(400).json({message: "Account need to been verified."});
            }
    
            res.status(400).json({message: "User already exists"});
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

// desc resend activation
// @route POST api/user/resend-activation
const resendActivateEmail = async(req, res) => {
    const { email} = req.body;
    try {
        const userExist = await User.findOne({ email });
        // check if user exists
        if(!userExist) {
            return res.status(400).json({message: "This email is not exists in system."});
        }

        if(userExist.isVerifiedEmail) {
            return res.status(400).json({message: "This email already verified."});

        }

        const activation_token = createActivationToken(userExist.email)

        const url = `${CLIENT_URL}/user/activate/${activation_token}`
        await sendMail(email, url, "Verify your email address")

        return res.json({ message: "Resend Success! Please activate your email to start." })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

// desc activation email
// @route POST api/user/activation
const activateEmail = async (req, res) => {
    try {
        const { email } = req.user;

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
            return res.status(400).json({message: "Invalid user data" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// desc Login user
// @route POST api/user/login
const loginUser = async (req, res) => {
    try {
        if(req.user) {
            // create access token
            const accessToken = createAccessToken(req.user._id)
            // create refresh token
            const refreshToken = createRefreshToken(req.user._id)
            // save refreshToken in database
            await User.findByIdAndUpdate(
                req.user._id, 
                { refreshToken }, 
                { new: true }
            )
            // save refreshToken in cookie
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 2*60*1000
            })
            return res.status(200).json({ 
                _id: req.user._id,
                firstName: req.user.firstName,
                image: req.user.image,
                isAdmin: req.user.isAdmin,
                isThirdPartyLogin: req.user.isThirdPartyLogin,
                Authorization: accessToken 
            });
        } else {
            return res.status(400).json({ message: req.error })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// desc refresh token
// @route POST api/user/refresh
const refreshAccessToken = async(req, res) => {
   try {
        // get refresh token from cookie
        const cookie = req.cookies

        // const { _id }
        // check refresh token is exist
        if(!cookie && !cookie.refreshToken) {
            return res.status(401).json({ message: 'Not authorized, token failed!'})
        }
        // check refresh token is valid
       jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if(err) {
                return res.status(401).json({ message: "Not authorized, token failed!" })
            }
            // check refresh token is exist in db
            const existUser = await User.findOne({
                _id: user.id,
                refreshToken: cookie.refreshToken
            })

            if(!existUser) {
                return res.status(400).json({ message: "Refresh token invalid"})
            }

            const newAccessToken = createAccessToken(existUser._id) 
            return res.status(200).json({newAccessToken})
        })
   } catch (error) {
        return res.status(500).json({ message: error.message });
   }
}

// desc Logout user
// @route POST api/user/logout
const logout = async (req, res) => {
    const cookie = req.cookies
    if (!cookie || !cookie.refreshToken) {
        return res.status(401).json({ message: 'Not authorized, token failed!'})
    }

    await User.findOneAndUpdate(
        { refreshToken: cookie.refreshToken },
        {refreshToken: ''},
        {new: true}
    )

    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true
    })
    return res.status(200).json({ message: "Logout successfully" })
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
        // create access token
        const accessToken = createAccessToken(user._id)
         // create refresh token
         const refreshToken = createRefreshToken(user._id)
           // save refreshToken in database
        await User.findByIdAndUpdate(
            user._id, 
            { refreshToken }, 
            { new: true }
        )
        // save refreshToken in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 2*60*1000
        })
        res.status(200).json({ 
                _id: user._id,
                firstName: user.firstName,
                image: user.image,
                isAdmin: user.isAdmin,
                isThirdPartyLogin: user.isThirdPartyLogin,
                Authorization: accessToken, 
            })
        // const newAuthorization = createAccessToken(user._id)
        // user.authGoogleToken = newAuthorization
        // await user.save()
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

// @desc user forgot password
// @route PUT /api/users/forgot
const forgotUserPassword = async (req, res) => {
    const { email } = req.body;
    console.log(req.body)
    try {
        // find user in DB
        const user = await User.findOne({ email });
        // if user exists, send email to user to get url change password 
        if(user) {
            const access_token = createActivationToken(user.email);
            const url = `${CLIENT_URL}/user/reset/${access_token}`;

            sendMail(email, url, "Reset your password");
            return res.json({ message: "Re-send the password, please check your email." });
        }
        // else send error message
        else {
           return  res.status(400).json({message: "This email does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @desc user reset password
// @route PUT /api/users/reset
const resetUserPassword = async (req, res) => {
    const { newPassword } = req.body;
    console.log(req.body)
    try {
        const user = await User.findOne({ email: req.user.email });

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
        // find user in DB
        const user = await User.findById(req.params.id);
        // if user exists delete user from DB
        if(user) {
            // else delete user from DB
            await user.remove();
            res.json({ message: "User deleted successfully" });
        }
        // else send error message
        else {
            res.status(400);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
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
            res.json({ message: "User was banned successfully" });
        }
        // else send error message
        else {
            res.status(400);
            throw new Error("User not found");
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
            res.json({ message: "User  was blocked successfully" });
        }
        // else send error message
        else {
            res.status(400);
            throw new Error("User not found");
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
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
    resendActivateEmail,
    getUserInfo,
    refreshAccessToken,
    logout,
    getAllUser,
    banUser,
    blockUser,
}