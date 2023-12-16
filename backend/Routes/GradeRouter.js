const express = require("express");
const gradeController = require("../Controllers/GradeController");
// const { verifyEmail, admin } = require("../Middlewares/verifyToken");
const passport = require("passport");
const passportConfig = require("../Middlewares/passport");

const router = express.Router();

router.get("/allGradeCompositionByIdClass", passport.authenticate('jwt', { session: false }), gradeController.getGradeComposition);
router.post("/create", passport.authenticate('jwt', { session: false }), gradeController.createNewGradeComposition);
router.delete("/delete", passport.authenticate('jwt', { session: false }), gradeController.deleteGradeComposition);
router.post("/update", passport.authenticate('jwt', { session: false }), gradeController.updateGradeComposition);
module.exports = router;
