    const express=require('express')
    const {SubmitQuiz,ReviewQuiz}=require('../Controller/resultcontroller')
    const authmiddleware=require('../Middleware/authmiddleware')
    const router=express.Router()
    router.post('/submit',authmiddleware,SubmitQuiz)
    router.get('/review', authmiddleware, ReviewQuiz)
    module.exports =router