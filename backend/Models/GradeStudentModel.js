const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define GradeStudent Schema
const GradeStudentSchema = new Schema({
  studentId: { type: String, required: true },
  grade: { type: Number, required: true }
});

// Create a model from the schema
// const GradeStudent = mongoose.model('GradeStudent', GradeStudentSchema);

// Export GradeModel for use elsewhere in the application
module.exports = GradeStudentSchema;
