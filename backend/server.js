import express from 'express'
import cors from 'cors'
import { db } from './config/db.js'
import {User} from './model/User.js'
import { userRouter } from './routes/user.js'
import todoRouter from './routes/todo.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'

dotenv.config()

const app=express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use('/user',userRouter)
app.use('/user',todoRouter)

db.sync()
.then(()=>{
    console.log("Database Connected")
}).catch(err=>console.log("Database error:"+err))

app.listen(3000,()=>{
    console.log("App listening at port 3000")
})