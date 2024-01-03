const mongoose = require('mongoose')

const ReviewSchema = mongoose.Schema(
  {
    StudentId: {
      type: String,
      required: [true, 'Please add a student id'],
      unique: true,
      trim: true
    },
    gradeId: {
      type: String,
      required: [true, 'Please add a grade name'],
      unique: true,
      trim: true
    },
    expectGrade: {
      type: Number,
      required: true
    },

    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Review', ReviewSchema)