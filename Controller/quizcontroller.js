
const Quiz=require('../Model/quiz')
const createquiz= async(req,res)=>{
    const questionadded=req.body.questions
    try{
        const quiz= await Quiz.insertMany(questionadded);
        res.status(200).json({message:"Questions addded sucesfully" ,count:quiz.length , questions:quiz})

    }catch(err){
        res.status(500).json({error:err.message})
    }
}
const getallquestions= async(req,res)=>{
    try{
        const quizzes= await Quiz.find()
        res.json(quizzes)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}
module.exports ={createquiz,getallquestions}

