const express = require("express");
const classController = require("../Controllers/ClassController");
// const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");
const { admin, teacher, student, isTeacherOrStudent, verifyInvitation } = require("../Middlewares/verifyToken");


const router = express.Router();

router.get("/all", passport.authenticate('jwt', { session: false }),classController.getAllClass);

router.get("/allMyCourses", passport.authenticate('jwt', { session: false }),classController.getAllClassByID);

router.post("/createNewClass", passport.authenticate('jwt', { session: false }),classController.createNewClass);

router.get("/teachers/all", passport.authenticate('jwt', { session: false }),classController.getAllTeachers);

router.get("/students/all", passport.authenticate('jwt', { session: false }), classController.getAllStudents);

router.get("/getClassByID/:id", passport.authenticate('jwt', { session: false }), isTeacherOrStudent, classController.getClassByID);

router.post("/joinClassByCode/", passport.authenticate('jwt', { session: false }), classController.joinClassByCode);

router.delete("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.deleteClass);

router.put("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.updateClass);

router.post("/invitation", passport.authenticate('jwt', { session: false }), verifyInvitation, classController.inviteClass);

router.post("/getInvitation", passport.authenticate('jwt', { session: false }), classController.getInviteClass);

module.exports = router;
