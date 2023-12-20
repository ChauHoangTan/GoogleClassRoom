const express = require("express");
const classController = require("../Controllers/ClassController");
// const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");
const { admin, teacher, student, isTeacherOrStudent, verifyInvitation } = require("../Middlewares/verifyToken");

const router = express.Router();

router.get("/all", passport.authenticate('jwt', { session: false }),classController.getAllClass);
router.get("/allMyCourses", passport.authenticate('jwt', { session: false }), classController.getAllClassByID);
router.post("/createNewClass", passport.authenticate('jwt', { session: false }),classController.createNewClass);
router.get("/allTeachers", passport.authenticate('jwt', { session: false }), classController.getAllTeachers);
router.get("/allStudents", passport.authenticate('jwt', { session: false }), classController.getAllStudents);
router.get("/getClassByID/:id", passport.authenticate('jwt', { session: false }), isTeacherOrStudent, classController.getClassByID);
router.post("/joinClassByCode/", passport.authenticate('jwt', { session: false }), classController.joinClassByCode);
router.delete("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.deleteClass);
router.post("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.updateClass);
router.post("/invitation", passport.authenticate('jwt', { session: false }), verifyInvitation, classController.inviteClass);
router.post("/getInvitation", passport.authenticate('jwt', { session: false }), classController.getInviteClass);

// router.put("/profile", passport.authenticate('jwt', { session: false }), userController.updateUserProfile);

// router.put("/password", passport.authenticate('jwt', { session: false }), userController.changeUserPassword);

// router.get("/info", passport.authenticate('jwt', { session: false }), userController.getUserInfo);

// router.post("/all", passport.authenticate('jwt', { session: false }), admin, userController.getAllUser);

// router.post("/detail/:id", passport.authenticate('jwt', { session: false }), admin, userController.getAllUser);

// router.delete("/user/find/:id", passport.authenticate('jwt', { session: false }), admin, userController.deleteUser);

// router.post("/block/:id", passport.authenticate('jwt', { session: false }), admin, userController.blockUser);

// router.post("/ban/:id", passport.authenticate('jwt', { session: false }), admin, userController.banUser);

module.exports = router;
