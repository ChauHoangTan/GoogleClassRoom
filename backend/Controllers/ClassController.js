const Class = require("../Models/ClassModel");
const User = require("../Models/UserModel");
const GradeModel = require('../Models/GradeModel');
const mongoose = require('mongoose');
const { createInvitationByUrlToken, createInvitationByEmailToken } = require("../Middlewares/verifyToken");
const { use } = require("passport");
const sendMail = require('./sendMail');

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
            select: 'image firstName lastName _id', // Chọn các trường cần lấy từ User collection
        })
        .sort({ _id: -1 });

    return res.status(200).json(classes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getClassByID = async (req, res) => {
    try {
        // Get class by ID class
        const curClass = await Class.findById(req.params.id);
        let isTeacherOfThisClass = true;

        if (!curClass) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        else if (curClass.students.includes(req.user.id)) {
            isTeacherOfThisClass = false;
        }

        return res.status(200).json({ data: {...curClass._doc, isTeacherOfThisClass} });
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

const getAllClassTeachAndStudyByID = async (req, res) => {
    try {

        // Check user authentication and permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Find classes where the user's ID is in either teacherClassList or studentClassList

        const classTeaching = await Class.find({
            _id: { $in: user.teacherClassList } 
        })

        const classStudying = await Class.find({
            _id: { $in: user.studentClassList } 
        })

        return res.status(200).json({ success: true, data: { classTeaching, classStudying} });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// @des Delete class
// @route Delete /api/class/:id
const deleteClass = async (req, res) => {
    try {
        const ids = req.params.id.split(',');

        const classes = await Class.find({ _id: { $in: ids } });
        const teacherToProcess = [];
        const studentToProcess = [];

        for (const cls of classes) {
            teacherToProcess.push(...cls.teachers);
            studentToProcess.push(...cls.students);
        }
        
        const teacherPromises = teacherToProcess.map(async (userId) => {
            await User.findByIdAndUpdate(userId, { $pull: { teacherClassList: { $in: ids } } }, { new: true });
        })

        const studentPromises = studentToProcess.map(async (userId) => {
            await User.findByIdAndUpdate(userId, { $pull: { studentClassList: { $in: ids } } }, { new: true });
        })

        await Promise.all(teacherPromises);
        await Promise.all(studentPromises);

        // find Class in DB and delete
        await Class.deleteMany({ _id: { $in: ids } });
        await GradeModel.deleteMany({ classId: { $in: ids } });

        if(ids.length === 1) {
            return res.json({ message: "Class deleted successfully" });
        }
        return res.json({ message: ids.length + " selected classes deleted successfully" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
}

function objectIdToShortString(objectId) {
    const hexString = objectId.toHexString();
    const shortString = hexString.slice(-9);
    const shortNumber = parseInt(shortString, 16) % 1e9;
  
    return shortNumber;
}  

const createNewClass = async (req, res) => {
    const { className, codeClassName } = req.body;

    try {
        // Validate input
        if (!className) {
            return res.status(400).json({ success: false, message: 'Please provide className' });
        }

        // Check user authentication and permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }
        const teachersIds = [user?._id]; 
        const teachersObjectIds = teachersIds.map(id =>new mongoose.Types.ObjectId(id));

        const min = 100000000; // Số nhỏ nhất với 9 chữ số
        const max = 999999999; // Số lớn nhất với 9 chữ số    
        const classId = Math.floor(Math.random() * (max - min + 1)) + min
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

            const classId = objectIdToShortString(newClassId)
            newClass.classId = classId
            console.log(newClass.classId)
            await newClass.save()

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
            return res.status(404).json({ message: 'No class found' });
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

        if (emails.length === 0) {
            return res.status(400).json({message: "No information about email"});
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

const getStudentsListByUploadFile = async (req, res) => {
    let { studentsListUpload, classId } = req.body;

    try {
        const classExist = await Class.findById(classId)
        
        if (!classExist) {
            return res.status(404).json({ message: 'No class found' });
        }

        // studentList.sort((a,b) => a.userId - b.userId)
        classExist.studentsListUpload = studentsListUpload;
        console.log(studentsListUpload)

        await classExist.save()

        return res.status(200).json({message: "Students list added!" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getAllTypeOfStudents = async (req, res) => {
    const { classId } = req.body;
    try {
        const classExist = await Class.findById(classId)

        const studentList = await Class.findById(classId)
        .populate({
            path: 'students',
            select: 'userId firstName lastName email phone image dob isVerifiedEmail isBanned students _id' 
        })
        .exec();

        if (!studentList || !classExist) {
            return res.status(404).json({ message: 'No class found' });
        }

        // Xử lý
        const studentsListUpload = classExist.studentsListUpload;

        // Lọc ra danh sách sinh viên không chứa trong studentsListUpload.userId
        const unmatchedStudents = studentList.students.filter((student) => {
            return !studentsListUpload.some(
            (uploadStudent) => uploadStudent.userId.toString() === student.userId.toString()
            );
        });
    
        // Tạo đối tượng JSON để trả về
        const resultArray = unmatchedStudents.map((student) => {
            return {
            userId: student.userId,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            phone: student.phone,
            image: student.image,
            dob: student.dob,
            isVerifiedEmail: student.isVerifiedEmail,
            isBanned: student.isBanned,
            students: student.students,
            _id: student._id,
            status: 'not exist', // Vì đây là danh sách không chứa trong studentsListUpload
            };
        });

        studentsListUpload.forEach((uploadStudent) => {
            // Tìm sinh viên trong danh sách studentList
            const matchingStudent = studentList.students.find(
                (student) => student.userId.toString() === uploadStudent.userId.toString()
            );

            // Tạo đối tượng JSON mới để trả về
            const resultObject = {
                userId: uploadStudent.userId,
                firstName: uploadStudent.firstName,
                lastName: uploadStudent.lastName,
                email: matchingStudent ? matchingStudent.email : '',
                phone: matchingStudent ? matchingStudent.phone : '',
                image: matchingStudent ? matchingStudent.image : '',
                dob: matchingStudent ? matchingStudent.dob : '',
                isVerifiedEmail: matchingStudent ? matchingStudent.isVerifiedEmail : '',
                isBanned: matchingStudent ? matchingStudent.isBanned : '',
                students: matchingStudent ? matchingStudent.students : '',
                _id: matchingStudent ? matchingStudent._id : uploadStudent._id,
            };

            // Kiểm tra trạng thái và thêm vào resultObject
            if (!uploadStudent.userId || matchingStudent === undefined) {
                resultObject.status = 'not mapping';
            } else if (matchingStudent) {
                resultObject.status = 'mapped';
            } else {
                resultObject.status = 'not exist';
            }

            // Thêm vào mảng kết quả
            resultArray.push(resultObject);
        });



        return res.status(200).json({ students: resultArray });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getStudentIdListByUpload = async (req, res) => {
    const { classId } = req.body;

    try {
        const classExist = await Class.findById(classId)
        
        if (!classExist) {
            return res.status(404).json({ message: 'No class found' });
        }

        let studentListByUpload = []

        studentListByUpload = classExist.studentsListUpload
        studentListByUpload.sort((a, b) => a.userId - b.userId);

        return res.status(200).json({message: "Students list getted!", studentListByUpload });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const leaveThisClass = async (req, res) => {
    const { classId } = req.body;
    const userId = req.user.id;

    try {
        // Find the class in the ClassModel
        const classData = await Class.findById(classId);

        if (!classData) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        // Check if the user is a teacher or student in the class
        const isTeacher = classData.teachers.includes(userId);
        const isStudent = classData.students.includes(userId);

        if (!isTeacher && !isStudent) {
            return res.status(403).json({ success: false, message: 'User is not a member of this class' });
        }

        // Check if the user is the main teacher of the class
        const isMainTeacher = classData.teachers[0].equals(userId)
        if (isMainTeacher) {
            return res.status(403).json({ success: false, message: 'You are the main teacher of this class and cannot leave' });
        }

        // Update ClassModel: remove user from teachers or students list
        if (isTeacher) {
            classData.teachers.pull(userId);
        }

        if (isStudent) {
            classData.students.pull(userId);
        }

        await classData.save();

        const user = await User.findById(userId);

        if (isTeacher) {
            user.teacherClassList.pull(classId);
        }

        if (isStudent) {
            user.studentClassList.pull(classId);
        }

        await user.save();

        return res.status(200).json({ success: true, message: 'Leave success', user: user, class: classData  });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const kickUserOutOfClass = async (req, res) => {
    const { classId, id, userId } = req.body;
    console.log(' classId, id, userId',  classId, id, userId)
    try {
        // Find the class in the ClassModel
        const classData = await Class.findById(classId);

        if (!classData) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        // Check if the user is a teacher or student in the class
        const isTeacher = classData.teachers.includes(id);
        const isStudent = classData.students.includes(id);
        const isInListUpload = classData.studentsListUpload.some(student => student._id.equals(id) || student.userId === userId);

        console.log('',isTeacher,isStudent,  isInListUpload)
        if (!isTeacher && !isStudent && !isInListUpload) {
            return res.status(403).json({ success: false, message: 'User is not a member of this class' });
        }

        // Check if the user is the main teacher of the class
        const isMainTeacher = classData.teachers[0].equals(id)
        if (isMainTeacher) {
            return res.status(403).json({ success: false, message: 'You are the main teacher of this class and cannot leave' });
        }

        // Update ClassModel: remove user from teachers or students list
        if (isTeacher) {
            classData.teachers.pull(id);
        }

        if (isStudent) {
            classData.students.pull(id);
        }

        if (isInListUpload) {
            // Check if mapping situation (Because have tow _id at student temp and user)
            classData.studentsListUpload.pull({ userId: userId })
            // classData.studentsListUpload.pull({ _id: id });
            console.log('id, userId', id, userId)
        }

        await classData.save();

        if (!isInListUpload || ((isStudent || isTeacher) && isInListUpload)) {
            const user = await User.findById(id);

            if (isTeacher) {
                user.teacherClassList.pull(classId);
            }

            if (isStudent) {
                user.studentClassList.pull(classId);
            }

            await user.save();
        }

        return res.status(200).json({ success: true, message: 'Kick success', class: classData  });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getRoleInClassByUserId = async (req, res) => {
    const { classId } = req.body;
    const userId = req.user.id;
    try {
        // Find the class in the ClassModel
        const user = await User.findById(userId)
        user.teacherClassList.map((item) => {
            if( item.equals(classId)) {
                return res.status(200).json({ success: true, message: 'Leave success', isTeacher: true });
            }
        })

        user.studentClassList.map((item) => {
            if( item.equals(classId)) {
                return res.status(200).json({ success: true, message: 'Leave success', isTeacher: false });
            }
        })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateClassDetail = async (req, res) => {
    console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
    const { classId, className, codeClassName } = req.body;

    try {
        // Validate input
        if (!className) {
            return res.status(400).json({ success: false, message: 'Please provide className' });
        }

        // Check user authentication and permissions
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        // find user in DB  
        const existClass = await Class.findById(classId);
        // if existClasss not exists in DB
        if(!existClass) {
            return res.status(401).json({ success: false, message: 'Class not found' });
        }
        existClass.codeClassName = codeClassName || existClass.codeClassName;
        existClass.className = className || existClass.className;

        await existClass.save();
        
        return res.status(201).json({ success: true, message: "Class was edit successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {
    getAllClass,
    createNewClass,
    getAllClassByID,
    getAllClassTeachAndStudyByID,
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
    receiveInvitateEmail,
    getStudentsListByUploadFile,
    getAllTypeOfStudents,
    getStudentIdListByUpload,
    leaveThisClass,
    getRoleInClassByUserId,
    kickUserOutOfClass,
    updateClassDetail
}
