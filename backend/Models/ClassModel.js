const mongoose = require("mongoose");

const ClassSchema = mongoose.Schema(
    {
        classId: {
            type: String,
            required: [true, "Please add a class id"],
            // unique: true,
            trim: true,
        },
        className: {
            type: String,
            required: [true, "Please add a class name"],
            unique: true,
        },
        teachers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required
        }],

        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required
        }],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Class", ClassSchema);  