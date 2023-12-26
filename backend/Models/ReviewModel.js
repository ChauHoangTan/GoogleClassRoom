const mongoose = require('mongoose');
const CommentSchema = require('../Models/CommentModel')
const { Schema } = mongoose;

// Define ReviewModel Schema
const ReviewModelSchema = new Schema({
  studentId: { type: String, required: true },
  gradeCompositionId: { type: String, required: true },
  expectGrade: { type: Number, required: true },
  oldGrade: { type: Number, required: true },
  reviewedGrade: { type: Number, required: true, default: 0 },
  explanation: { type: String, default: '' },
  explanationTeacher: { type: String, default: '' },
  comment: { type: [CommentSchema], default: [] },
  status: { type: String, default: 'Pending' },
  time: { type: Date, default: Date.now },
  teacher_Id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
},
{
  timestamps: true,
});

// Create a model from the schema
// const Review = mongoose.model('Review', ReviewModelSchema);

// Export GradeModel for use elsewhere in the application
module.exports = ReviewModelSchema;
