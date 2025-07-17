const Question = require('../Model/quiz');
const Result = require('../Model/Result');


const SubmitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;
    if(!req.user || !req.user.userId){
      return res.status(401).json({message:"Unaurhorized user not found in  request"})
    }
    const userId = req.user.userId;

    const allQuestions = await Question.find();

  
    if (!Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ message: "No answers submitted" });
    }

    let score = 0;
    const detailedAnswers = [];
    allQuestions.forEach((q) => {
      const userAnswer = answers.find(a => a.questionid === q._id.toString());

      const selectedAnswer = userAnswer ? userAnswer.selectedanswer : null;
      const isCorrect = selectedAnswer === q.correctAnswer;

      if (isCorrect) score++;

      detailedAnswers.push({
        questionid: q._id,
        selectedanswer: selectedAnswer || "Not Answered",
        isCorrect
      });
    });

    const result = await Result.create({
      user: userId,
      answers: detailedAnswers,
      score,
      quiz: allQuestions[0]._id 
    });

    res.status(200).json({
      message: 'Quiz submitted successfully',
      score,
      result
    });

  } catch (err) {
    console.error("SubmitQuiz error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
const ReviewQuiz = async (req, res) => {
  try {
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ message: "Unauthorized: user not found in request" });
    }
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
