const mongoose = require('mongoose');

const answerschema = new mongoose.Schema({
  questionid: { type: mongoose.Schema.Types.ObjectId, required: true },
  selectedanswer: { type: String, required: true },
  isCorrect: { type: Boolean, required: true }
});

const resultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  answers: [answerschema],
  score: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
