const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema(
    {
        classId: {
            type: String,
            required: [true, "Please add a class id"],
            unique: true,
            trim: true,
        },
        className: {
            type: String,
            required: [true, "Please add a class name"]
        },
        isPublicGrade: {
            type: Boolean,
            default: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        teachers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],

        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            default: []
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Class", ClassSchema);  