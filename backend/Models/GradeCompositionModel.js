const mongoose = require('mongoose');
const ReviewModelSchema = require('../Models/ReviewModel');
const GradeStudentSchema = require('../Models/GradeStudentModel');
const { Schema } = mongoose;

// Define GradeComposition Schema
const GradeCompositionSchema = new Schema({
  name: { type: String, required: true },
  scale: { type: Number, required: true },
  reviewGradeList: { type: [ReviewModelSchema], default: [] },
  studentGradeList: { type: [GradeStudentSchema], default: [] },
  isPublic: { type: Boolean, default: false },
  // _id: { type: String, required: true, unique: true },
  time: { type: Date, default: Date.now }
});

// Create a model from the schema
// const GradeComposition = mongoose.model('GradeComposition', GradeCompositionSchema);

// Export GradeModel for use elsewhere in the application
module.exports = GradeCompositionSchema;
