const express = require("express");
const classController = require("../Controllers/ClassController");
// const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");
const { admin } = require("../Middlewares/verifyToken");

const router = express.Router();

router.get("/all", passport.authenticate('jwt', { session: false }),classController.getAllClass);
router.get("/allMyCourses", passport.authenticate('jwt', { session: false }),classController.getAllClassByID);
router.post("/createNewClass", passport.authenticate('jwt', { session: false }),classController.createNewClass);
router.get("/teachers/all", passport.authenticate('jwt', { session: false }),classController.getAllTeachers);
router.get("/students/all", passport.authenticate('jwt', { session: false }), classController.getAllStudents);
router.delete("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.deleteClass);
router.put("/all/:id", passport.authenticate('jwt', { session: false }), admin, classController.updateClass);

module.exports = router;
