const jwt = require('jsonwebtoken')
const Class = require('../Models/ClassModel')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d'
  })
}

const createActivationToken = (email) => {
  return jwt.sign({ email }, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '2m' })
}

const createInvitationByUrlToken = (id) => {
  return jwt.sign({ id }, process.env.INVITATION_TOKEN_SECRET, { expiresIn: '10m' })
}

const createInvitationByEmailToken = (email, role, classId) => {
  return jwt.sign({ email, role, classId }, process.env.INVITATION_TOKEN_SECRET, { expiresIn: '10m' })
}

const createAccessToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '3d' })
}

const verifyEmail = (req, res, next) => {
  const token = req.body.activation_token
  if (token) {
    jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET, (err, user) => {
      if (err) {
        if (err) {
          return res.status(400).json({ message: 'The activation token is incorrect or has expired' })
        }
      }
      req.user = user
      next()
    })
  } else {
    return res.status(401).json('This Email is Invalid!')
  }
}

const verifyInvitationByUrl = (req, res, next) => {
  const token = req.body.invitation_token
  if (token) {
    jwt.verify(token, process.env.INVITATION_TOKEN_SECRET, (err, id) => {
      if (err) {
        if (err) {
          return res.status(400).json({ message: 'The invitation is incorrect or has expired' })
        }
      }
      req.invitationId = id
      next()
    })
  } else {
    return res.status(400).json('This invitation is Invalid!')
  }
}

const verifyInvitationByEmail = (req, res, next) => {
  const token = req.body.invitation_token
  if (token) {
    jwt.verify(token, process.env.INVITATION_TOKEN_SECRET, (err, info) => {
      if (err) {
        if (err) {
          return res.status(400).json({ message: 'The invitation is incorrect or has expired' })
        }
      }
      req.infoInvitation = info
      next()
    })
  } else {
    return res.status(400).json('This invitation is Invalid!')
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(401).json({ message: 'Not authorized as an admin' })
  }
}

// Middleware isTeacher
const teacher = async (req, res, next) => {
  // Get the value of id from the URL param
  const classId = req.params.id || req.body.classId || req.params.classId

  try {
    const curClass = await Class.findById(classId)
    if (!curClass) {
      return res.status(404).json({ message: 'Not found class' })
    }
    if (!curClass.isActive) {
      return res.status(404).json({ message: 'The current class is currently blocked, please try again later' })
    }
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  // Check if classId is in the teacher's list of classes
  const isClassTeacher = req.user.teacherClassList.some(id => id.equals(classId))

  if (isClassTeacher) {
    // If the user is the teacher of the class, allow the request to continue processing
    next()
  } else {
    // If not the teacher of the class, return an error or redirect as needed
    return res.status(403).json({ message: 'Unauthorized. You are not the teacher of this class.' })
  }
}

// Middleware isStudent
const student = async (req, res, next) => {
  // Get the value of id from the URL param
  const classId = req.params.id || req.body.classId || req.params.classId

  try {
    const curClass = await Class.findById(classId)
    if (!curClass) {
      return res.status(404).json({ message: 'Not found class' })
    }
    if (!curClass.isActive) {
      return res.status(404).json({ message: 'The current class is currently blocked, please try again later' })
    }
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  // Check if classId is in the student's list of classes
  const isClassStudent = req.user.studentClassList.some(id => id.equals(classId))

  if (isClassStudent) {
    // If the user is a student of the class, allow the request to continue processing
    next()
  } else {
    // If not a student of the class, return an error or redirect as needed
    return res.status(403).json({ message: 'Unauthorized. You are not a student of this class.' })
  }
}

// Middleware to combine teacher and student middleware
const isTeacherOrStudent = async (req, res, next) => {
  const classId = req.params.id || req.body.classId || req.params.classId

  try {
    const curClass = await Class.findById(classId)
    if (!curClass) {
      return res.status(400).json({ message: 'Not found class' })
    }
    if (!curClass.isActive) {
      return res.status(400).json({ message: 'The current class is currently blocked, please try again later' })
    }
  } catch {
    return res.status(500).json({ message: 'Internal Server Error' })
  }

  // Check if the user is a teacher
  const isClassTeacher = req.user.teacherClassList.some(id => id.equals(classId))

  // Check if the user is a student
  const isClassStudent = req.user.studentClassList.some(id => id.equals(classId))

  // If the user is either a teacher or a student, allow the request to continue
  if (isClassTeacher || isClassStudent) {
    next()
  } else {
    // If not a teacher or a student, return an error or redirect as needed
    return res.status(403).json({ message: 'Unauthorized. You are not authorized for this class.' })
  }
}

module.exports = {
  generateToken,
  verifyEmail,
  createAccessToken,
  createActivationToken,
  createRefreshToken,
  admin,
  teacher,
  student,
  isTeacherOrStudent,
  createInvitationByUrlToken,
  verifyInvitationByUrl,
  createInvitationByEmailToken,
  verifyInvitationByEmail
}