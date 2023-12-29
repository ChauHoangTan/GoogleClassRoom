const express = require("express");
const classController = require("../Controllers/ClassController");
// const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");
const { admin, teacher, student, isTeacherOrStudent, verifyInvitationByUrl, verifyInvitationByEmail } = require("../Middlewares/verifyToken");


const router = express.Router();

router.get("/all", passport.authenticate('jwt', { session: false }),classController.getAllClass);

router.get("/allMyCourses", passport.authenticate('jwt', { session: false }),classController.getAllClassByID);

router.get("/allClass", passport.authenticate('jwt', { session: false }),classController.getAllClassTeachAndStudyByID);

router.post("/createNewClass", passport.authenticate('jwt', { session: false }),classController.createNewClass);

router.post("/teachers/all", passport.authenticate('jwt', { session: false }),classController.getAllTeachers);

router.post("/students/all", passport.authenticate('jwt', { session: false }), classController.getAllStudents);

router.get("/getClassByID/:id", passport.authenticate('jwt', { session: false }), isTeacherOrStudent, classController.getClassByID);

router.post("/joinClassByCode/", passport.authenticate('jwt', { session: false }), classController.joinClassByCode);

router.delete("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.deleteClass);

router.put("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.updateClass);

router.post("/invitationStudent", passport.authenticate('jwt', { session: false }), verifyInvitationByUrl, classController.inviteClassStudent);

router.post("/getInvitationStudent", passport.authenticate('jwt', { session: false }), classController.getInviteClassStudent);

router.post("/invitationTeacher", passport.authenticate('jwt', { session: false }), verifyInvitationByUrl, classController.inviteClassTeacher);

router.post("/getInvitationTeacher", passport.authenticate('jwt', { session: false }), classController.getInviteClassTeacher);

router.post("/send-invitation", classController.sendInvitateEmail);

router.post("/receive-invitation", passport.authenticate('jwt', { session: false }), verifyInvitationByEmail, classController.receiveInvitateEmail);

router.post("/students/upload", passport.authenticate('jwt', { session: false }), classController.getStudentsListByUploadFile);

router.post("/students/allTypeOfStudents", passport.authenticate('jwt', { session: false }), classController.getAllTypeOfStudents);

router.post("/students/getStudentIdList", passport.authenticate('jwt', { session: false }), classController.getStudentIdListByUpload);

router.post("/leaveThisClass", passport.authenticate('jwt', { session: false }), classController.leaveThisClass);

router.post("/getRoleInClass", passport.authenticate('jwt', { session: false }), classController.getRoleInClassByUserId);

router.post("/kickUserOutOfClass", passport.authenticate('jwt', { session: false }), classController.kickUserOutOfClass);

module.exports = router;
