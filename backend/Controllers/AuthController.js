const { createActivationToken, createAccessToken, createRefreshToken } = require('../Middlewares/verifyToken')
const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')
const sendMail = require('./sendMail')
const jwt = require('jsonwebtoken')

const { google } = require('googleapis')
const { OAuth2 } = google.auth

// eslint-disable-next-line no-unused-vars
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const { CLIENT_URL } = process.env

// desc auth register
// @route POST api/auth/register
const registerUser = async(req, res) => {
  const { email, firstName, lastName, password } = req.body
  try {
    const userExist = await User.findOne({ email })
    // check if user exists
    if (userExist) {
      if (!userExist.isVerifiedEmail) {
        return res.status(400).json({ message: 'Account need to been verified.' })
      }

      return res.status(400).json({ message: 'User already exists' })
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      password: hashedPassword
    })


    const activation_token = createActivationToken(newUser.email)

    const url = `${CLIENT_URL}/user/activate/${activation_token}`
    await sendMail(email, url, 'Verify your email address')

    return res.json({ message: 'Register Success! Please activate your email to start.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// desc resend activation
// @route POST api/auth/resend-activation
const resendActivateEmail = async(req, res) => {
  const { email } = req.body
  try {
    const userExist = await User.findOne({ email })
    // check if user exists
    if (!userExist) {
      return res.status(400).json({ message: 'This email is not exists in system.' })
    }

    if (userExist.isVerifiedEmail) {
      return res.status(400).json({ message: 'This email already verified.' })

    }

    const activation_token = createActivationToken(userExist.email)

    const url = `${CLIENT_URL}/user/activate/${activation_token}`
    await sendMail(email, url, 'Verify your email address')

    return res.json({ message: 'Resend Success! Please activate your email to start.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// desc activation email
// @route POST api/auth/activation
const activateEmail = async (req, res) => {
  try {
    const { email } = req.user

    const userExist = await User.findOne({ email })
    if (!userExist) {
      return res.status(400).json({ message: 'This email is not exists in system.' })
    }

    if (userExist.isVerifiedEmail) {
      return res.json({ message: 'This email already verified.' })
    }

    userExist.isVerifiedEmail = true
    const newUser = await userExist.save()

    if (newUser) {
      return res.status(200).json({ message: 'Account has been activated!' })
    } else {
      return res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// desc Login user
// @route POST api/auth/login
const loginUser = async (req, res) => {
  try {
    if (req.user) {
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
        // httpOnly: true,
        maxAge: 2 * 60*1000,
        secure: true,
        sameSite: 'none'
      })
      return res.status(200).json({
        _id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        image: req.user.image,
        isAdmin: req.user.isAdmin,
        isThirdPartyLogin: req.user.isThirdPartyLogin,
        Authorization: accessToken,
        userId: req.user.userId
      })
    } else {
      return res.status(400).json({ message: req.error })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// desc refresh token
// @route POST api/auth/refresh
const refreshAccessToken = async(req, res) => {
  try {
    // get refresh token from cookie
    const cookie = req.cookies

    // check refresh token is exist
    if (!cookie && !cookie.refreshToken) {
      return res.status(401).json({ message: 'Not authorized, token failed!' })
    }
    // check refresh token is valid
    jwt.verify(cookie.refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
      if (err) {
        return res.status(401).json({ message: 'Not authorized, token failed!' })
      }
      // check refresh token is exist in db
      const existUser = await User.findOne({
        _id: user.id,
        refreshToken: cookie.refreshToken
      })

      if (!existUser) {
        return res.status(400).json({ message: 'Refresh token invalid' })
      }

      const newAccessToken = createAccessToken(existUser._id)
      return res.status(200).json({ newAccessToken })
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// desc Logout user
// @route POST api/auth/logout
const logout = async (req, res) => {
  const cookie = req.cookies
  if (!cookie || !cookie.refreshToken) {
    // return res.status(400).json({ message: 'No refresh token in cookies'})
    return res.status(200).json({ message: 'Logout successfully' })
  }

  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: '' },
    { new: true }
  )

  res.clearCookie('refreshToken', {
    // httpOnly: true,
    sameSite: 'none',
    secure: true
  })
  return res.status(200).json({ message: 'Logout successfully' })
}

// desc Login user
// @route POST api/auth/login-success
const loginSuccess = async (req, res) => {
  const { userId, tokenLogin, provider } = req.body
  try {
    if (!userId || !tokenLogin || !provider) {
      return res.status(400).json({ message: 'Missing inputs' })
    }
    const user = provider === 'google'
      ? await User.findOne({
        authGoogleId: userId,
        authGoogleToken: tokenLogin
      })
      : await User.findOne({
        authFacebookId: userId,
        authFacebookToken: tokenLogin
      })

    if (!user) {
      return res.status(400).json({ message: 'You are required to log in to use the website' })
    }
    // create access token
    const accessToken = createAccessToken(user._id)
    // create refresh token
    const refreshToken = createRefreshToken(user._id)
    // save refreshToken and update token by FB or Google in database
    if (provider === 'google' ) {
      await User.findByIdAndUpdate(
        user._id,
        {
          refreshToken,
          authGoogleToken: accessToken
        },
        { new: true }
      )
    }

    if (provider === 'facebook' ) {
      await User.findByIdAndUpdate(
        user._id,
        {
          refreshToken,
          authFacebookToken: accessToken
        },
        { new: true }
      )
    }


    // save refreshToken in cookie
    res.cookie('refreshToken', refreshToken, {
      // httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 2*60*1000
    })
    return res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      isAdmin: user.isAdmin,
      isThirdPartyLogin: user.isThirdPartyLogin,
      userId: user.userId,
      Authorization: accessToken
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// @desc user forgot password
// @route PUT /api/auth/forgot
const forgotUserPassword = async (req, res) => {
  const { email } = req.body
  try {
    // find user in DB
    const user = await User.findOne({ email })
    // if user exists, send email to user to get url change password
    if (!user) {
      return res.status(400).json({ message: 'This email does not exist' })
    }
    if ((user.authFacebookId || user.authGoogleId) && !user.password) {
      return res.status(400).json({ message: 'This email address was created by login google or facebook' })
    }
    if (!user.isVerifiedEmail) {
      return res.status(400).json({ message: 'Account need to been verified.' })
    }
    const access_token = createActivationToken(user.email)
    const url = `${CLIENT_URL}/user/reset/${access_token}`
    user.activationEmailToken = access_token
    user.save()
    sendMail(email, url, 'Reset your password')
    return res.json({ message: 'Re-send the password, please check your email.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const checkUrlResetPassword = async (req, res) => {
  const user = await User.findOne({
    email: req.user.email,
    activationEmailToken: req.body.activation_token
  })
  if (!user || user.activationEmailToken === '') {
    return res.status(401).json({ message: 'The password reset token is incorrect or has expired' })
  }

  return res.json({ message: 'The password reset url is valid' })
}
// @desc user reset password

// @route PUT /api/auth/reset
const resetUserPassword = async (req, res) => {
  const { newPassword } = req.body
  try {
    const user = await User.findOne({
      email: req.user.email,
      activationEmailToken: req.body.activation_token
    })
    if (!user || user.activationEmailToken === '') {
      return res.status(401).json({ message: 'The password reset token is incorrect or has expired. Please click the Forgot Password again' })
    }
    const isExistPassword = await bcrypt.compare(newPassword, user.password)
    if (isExistPassword) {
      return res.status(404).json({ message: 'New password must be different old' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)
    user.password = hashedPassword
    user.activationEmailToken = ''
    await user.save()
    return res.json({ message: 'Password successfully changed!' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

module.exports = {
  registerUser,
  activateEmail,
  loginUser,
  loginSuccess,
  forgotUserPassword,
  resetUserPassword,
  checkUrlResetPassword,
  resendActivateEmail,
  refreshAccessToken,
  logout
}