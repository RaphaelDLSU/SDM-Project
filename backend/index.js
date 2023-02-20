import express from 'express'
import dotenv from "dotenv"
import mongoose from "mongoose"
import studentRoute from "./backend/routes/student.js"


const app = express()
dotenv.config()

mongoose.set('strictQuery', false);


const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log("Connected to MongoDB on" + process.env.MONGO)
    }
    catch(error){
        throw error
    }
}

app.use("/student",studentRoute)



app.listen(3000,()=>{
    connect()
})