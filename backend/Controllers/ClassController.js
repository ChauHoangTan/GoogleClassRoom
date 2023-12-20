const Class = require("../Models/ClassModel");
const User = require("../Models/UserModel");
const GradeModel = require('../Models/GradeModel');
const mongoose = require('mongoose');

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
    const { classId, className } = req.body;

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

        // Create a new class
        const newClass = await Class.create({
            classId,
            className,
            teachers: teachersObjectIds,
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
        const teacherList = await Class.findOne({ classId })
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
        const studentList = await Class.findOne({ classId })
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
module.exports = {
    getAllClass,
    createNewClass,
    getAllClassByID,
    getAllTeachers,
    getAllStudents,
    deleteClass,
    updateClass,
    getClassByID,
    joinClassByCode
}
