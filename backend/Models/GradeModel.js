const mongoose = require('mongoose');
const GradeCompositionSchema = require('../Models/GradeCompositionModel')
const { Schema } = mongoose;

// Define Grade Schema
const GradeSchema = new Schema({
  classId: { type: String, required: true },
  orderGradeComposition: { type: [String], default: []  },
  gradeCompositionList: { type: [GradeCompositionSchema], default: [] }
});

// Create a model from the schema
const GradeModel = mongoose.model('Grade', GradeSchema);

// Export GradeModel for use elsewhere in the application
module.exports = GradeModel;
