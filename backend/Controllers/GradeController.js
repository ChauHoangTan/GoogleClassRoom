const Grade = require('../Models/GradeModel')
const Class = require('../Models/ClassModel')
const User = require('../Models/UserModel')
const GradeComposition = require('../Models/GradeCompositionModel')
const Review = require('../Models/ReviewModel')
const Comment = require('../Models/CommentModel')
const mongoose = require('mongoose')
// eslint-disable-next-line no-unused-vars
const { student } = require('../Middlewares/verifyToken')
const GradeStudentSchema = require('../Models/GradeStudentModel')

const getGradeComposition = async (req, res) => {
  const { classId } = req.body

  try {

    const grade = await Grade.findOne({ classId })
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const { orderGradeComposition, gradeCompositionList } = grade

    return res.status(200).json({
      success: true,
      orderGradeComposition,
      gradeCompositionList
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const createNewGradeComposition = async (req, res) => {
  const { classId, name, scale, isPublic } = req.body

  try {

    const grade = await Grade.findOne({ classId })
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const GradeCompositionModel = mongoose.model('GradeComposition', GradeComposition)

    const newGradeComposition = new GradeCompositionModel({
      name,
      scale,
      isPublic
    })

    grade.orderGradeComposition.push(newGradeComposition._id)
    grade.gradeCompositionList.push(newGradeComposition)

    await grade.save()

    const dataClass = await Class.findById(classId)

    dataClass.studentsListUpload.forEach(async (student) => {
      const GradeStudent = mongoose.model('GradeStudent', GradeStudentSchema)
      const newStudent = new GradeStudent({
        studentId: student.userId,
        grade: 0
      })

      await Grade.findOneAndUpdate(
        { _id: grade._id, 'gradeCompositionList._id': newGradeComposition._id },
        { $push: { 'gradeCompositionList.$.studentGradeList': newStudent } },
        { new: true }
      )
    })

    // await newGradeComposition.save();

    return res.status(201).json({ success: true, data: grade })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const updateGradeComposition = async (req, res) => {
  const { classId, gradeCompositionId, name, scale, isPublic } = req.body

  try {
    // Sử dụng findOneAndUpdate để cập nhật phần tử trong mảng gradeCompositionList
    const updatedGradeComposition = await Grade.findOneAndUpdate(
      { classId, 'gradeCompositionList._id': gradeCompositionId },
      {
        $set: {
          'gradeCompositionList.$.name': name,
          'gradeCompositionList.$.scale': scale,
          'gradeCompositionList.$.isPublic': isPublic
        }
      },
      { new: true } // Trả về đối tượng đã được cập nhật
    )

    if (!updatedGradeComposition) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const grade = await Grade.findOne({ classId })
    return res.status(201).json({ success: true, data: grade })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const deleteGradeComposition = async (req, res) => {
  const { classId, gradeCompositionId } = req.params
  try {

    const gradeModel = await Grade.findOne({ classId })
    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    gradeModel.gradeCompositionList.pull({ _id: gradeCompositionId })
    gradeModel.orderGradeComposition.pull(gradeCompositionId)

    await gradeModel.save()

    return res.status(201).json({ success: true, data: gradeModel })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const getAllGradeCompositionByStudentId = async (req, res) => {
  const { classId, studentId } = req.body
  try {
    if (studentId === undefined || studentId === '') {
      return res.status(404).json({ success: false, message: 'Please mapping your account to see grade!' })
    }

    const mapOrder = (originalArray, orderArray, key) => {
      if (!originalArray || !orderArray || !key) return []

      const clonedArray = [...originalArray]
      const orderedArray = clonedArray.sort((a, b) => {
        return orderArray.indexOf(a[key]) - orderArray.indexOf(b[key])
      })

      return orderedArray
    }

    const gradeModel = await Grade.findOne({ classId })
    const gradeCompositionListDB = gradeModel.gradeCompositionList
    const orderGradeCompositionListDB = gradeModel.orderGradeComposition
    const gradeCompositionList = mapOrder(gradeCompositionListDB, orderGradeCompositionListDB, '_id')
    let result = []
    gradeCompositionList.map((data) => {
      const foundStudentGrade = data.studentGradeList.find(item => item.studentId === studentId)
      let studentGrade
      if (foundStudentGrade === undefined) {
        studentGrade = 0
      } else {
        studentGrade = foundStudentGrade.grade
      }
      result.push({
        composition: data.name,
        grade: studentGrade,
        scale: data.scale,
        isPublic: data.isPublic,
        time: data.time,
        _id: data._id
      })
    })
    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    await gradeModel.save()

    return res.status(201).json({ success: true, data: result })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const uploadGradeComposition = async (req, res) => {
  const { classId, compositionId, studentGradeList } = req.body
  try {

    const gradeModel = await Grade.findOne({ classId })
    let gradeComposition = gradeModel.gradeCompositionList.find((item) => item._id == compositionId)
    let gradeStudentList = []
    if (gradeComposition !== undefined) {
      studentGradeList.map((data) => {
        const GradeStudent = mongoose.model('GradeStudent', GradeStudentSchema)
        const newGradeComposition = new GradeStudent({
          studentId: data.StudentId,
          grade: data.Grade
        })
        gradeStudentList.push(newGradeComposition)
      })
      gradeComposition.studentGradeList = gradeStudentList
    }

    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    await gradeModel.save()

    return res.status(201).json({ success: true, data: studentGradeList })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const editGradeComposition = async (req, res) => {
  const { classId, listGradeComposition } = req.body
  try {

    if (listGradeComposition == null) {
      return res.status(404).json({ success: false, message: 'Can not find listGradeComposition' })
    }

    const gradeModel = await Grade.findOne({ classId })

    listGradeComposition.map((user) => {
      user.listGrade.map( async (composition) => {
        let compositionList = gradeModel.gradeCompositionList.find(item => item._id == composition._id)
        let student = compositionList.studentGradeList.find(item => item.studentId == user.id)
        if (student == null) {
          const GradeStudent = mongoose.model('GradeStudent', GradeStudentSchema)
          const newStudent = new GradeStudent({
            studentId: user.id,
            grade: composition.grade || 0
          })

          await Grade.findOneAndUpdate(
            { _id: gradeModel._id, 'gradeCompositionList._id': composition._id },
            { $push: { 'gradeCompositionList.$.studentGradeList': newStudent } },
            { new: true }
          )
        } else {
          student.grade = composition.grade
        }

      })
    })

    const checkIfExisStudent = (studentId, listUpload) => {
      let checkIsExis = false
      listUpload.map((user) => {
        if (user.userId === studentId) {
          checkIsExis = true
        }
      })
      return checkIsExis
    }

    const classData = await Class.findById(classId)
    const studentListByUpload = classData.studentsListUpload

    let compositionList = gradeModel.gradeCompositionList

    compositionList.forEach((composition) => {
      if (composition.studentGradeList) {
        composition.studentGradeList = composition.studentGradeList.filter((student) => {
          if (!checkIfExisStudent(student.studentId, studentListByUpload)) {
            return false // Exclude this student from the filtered array
          }
          return true // Include this student in the filtered array
        })
      }
    })

    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    await gradeModel.save()

    return res.status(201).json({ success: true, message: 'Success' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const updateOrderGradeComposition = async (req, res) => {
  const { classId, listOrderGradeComposition } = req.body
  try {

    const gradeModel = await Grade.findOne({ classId })
    gradeModel.orderGradeComposition = listOrderGradeComposition

    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    await gradeModel.save()

    return res.status(201).json({ success: true, message: 'Success' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const createNewReviewGrade = async (req, res) => {
  const { classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation } = req.body

  try {

    const grade = await Grade.findOne({ classId })
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const gradeComposition = grade.gradeCompositionList.find(
      (composition) => String(composition._id) === String(gradeCompositionId)
    )

    if (!gradeComposition) {
      return res.status(404).json({ success: false, message: 'Cannot find GradeComposition by ID' })
    }

    // Kiểm tra xem có review nào của studentId trong danh sách chưa
    const hasReviewed = gradeComposition.reviewGradeList.some(
      (review) => String(review.studentId) === String(studentId)
    )

    if (hasReviewed) {
      return res.status(400).json({ success: false, message: 'Each grade can only be appealed once. If you want to review a gain please delete previous review' })
    }

    const ReviewModel = mongoose.model('Review', Review)
    const student_Id = req.user._id

    const newReview = new ReviewModel({
      classId,
      gradeCompositionId,
      studentId,
      expectGrade,
      oldGrade,
      explanation,
      student_Id
    })

    gradeComposition.reviewGradeList.push(newReview)

    await grade.save()

    return res.status(201).json({ success: true, message: 'Send request review success', data: newReview })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const createNewComment = async (req, res) => {
  const { classId, gradeCompositionId, studentId, content, isTeacherComment } = req.body

  try {

    const grade = await Grade.findOne({ classId })
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const gradeComposition = grade.gradeCompositionList.find(
      (composition) => String(composition._id) === String(gradeCompositionId)
    )

    if (!gradeComposition) {
      return res.status(404).json({ success: false, message: 'Cannot find GradeComposition by ID' })
    }

    const reviewGrade = gradeComposition.reviewGradeList.find(
      (review) => String(review.studentId) === String(studentId)
    )

    if (!reviewGrade) {
      return res.status(404).json({ success: false, message: 'Cannot find Review Grade Composition' })
    }

    if (!req.user?.userId) {
      return res.status(404).json({ success: false, message: 'Please mapping your account to comment' })
    }

    const CommentModel = mongoose.model('Comment', Comment)

    const newComment= new CommentModel({
      userId: req.user.userId,
      content,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      isTeacherComment,
      image: req.user.image
    })

    reviewGrade.comment.push(newComment)

    await grade.save()

    return res.status(201).json({ success: true, message: 'Your comment posted' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const updateReviewGrade = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { classId, gradeCompositionId, studentId, expectGrade, oldGrade, explanation, explanationTeacher, reviewedGrade, status, teacher_Id } = req.body

  try {

    const grade = await Grade.findOne({ classId })
    if (!grade) {
      return res.status(404).json({ success: false, message: 'Cannot find Grade by ID of Class' })
    }

    const gradeComposition = grade.gradeCompositionList.find(
      composition => String(composition._id) === String(gradeCompositionId)
    )

    if (!gradeComposition) {
      return res.status(404).json({ success: false, message: 'Cannot find GradeComposition by ID' })
    }

    const student = gradeComposition.studentGradeList.find(student => student.studentId === studentId)
    if (!student) {
      const GradeStudent = mongoose.model('GradeStudent', GradeStudentSchema)
      const newGradeComposition = new GradeStudent({
        studentId: studentId,
        grade: reviewedGrade
      })
      gradeComposition.studentGradeList.push(newGradeComposition)
    } else {
      student.grade = reviewedGrade
    }

    const review = gradeComposition.reviewGradeList.find(
      review => String(review.studentId) === String(studentId)
    )

    if (!review) {
      return res.status(404).json({ success: false, message: 'Cannot find Review by Student ID' })
    }

    ['expectGrade', 'oldGrade', 'explanation', 'explanationTeacher', 'reviewedGrade', 'teacher_Id', 'status'].forEach(property => {
      if (req.body[property] !== null && req.body[property] !== undefined) {
        review[property] = req.body[property]
      }
    })

    await grade.save()

    return res.status(201).json({ success: true, message: 'Request success' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const deleteReviewGrade = async (req, res) => {
  const { classId, gradeCompositionId, userId } = req.params
  try {

    const gradeModel = await Grade.findOne({ classId })
    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const gradeComposition = gradeModel.gradeCompositionList.find(
      composition => String(composition._id) === String(gradeCompositionId)
    )

    if (!gradeComposition) {
      return res.status(404).json({ success: false, message: 'Cannot find GradeComposition by ID' })
    }

    gradeComposition.reviewGradeList.pull({ studentId: userId })

    await gradeModel.save()

    return res.status(201).json({ success: true, message: 'Delete Success' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const deleteComment = async (req, res) => {
  const { classId, gradeCompositionId, userId, commentId } = req.params
  try {

    const gradeModel = await Grade.findOne({ classId })
    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const gradeComposition = gradeModel.gradeCompositionList.find(
      composition => String(composition._id) === String(gradeCompositionId)
    )

    if (!gradeComposition) {
      return res.status(404).json({ success: false, message: 'Cannot find GradeComposition by ID' })
    }

    const review = gradeComposition.reviewGradeList.find(
      review => String(review.studentId) === String(userId)
    )

    if (!review) {
      return res.status(404).json({ success: false, message: 'Cannot find Review by Student ID' })
    }

    review.comment.pull({ _id: commentId })

    await gradeModel.save()

    return res.status(201).json({ success: true, message: 'Delete success' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const getAllReviewGradeCompositionByStudentId = async (req, res) => {
  const { classId, studentId } = req.body
  try {

    const grade = await Grade.findOne({ classId })

    if (!grade) {
      return res.status(404).json({ success: false, message: 'Cannot find Grade by ID of Class' })
    }

    const allReviews = []

    // Lặp qua mỗi GradeComposition
    for (const gradeComposition of grade.gradeCompositionList) {
      // Lặp qua mỗi Review trong reviewGradeList
      for (const review of gradeComposition.reviewGradeList) {
        // Chỉ thêm Review của student có studentId cần tìm
        if (String(review.studentId) === String(studentId)) {
          const student = await User.findOne({ userId: review.studentId })
          const studentFirstName = student ? student.firstName : ''
          const studentLastName = student ? student.lastName : ''

          const teacher = await User.findById(review.teacher_Id)
          const teacherFirstName = teacher ? teacher.firstName : ''
          const teacherLastName = teacher ? teacher.lastName : ''
          const teacherId = teacher ? teacher.userId : ''

          const composition = gradeComposition.name
          const scale = gradeComposition.scale

          allReviews.push({
            ...review._doc,
            composition,
            scale,
            studentFirstName,
            studentLastName,
            teacherFirstName,
            teacherLastName,
            teacherId
          })
        }
      }
    }

    // Chia danh sách thành hai dựa vào thuộc tính status
    const pendingReviews = allReviews.filter(review => review.status === 'Pending')
    const reviewedReviews = allReviews.filter(review => review.status === 'Reviewed')

    return res.status(200).json({
      success: true,
      data: {
        allReviews,
        pendingReviews,
        reviewedReviews
      }
    })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const getAllReviewGradeComposition = async (req, res) => {
  const { classId } = req.body
  try {

    const grade = await Grade.findOne({ classId })

    if (!grade) {
      return res.status(404).json({ success: false, message: 'Cannot find Grade by ID of Class' })
    }

    const allReviews = []

    // Lặp qua mỗi GradeComposition
    for (const gradeComposition of grade.gradeCompositionList) {
      // Lặp qua mỗi Review trong reviewGradeList
      for (const review of gradeComposition.reviewGradeList) {
        // Chỉ thêm Review của student có studentId cần tìm
        const student = await User.findOne({ userId: review.studentId })
        const studentFirstName = student ? student.firstName : ''
        const studentLastName = student ? student.lastName : ''

        const teacher = await User.findById(review.teacher_Id)
        const teacherFirstName = teacher ? teacher.firstName : ''
        const teacherLastName = teacher ? teacher.lastName : ''
        const teacherId = teacher ? teacher.userId : ''

        const composition = gradeComposition.name
        const scale = gradeComposition.scale

        allReviews.push({
          ...review._doc,
          composition,
          scale,
          studentFirstName,
          studentLastName,
          teacherFirstName,
          teacherLastName,
          teacherId
        })
      }
    }

    // Chia danh sách thành hai dựa vào thuộc tính status
    const pendingReviews = allReviews.filter(review => review.status === 'Pending')
    const reviewedReviews = allReviews.filter(review => review.status === 'Reviewed')

    return res.status(200).json({
      success: true,
      data: {
        allReviews,
        pendingReviews,
        reviewedReviews
      }
    })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const getAllComment = async (req, res) => {
  const { classId, gradeCompositionId, studentId } = req.body
  try {

    const gradeModel = await Grade.findOne({ classId })
    if (!gradeModel) {
      return res.status(404).json({ success: false, message: 'Can not find Grade by ID of Class' })
    }

    const gradeComposition = gradeModel.gradeCompositionList.find(
      composition => String(composition._id) === String(gradeCompositionId)
    )

    if (!gradeComposition) {
      return res.status(404).json({ success: false, message: 'Cannot find GradeComposition by ID' })
    }

    const review = gradeComposition.reviewGradeList.find(
      review => String(review.studentId) === String(studentId)
    )

    if (!review) {
      return res.status(404).json({ success: false, message: 'Cannot find Review by Student ID' })
    }

    return res.status(201).json({ success: true, data: review.comment })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

const isMappedAccount = async (req, res) => {
  const { classId, studentId } = req.body
  try {
    if (studentId === undefined || studentId === '') {
      return res.status(404).json({ success: false, message: 'Please mapping your account!' })
    }

    const classModel = await Class.findById(classId)
    const isExistStudent = classModel.studentsListUpload.find(student => student.userId === studentId)
    if (!isExistStudent) {
      return res.status(400).json({ success: false, message: 'Because your account has not been mapped, you cannot view!' })
    }

    return res.status(200).json({ success: true, message: 'Account mapped!' })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

module.exports = {
  getGradeComposition,
  createNewGradeComposition,
  deleteGradeComposition,
  updateGradeComposition,
  getAllGradeCompositionByStudentId,
  uploadGradeComposition,
  editGradeComposition,
  updateOrderGradeComposition,
  createNewReviewGrade,
  createNewComment,
  updateReviewGrade,
  deleteReviewGrade,
  deleteComment,
  getAllReviewGradeCompositionByStudentId,
  getAllReviewGradeComposition,
  getAllComment,
  isMappedAccount
}
