const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv =require('dotenv')
dotenv.config()
const app=express()
app.use(cors())
app.use(express.json())
const authroute=require('./Routes/authroute')
const quizroute=require('./Routes/quiz')
const resultroute=require('./Routes/resultroute')

app.use('/api/auth',authroute)
app.use('/api/quiz',quizroute)
app.use('/api/result',resultroute)

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log('mondodb connected'))
.catch(err=> console.error("Mongodb connected error",err))
app.get('/',(req,res)=>{
    res.send('quiz api is wroking')
})
const Port=process.env.PORT || 5000
app.listen(Port,()=>{
    console.log(`server running sucessfull on this port :${Port}`)
})