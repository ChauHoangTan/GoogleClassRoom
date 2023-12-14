const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define Comment Schema
const CommentSchema = new Schema({
  userId: { type: String, required: true },
  content: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

// Create a model from the schema
// const Comment = mongoose.model('Comment', CommentSchema);

// Export GradeModel for use elsewhere in the application
module.exports = CommentSchema;
