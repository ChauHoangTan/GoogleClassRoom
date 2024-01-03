const express = require('express')
const gradeController = require('../Controllers/GradeController')
// const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require('passport')
// eslint-disable-next-line no-unused-vars
const passportConfig = require('../Middlewares/passport')
const { isTeacherOrStudent, teacher } = require('../Middlewares/verifyToken')

const router = express.Router()

router.post('/allGradeCompositionByIdClass', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.getGradeComposition)
router.post('/create', passport.authenticate('jwt', { session: false }), gradeController.createNewGradeComposition)
router.delete('/delete/:classId/:gradeCompositionId', passport.authenticate('jwt', { session: false }), teacher, gradeController.deleteGradeComposition)
router.post('/update', passport.authenticate('jwt', { session: false }), teacher, gradeController.updateGradeComposition)
router.post('/getGradeCompositionByStudentId', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.getAllGradeCompositionByStudentId)
router.post('/uploadGradeComposition', passport.authenticate('jwt', { session: false }), teacher, gradeController.uploadGradeComposition)
router.post('/editGradeComposition', passport.authenticate('jwt', { session: false }), teacher, gradeController.editGradeComposition)
router.post('/updateOrderGradeComposition', passport.authenticate('jwt', { session: false }), teacher, gradeController.updateOrderGradeComposition)
router.post('/createNewReviewGrade', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.createNewReviewGrade)
router.post('/createNewComment', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.createNewComment)
router.post('/updateReviewGrade', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.updateReviewGrade)
router.delete('/deleteReviewGrade/:classId/:gradeCompositionId/:userId', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.deleteReviewGrade)
router.delete('/deleteComment/:classId/:gradeCompositionId/:userId/:commentId', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.deleteComment)
router.post('/getAllReviewGradeCompositionByStudentId', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.getAllReviewGradeCompositionByStudentId)
router.post('/getAllReviewGradeComposition', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.getAllReviewGradeComposition)
router.post('/getAllComment', passport.authenticate('jwt', { session: false }), isTeacherOrStudent, gradeController.getAllComment)

module.exports = router
