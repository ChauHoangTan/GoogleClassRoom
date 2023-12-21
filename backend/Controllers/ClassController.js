const Class = require("../Models/ClassModel");
const User = require("../Models/UserModel");
const GradeModel = require('../Models/GradeModel');
const mongoose = require('mongoose');
const { createInvitationByUrlToken, createInvitationByEmailToken } = require("../Middlewares/verifyToken");
const { use } = require("passport");
const sendMail = require('./sendMail')

const {CLIENT_URL} = process.env

function getRandomImageLink(imageList) {
    const randomIndex = Math.floor(Math.random() * imageList.length);
    return imageList[randomIndex];
}

const backgroundImageList = [
    "https://i.pinimg.com/564x/c4/38/d3/c438d3c8a4d818ba7bee1532027d9f0a.jpg",
    "https://wallpapercave.com/wp/wp6827255.jpg",
    "https://i.pinimg.com/564x/b9/6f/b8/b96fb88ddf3d59f90756ebe636457cef.jpg",
    "https://i.pinimg.com/564x/6b/a9/47/6ba947a6c296e3b3afe87d03f0c29e3a.jpg",
    "https://wallpapercave.com/wp/wp6827255.jpg"
];

const getAllClass = async (req, res) => {
    try {
        const classes = await Class.find({})
        .populate({
            path: 'teachers',
            select: 'image firstName lastName -_id', // Chọn các trường cần lấy từ User collection
            options: { limit: 1 } // Chỉ lấy thông tin của giáo viên đầu tiên
        })
        .sort({ _id: -1 });

    const modifiedClasses = classes.map(cls => ({
        ...cls.toObject(),
        createAt: cls.teachers.length > 0 ? {
            avatar: cls.teachers[0].avatar,
            firstName: cls.teachers[0].firstName,
            lastName: cls.teachers[0].lastName
        } : null
    }));

    return res.status(200).json(modifiedClasses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getClassByID = async (req, res) => {
    try {
        // Get class by ID class
        const curClass = await Class.findById(req.params.id);
        if (!curClass) {
            return res.status(401).json({ success: false, message: 'Class not found' });
        }
        return res.status(200).json({ data: curClass });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const joinClassByCode = async (req, res) => {
    const { code } = req.body;
    const userId = req.user.id;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(401).json({ message: 'User not authenticated' });
      }
      // Get class by ID class
      const curClass = await Class.findOne({ classId: code });

      if (!curClass) {
        return res.status(400).json({ message: 'Class not found' });
      }
      // Check if code is not match
      if (curClass?.classId !== code) {
        return res.status(400).json({ message: 'Not match code class' });
      }
  
      // Check if the user is already a teacher or student in the class
      const isUserTeacher = curClass.teachers.includes(userId);
      const isUserStudent = curClass.students.includes(userId);
  
      if (isUserTeacher || isUserStudent) {
        return res.status(400).json({ message: 'User is already a member of this class' });
      }
  
      // Add the user to the class as a student
      curClass.students.push(userId);
  
      // Add the class to the user's studentClassList
      user.studentClassList.push(curClass._id);
  
      // Save the changes to the class and the user
      await curClass.save();
      const updatedUser =  await user.save();
  
      return res.status(200).json({ message: 'Joined the class' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
const getAllClassByID = async (req, res) => {
    try {

        // Check user authentication and permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Find classes where the user's ID is in either teacherClassList or studentClassList
        const classes = await Class.find({
            $or: [
                { _id: { $in: user.teacherClassList } },
                { _id: { $in: user.studentClassList } }
            ]
        });

        // Find infomation of teacher
        // Extract teacher IDs from all classes
        const teacherIds = classes.reduce((acc, curr) => acc.concat(curr.teachers), []);

        // Find teachers based on their IDs
        const teachers = await User.find({ _id: { $in: teacherIds } });

        // Combine class information with teacher names
        const classesWithTeacherNames = classes.map((classItem) => {
            const teacherNames = teachers
                .filter((teacher) => classItem.teachers.includes(teacher._id.toString()))
                .map((teacher) => `${teacher.firstName} ${teacher.lastName}`);

            return {
                ...classItem.toObject(),
                teacherNames
            };
        });

        return res.status(200).json({ success: true, data: classesWithTeacherNames });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// @des Delete class
// @route Delete /api/class/:id
const deleteClass = async (req, res) => {
    try {
        const ids = req.params.id.split(',');
        // find Class in DB and delete
        if(ids.length === 1) {
            await Class.findByIdAndDelete(ids);
            return res.json({ message: "Class deleted successfully" });

        }
        else {
            await Class.deleteMany({ _id: { $in: ids } });
            return res.json({ message: ids.length + " selected classes deleted successfully" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

const createNewClass = async (req, res) => {
    const { classId, className, codeClassName } = req.body;

    try {
        // Validate input
        if (!classId || !className) {
            return res.status(400).json({ success: false, message: 'Please provide classId and className' });
        }

        // Check user authentication and permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        const teachersIds = [user?._id]; 
        const teachersObjectIds = teachersIds.map(id =>new mongoose.Types.ObjectId(id));

        const existingClass = await Class.findOne({ classId: classId });

        if (existingClass) {
            return res.status(400).json({ success: false, message: 'Please choose a different Code as this one already exists.' });
        }

        // Create a new class
        const newClass = await Class.create({
            classId,
            className,
            codeClassName,
            teachers: teachersObjectIds,
            background: getRandomImageLink(backgroundImageList)
        });

        if (newClass && newClass._id) {
            // Get the ID of the newly created class
            const newClassId = newClass._id;
            // Check if isAdmin not assign a role teacher to account admin
            if(!user?.isAdmin) {
                // Add new class ID to the teacherClassList of the user
                user.teacherClassList.push(newClassId);

                // Save the updated user
                const updatedUser = await user.save();
            }

            // // Create new default grade model
            await GradeModel.create({
                classId: newClassId
            })
        }
    
        return res.status(201).json({ success: true, data: newClass });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};

const getAllTeachers = async (req, res) => {
    const { classId } = req.body;

    try {
        const teacherList = await Class.findById(classId)
        .populate({
            path: 'teachers',
            select: 'userId firstName lastName email phone image dob isVerifiedEmail isBanned teachers' 
        })
        .exec();

        if (!teacherList) {
            return res.status(404).json({ success: false, message: 'No class found' });
        }

        return res.status(200).json({teachers: teacherList.teachers });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllStudents = async (req, res) => {
    const { classId } = req.body;

    try {
        const studentList = await Class.findById(classId)
        .populate({
            path: 'students',
            select: 'userId firstName lastName email phone image dob isVerifiedEmail isBanned students' 
        })
        .exec();

        if (!studentList) {
            return res.status(404).json({ message: 'No class found' });
        }

        return res.status(200).json({students: studentList.students });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


// @desc Update user profile
// @route POST/api/classes/all/:id
const updateClass = async(req, res) => {
    const { classId, className, isActive } = req.body;
    try {
        // find user in DB  
        const existClass = await Class.findById(req.params.id);
        // if existClasss exists update existClass data and save it in DB
        if(existClass) {
            existClass.classId = classId || existClass.classId;
            existClass.className = className || existClass.className;
            existClass.isActive = isActive;

            await existClass.save();
            return res.json( {message: "Class was edit successfully" })
        }
        // else send error message
        else {
            res.status(400).json({message: "User not found"});

        }
    }  catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// @route GET api/class/getInvitationStudent
const getInviteClassStudent = async(req, res) => {
    const { classId } = req.body;
    
    try {
        const classExist = await Class.findById(classId);
        // check if class exists
        if(!classExist) {
            return res.status(400).json({message: "Class not exists"});
        }

        const invitation_token = createInvitationByUrlToken(classId)

        const url = `${CLIENT_URL}/class/invite/student/${invitation_token}`

        return res.json({ message: "Get link invation class Success!", url: url })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route POST api/class/invitationStudent
const inviteClassStudent = async(req, res) => {
    try {
        const { id } = req.invitationId;
        const classExist = await Class.findById(id);

        if(!classExist) {
            return res.status(400).json({message: "This class is not exists"});
        }
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({message: "Please login or register an account to join the class"});
        }
        
        if (user.teacherClassList && user.teacherClassList.some(classId => classId.equals(id))) {
            return res.status(400).json({ message: "You are already a teacher in this class" });
        }

        if (user.studentClassList && user.studentClassList.some(classId => classId.equals(id))) {
            return res.status(400).json({ message: "You are already a student in this class" });
        }

        classExist.students.push(user._id)
        await classExist.save()

        user.studentClassList.push(id);
        // Save the updated user
        const updatedUser = await user.save();

        return res.status(200).json({ message: "You are joined the class!", classId: id })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route GET api/class/getInvitationTeacher
const getInviteClassTeacher = async(req, res) => {
    const { classId } = req.body;
    
    try {
        const classExist = await Class.findById(classId);
        // check if class exists
        if(!classExist) {
            return res.status(400).json({message: "Class not exists"});
        }

        const invitation_token = createInvitationByUrlToken(classId)

        const url = `${CLIENT_URL}/class/invite/teacher/${invitation_token}`

        return res.json({ message: "Get link invation class Success!", url: url })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

// @route POST api/class/invitationTeacher
const inviteClassTeacher = async(req, res) => {
    try {
        const { id } = req.invitationId;
        const classExist = await Class.findById(id);

        if(!classExist) {
            return res.status(400).json({message: "This class is not exists"});
        }
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({message: "Please login or register an account to join the class"});
        }
        
        if (user.teacherClassList && user.teacherClassList.some(classId => classId.equals(id))) {
            return res.status(400).json({ message: "You are already a teacher in this class" });
        }

        if (user.studentClassList && user.studentClassList.some(classId => classId.equals(id))) {
            return res.status(400).json({ message: "You are already a student in this class" });
        }

        classExist.teachers.push(user._id)
        await classExist.save()

        user.teacherClassList.push(id);
        // Save the updated user
        const updatedUser = await user.save();

        return res.status(200).json({ message: "You are joined the class!", classId: id })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// desc send invitation
// @route POST api/class/send-invitation
const sendInvitateEmail = async(req, res) => {
    const { emails, role, classId } = req.body;
    try {
        const classExist = await Class.findById(classId);

        if (!classExist) {
            return res.status(400).json({message: "This class is not exists"});
        }

        emails.map(async (email) => {
            const invitation_token = createInvitationByEmailToken(email, role, classId)

            const url = `${CLIENT_URL}/class/invite/email/${invitation_token}`
            await sendMail(email, url, `Welcome to ${classExist?.className} class`)
        });

        return res.json({ message: "Send invite Success!" })
    } catch(error) {
        return res.status(500).json({ message: error.message });
    }
};

// desc receive invitation
// @route POST api/class/receive-invitation
const receiveInvitateEmail = async(req, res) => {
    try {
        const { email, role, classId } = req.infoInvitation;
        const id = classId
        const classExist = await Class.findById(id);

        if(!classExist) {
            return res.status(400).json({message: "This class is not exists"});
        }
        const user = await User.findById(req.user.id)
        if (!user) {
            return res.status(401).json({message: "Please login or register an account to join the class"});
        }
        
        if (user.email !== email) {
            return res.status(400).json({message: "This invitation for another email address"});
        }

        if (user.teacherClassList && user.teacherClassList.some(classId => classId.equals(id))) {
            return res.status(400).json({ message: "You are already a teacher in this class" });
        }

        if (user.studentClassList && user.studentClassList.some(classId => classId.equals(id))) {
            return res.status(400).json({ message: "You are already a student in this class" });
        }

        if (role === 'teacher') {
            classExist.teachers.push(user._id)
            user.teacherClassList.push(id);
        } else {
            classExist.students.push(user._id)
            user.studentClassList.push(id);
        }
        await classExist.save()

        // Save the updated user
        const updatedUser = await user.save();

        return res.status(200).json({ message: "You are joined the class!", classId: id })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllClass,
    createNewClass,
    getAllClassByID,
    getAllTeachers,
    getAllStudents,
    deleteClass,
    updateClass,
    getClassByID,
    joinClassByCode,
    getInviteClassStudent,
    inviteClassStudent,
    getInviteClassTeacher,
    inviteClassTeacher,
    sendInvitateEmail,
    receiveInvitateEmail
}
