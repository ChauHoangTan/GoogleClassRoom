const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
};

const createActivationToken = (email) => {
    return jwt.sign({email}, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '2m'})
}

const createAccessToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '2d'})
}

const createRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '2d'})
}

const verifyEmail = (req, res, next) => {
    const token = req.body.activation_token;
    if(token) {
        jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET, (err, user) => {
            if(err){ 
                if(err) {
                    return res.status(401).json({ message: "The activation token is incorrect or has expired" });
                }
            };
            req.user = user;
            next();
        });
    } else {
        return res.status(401).json("This Email is Invalid!");
    }
}

const admin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: "Not authorized as an admin"})
    }
}

// Middleware isTeacher
const teacher = (req, res, next) => {
    // Get the value of id from the URL param
    const classId = req.params.id;

    // Check if classId is in the teacher's list of classes
    const isClassTeacher = req.user.teacherClassList.some(id => id.equals(classId));
    console.log('isClassTeacher', isClassTeacher)
    console.log('req.user.teacherClassList', req.user.teacherClassList)

    if (isClassTeacher) {
        // If the user is the teacher of the class, allow the request to continue processing
        console.log('Class ID:', classId);
        next();
    } else {
        // If not the teacher of the class, return an error or redirect as needed
        next();
        res.status(403).json({ error: 'Unauthorized. You are not the teacher of this class.' });
    }
};

// Middleware isStudent
const student = (req, res, next) => {
    // Get the value of id from the URL param
    const classId = req.params.id;
  
    // Check if classId is in the student's list of classes
    const isClassStudent = req.user.studentClassList.some(id => id.equals(classId));
  
    if (isClassStudent) {
      // If the user is a student of the class, allow the request to continue processing
      console.log('Class ID:', classId);
      next();
    } else {
      // If not a student of the class, return an error or redirect as needed
      next();
      res.status(403).json({ error: 'Unauthorized. You are not a student of this class.' });
    }
};

// Middleware to combine teacher and student middleware
const isTeacherOrStudent = (req, res, next) => {
    const classId = req.params.id;
  
    // Check if the user is a teacher
    const isClassTeacher = req.user.teacherClassList.some(id => id.equals(classId));
  
    // Check if the user is a student
    const isClassStudent = req.user.studentClassList.some(id => id.equals(classId));
  
    // If the user is either a teacher or a student, allow the request to continue
    if (isClassTeacher || isClassStudent) {
      console.log('Class ID:', classId);
      next();
    } else {
      // If not a teacher or a student, return an error or redirect as needed
      res.status(403).json({ error: 'Unauthorized. You are not authorized for this class.' });
    }
};

module.exports = {
    generateToken,
    verifyEmail,
    createAccessToken,
    createActivationToken,
    createRefreshToken,
    admin,
    teacher,
    student,
    isTeacherOrStudent
}