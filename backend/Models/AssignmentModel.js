const mongoose = require("mongoose");

const AssignmentSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a class id"],
        },
        grade: {
            type: Number,
            required: true
        },
        scale: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Assignment", AssignmentSchema);  