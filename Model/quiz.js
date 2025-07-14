const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: String,
  Option1: String,
  Option2: String,
  Option3: String,
  Option4: String,
  correctAnswer: String
});

module.exports = mongoose.model('Question', questionSchema);
