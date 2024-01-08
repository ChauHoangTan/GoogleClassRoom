const { createAccessToken } = require('../Middlewares/verifyToken')
const Class = require('../Models/ClassModel')
const User = require('../Models/UserModel')
const bcrypt = require('bcryptjs')

const { google } = require('googleapis')
const { OAuth2 } = google.auth

// eslint-disable-next-line no-unused-vars
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

// eslint-disable-next-line no-unused-vars
const { CLIENT_URL } = process.env

// @desc Update user profile
// @route PUT/api/users/profile
const updateUserProfile = async(req, res) => {
  const { email, firstName, lastName, image, phone, dob, userId } = req.body
  try {
    // find user in DB
    const user = await User.findById(req.user.id)
    // if users exists update user data and save it in DB
    if (user) {
      if (userId !== '') {
        const existingUserWithUserId = await User.findOne({ userId: userId }).where('_id').ne(user._id)
        if (existingUserWithUserId) {
          return res.status(400).json({ message: 'UserId already in use' })
        }
      }
      user.email = email || user.email
      user.firstName = firstName || user.firstName
      user.lastName = lastName || user.lastName
      user.image = image || user.image
      user.phone = phone
      user.userId = userId
      user.dob = dob || user.dob

      const updatedUser = await user.save()
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
        userId : updatedUser.userId,
        Authorization: createAccessToken(updatedUser._id)
      })
    }
    // else send error message
    else {
      res.status(400).json({ message: 'User not found' })

    }


  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// @desc Change user password
