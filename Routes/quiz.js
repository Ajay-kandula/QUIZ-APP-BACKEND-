const express=require('express')
const {createquiz,getallquestions} =require('../Controller/quizcontroller')
const authmiddleware=require('../Middleware/authmiddleware')
const router=express.Router()
router.post('/Create',createquiz)
router.get('/getallquestions',authmiddleware,getallquestions)
module.exports=router;