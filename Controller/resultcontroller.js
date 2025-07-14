const Question = require('../Model/quiz');
const Result = require('../Model/Result');

const SubmitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    const userId = req.user.userId;

    const allQuestions = await Question.find();

    if (answers.length !== allQuestions.length) {
      return res.status(400).json({ message: "Answers count mismatch" });
    }

    let score = 0;
    const detailedAnswers = [];

    allQuestions.forEach((q, index) => {
      const selectedAnswer = answers[index]?.selectedanswer;
      const isCorrect = selectedAnswer === q.correctAnswer;
      if (isCorrect) score++;

      detailedAnswers.push({
        questionId: q._id,
        selectedanswer: selectedAnswer,
        isCorrect
      });
    });

    const result = await Result.create({
      user: userId,
      answers: detailedAnswers,
      score
    });

    res.status(200).json({ message: 'Quiz submitted successfully', score, result });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const ReviewQuiz = async (req, res) => {
  try {
    const userId = req.user.userId;

    const result = await Result.findOne({ user: userId }).populate('user').populate('quiz');

    if (!result) {
      return res.status(404).json({ message: "Result not found" });
    }

    const allQuestions = await Question.find();

    const review = result.answers.map((a) => {
      const question = allQuestions.find(q => q._id.toString() === a.questionId.toString());
      return {
        question: question?.question,
        selectedanswer: a.selectedanswer,
        correctAnswer: question?.correctAnswer,
        isCorrect: a.isCorrect
      };
    });

    res.json({ answers: review });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { SubmitQuiz, ReviewQuiz };
