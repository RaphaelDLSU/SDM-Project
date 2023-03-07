import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from "mongoose"
import studentRoute from "./routes/student.js"
import homeRoute from "./routes/home.js"

const app = express()
app.use(cors())
app.use(express.json())
dotenv.config()

mongoose.set('strictQuery', false);


const connect = async() =>{
    try{
        await mongoose.connect(process.env.MONGO,{dbName:'sdmflow'})
        console.log("Connected to MongoDB on" + process.env.MONGO)
    }
    catch(error){
        throw error
    }
}

app.use("/",homeRoute)
app.use("/student",studentRoute) 


app.listen(5000,()=>{
    connect()
})