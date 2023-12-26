const mongoose = require("mongoose");

const studentsListUploadSchema = mongoose.Schema({
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    userId: {
        type: String,
        required: true,
    },
  });

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
        codeClassName: {
            type: String
        },
        background: {
            type: String
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
        studentsListUpload: [studentsListUploadSchema],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Class", ClassSchema);  