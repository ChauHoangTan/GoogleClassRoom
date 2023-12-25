const mongoose = require('mongoose');
const CommentSchema = require('../Models/CommentModel')
const { Schema } = mongoose;

// Define ReviewModel Schema
const ReviewModelSchema = new Schema({
  studentId: { type: String, required: true },
  gradeCompositionId: { type: String, required: true },
  expectGrade: { type: Number, required: true },
  explanation: { type: [String], default: [] },
  comment: { type: [CommentSchema], default: [] }
});

// Create a model from the schema
// const Review = mongoose.model('Review', ReviewModelSchema);

// Export GradeModel for use elsewhere in the application
module.exports = ReviewModelSchema;
