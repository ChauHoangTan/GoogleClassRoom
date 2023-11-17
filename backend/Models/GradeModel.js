const mongoose = require("mongoose");

const GradeSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a grade name"],
        },
        studentId: {
            type: String,
            required: [true, "Please add a student id"],
            trim: true,
        },
        classId: {
            type: String,
            required: [true, "Please add a class id"],
            trim: true,
        },
        grade: {
            type: Number,
            required: true
        },
        scale: {
            type: Number,
            required: true
        },
        assignmentList: [AssignmentSchema],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Grade", GradeSchema);  