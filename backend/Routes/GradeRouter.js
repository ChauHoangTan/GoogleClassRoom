const express = require("express");
const gradeController = require("../Controllers/GradeController");
// const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");

const router = express.Router();

router.post("/allGradeCompositionByIdClass", passport.authenticate('jwt', { session: false }), gradeController.getGradeComposition);
router.post("/create", passport.authenticate('jwt', { session: false }), gradeController.createNewGradeComposition);
router.delete("/delete/:classId/:gradeCompositionId", passport.authenticate('jwt', { session: false }), gradeController.deleteGradeComposition);
router.post("/update", passport.authenticate('jwt', { session: false }), gradeController.updateGradeComposition);
router.post("/getGradeCompositionByStudentId", passport.authenticate('jwt', { session: false }), gradeController.getAllGradeCompositionByStudentId);
router.post("/uploadGradeComposition", passport.authenticate('jwt', { session: false }), gradeController.uploadGradeComposition);
router.post("/createNewReviewGrade", passport.authenticate('jwt', { session: false }), gradeController.createNewReviewGrade);
router.post("/createNewComment", passport.authenticate('jwt', { session: false }), gradeController.createNewComment);
router.post("/updateReviewGrade", passport.authenticate('jwt', { session: false }), gradeController.updateReviewGrade);
router.delete("/deleteReviewGrade/:classId/:gradeCompositionId/:userId", passport.authenticate('jwt', { session: false }), gradeController.deleteReviewGrade);
router.delete("/deleteComment/:classId/:gradeCompositionId/:userId/:commentId", passport.authenticate('jwt', { session: false }), gradeController.deleteComment);
router.post("/getAllReviewGradeCompositionByStudentId", passport.authenticate('jwt', { session: false }), gradeController.getAllReviewGradeCompositionByStudentId);
router.post("/getAllReviewGradeComposition", passport.authenticate('jwt', { session: false }), gradeController.getAllReviewGradeComposition);

module.exports = router;
