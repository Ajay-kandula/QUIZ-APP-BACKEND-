const express=require('express')
const router= express.Router()
const {register,login}= require('../Controller/authcontroller')
router.post('/Register',register)
router.post('/Login',login)
module.exports=router;