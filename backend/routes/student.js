import Student from '../models/Student.js'
import Users from '../models/Users.js';
import express from "express"
import {decodeToken} from 'react-jwt'

const router = express.Router()

router.get("/enroll", (req, res) => {
  console.log("Hi you're in student/enroll");
});

router.get("/register", (req, res) => {
    console.log("Connected to React"); // Connected to React
    res.redirect("/");
});



  
    

export default router