// @route PUT /api/users/password
const changeUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body
  try {
    // find user in DB
    const user = await User.findById(req.user.id)
    // compare old password with hashed password
    const checkPassword = await bcrypt.compare(oldPassword, user.password)
    // if user exists and correct password  then update user password and save it in DB
    if (user && checkPassword) {
      // hash new password
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(newPassword, salt)
      user.password = hashedPassword
      await user.save()
      return res.json({ message: 'Password changed! ' })
    }
    // else send error message
    else {
      res.status(400).json({ message: 'Invalid old password' })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

// @desc user info
// @route PUT /api/users/info
const getUserInfo = async (req, res) => {
  if (req.error) {
    return res.status(401).json({ message: 'Not authorized, token failed!' })
  }
  try {
    const user = await User.findById(req.user.id).select('-password -refreshToken')
    return res.status(200).json(user)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// @des Get all emails of users
// @route GET /api/users
const getAllEmailUser = async (req, res) => {
  try {
    const users = await User.find({}).select('email')
    const userEmails = users.map(user => user.email)
    return res.status(200).json(userEmails)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

//  ************** ADMIN CONTROLLERS **************
// @des Get all users
// @route GET /api/users
const getAllUser = async (req, res) => {
  try {
    const users = await User.find({}).select('-password -refreshToken').sort({ _id: -1 })
    return res.status(200).json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @des Delete user
// @route Delete /api/user/:id
const deleteUser = async (req, res) => {
  try {
    try {
      const ids = req.params.id.split(',')

      const users = await User.find({ _id: { $in: ids } })
      const teacherToProcess = []
      const studentToProcess = []

      for (const user of users) {
        teacherToProcess.push(...user.teacherClassList)
        studentToProcess.push(...user.studentClassList)
      }

      const teacherPromises = teacherToProcess.map(async (classId) => {
        const classToHandle = await Class.findById(classId)

        if (classToHandle.teachers.length === 1) {
          await Class.findByIdAndDelete(classId)
        } else {
          const updateClass = await Class.findByIdAndUpdate(classId, { $pull: { teachers: { $in: ids } } }, { new: true })
          if (updateClass.teachers.length === 0) {
            await Class.findByIdAndDelete(classId)
          }
        }
      })

      const studentPromises = studentToProcess.map(async (classId) => {
        await Class.findByIdAndUpdate(classId, { $pull: { students: { $in: ids } } }, { new: true })
      })

      await Promise.all(teacherPromises)
      await Promise.all(studentPromises)


      await User.deleteMany({ _id: { $in: ids } })
      if (ids.length === 1) {
        return res.json({ message: User.firstName + ' was deleted successfully' })
      }
      return res.json({ message: `${ids.length} selected Users were deleted successfully` })
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}


// @des block all users
// @route block /api/user/:id
const blockUser = async (req, res) => {
  try {
    // find user in DB
    const user = await User.findById(req.params.id)
    // if user exists delete user from DB
    if (user) {
      // else delete user from DB
      user.isBlocked = true
      await user.save()
      return res.json({ message: 'User  was blocked successfully' })
    }
    // else send error message
    else {
      return res.status(400).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// @desc Update user profile
// @route POST/api/users/all/:id
const updateUser = async(req, res) => {
  const { email, firstName, lastName, userId, isAdmin, isBanned } = req.body
  try {
    // find user in DB
    const user = await User.findById(req.params.id)
    // if users exists update user data and save it in DB
    if (user) {
      user.email = email || user.email
      user.firstName = firstName || user.firstName
      user.lastName = lastName || user.lastName
      user.isAdmin = isAdmin
      user.userId = userId || user.userId
      user.isBanned = isBanned

      await user.save()
      return res.json( { message: 'User was edit successfully' })
    }
    else {
      res.status(400).json({ message: 'User not found' })
    }
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}


const countUserMethodLogin = async (req, res) => {
  try {
    const users = await User.find({})

    const counts = {
      'Gmail': users.filter((user) => user.authGoogleId === '' && user.authFacebookId === '' && user.password !== undefined).length,
      'Facebook': users.filter((user) => user.authFacebookId !== '' && user.authGoogleId === '' && user.password === undefined).length,
      'Google': users.filter((user) => user.authGoogleId !== '' && user.authFacebookId === ''&& user.password === undefined).length,
      'Google And Gmail': users.filter((user) => user.authGoogleId !== '' && user.authFacebookId === '' && user.password !== undefined).length,
      'Facebook And Gmail': users.filter((user) => user.authGoogleId === '' && user.authFacebookId !== '' && user?.password !== undefined).length,
      'Facebook And Google': users.filter((user) => user.authGoogleId !== '' && user.authFacebookId !== '' && user.password === undefined).length,
      'All Methods': users.filter((user) => user.authGoogleId !== '' && user.authFacebookId !== '' && user.password !== undefined).length
    }

    return res.status(200).json(counts)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}


const countUseRoleJoin = async (req, res) => {
  try {
    const users = await User.find({})

    const counts = {
      'User Basic': users.filter((user) => user.teacherClassList.length === 0 && user.studentClassList.length === 0).length,
      'Student': users.filter((user) => user.teacherClassList.length === 0 && user.studentClassList.length !== 0).length,
      'Teacher': users.filter((user) => user.teacherClassList.length !== 0 && user.studentClassList.length === 0).length,
      'Student And Teacher': users.filter((user) => user.teacherClassList.length !== 0 && user.studentClassList.length !== 0).length
    }

    return res.status(200).json(counts)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

const getStudentsListByUploadFile = async (req, res) => {
  let { studentsListUpload } = req.body

  try {
    // eslint-disable-next-line no-undef
    for (student of studentsListUpload) {
        console.log(student);
        let studentId = '';
        if(student['Admin'] === 'no') {
            studentId = student['Student Id'];
        }
      await User.findOneAndUpdate(
        // eslint-disable-next-line no-undef
        { email: student.Email },
        // eslint-disable-next-line no-undef
        { userId: studentId },
        { new: true }
      )
    }

    return res.status(200).json({ message: 'Student List is added Student Ids!' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  updateUserProfile,
  changeUserPassword,
  getUserInfo,
  deleteUser,
  getAllUser,
  blockUser,
  updateUser,
  countUserMethodLogin,
  countUseRoleJoin,
  getAllEmailUser,
  getStudentsListByUploadFile
}