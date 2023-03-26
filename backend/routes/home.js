import express from "express"
import bcrypt from 'bcryptjs'
// Load all Mongoose models
import mongoose from "mongoose"
import Users from '../models/Users.js'
import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'
import Enrollment from "../models/Enrollment.js"


const router = express.Router()


router.post('/login',async(req,res)=>{
    const user = await Users.findOne({ //Maghahanap ng user na may email na sinet
        email:req.body.email
    })
    if (!user) {
		return { status: 'error', error: 'Invalid login' } //Send Response to JSX na walang user 
	}

    if(await bcrypt.compare(req.body.password,user.password)){

        const token=jwt.sign( // TOKEN = Global Variable
            {
                email:user.email
            },
            process.env.TOKEN_KEY
        )
        return res.json({status:'ok',user:token})
    }
    else{
        return res.json({status:'error',user:false})
    }   
    
})
router.post('/register', async (req,res)=>{ 
    
    try{
        const newPassword = await bcrypt.hash(req.body.password,10) // Decrypt Password
        const newUser = await Users.create({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:newPassword,
            type:"Student"
        }) // Create Student User in MongoDB  

        console.log('New User : '+ newUser)
        res.json({status:'ok'}) //Send response to front end

    }catch(err){
        res.json({ status: 'error', error: 'Duplicate email' })
    }
    
})
router.post("/enroll", async (req, res) => {

    const date = new Date();
  try{
    console.log ('Working start of enroll')
    
    console.log (req.body.userParsed)

    console.log('No. of Programs: '+req.body.numProgram+'Programs: '+JSON.stringify(req.body.program))

    const findUser = await Users.findOne({email:req.body.userParsed}) //Find user to get its ID

    await Student.create({ //Create Student
      user_ID:findUser._id, //Set User ID to student ID
      age:req.body.age,
      gender:req.body.gender,
      country:req.body.country,
      level:req.body.level,
      instrument:req.body.instrument,
      time:date.getDate()
        
    })

    try{
        for(let i=0;i<= req.body.numProgram.length;i++){ // Set Enrollment Values MAX :3
            
            const data = await Enrollment.create({
                user_ID:findUser._id,
                offer_ID:req.body.program[i].programName,
                instrument:req.body.program[i].instrument,
                numberOfSessions:req.body.program[i].programName,
                status:'Pending'
            }) //CREATE Enrollment of User based on what they enrolled in
            console.log('THIS IS ENROLLMENT: '+data)
            data.save()
        }
    }


    catch(err){
        console.log(err)
    }
    res.json({status:'ok'})

}catch(err){
    console.log(err)
    res.json({ status: 'error', error: 'Duplicate email IDK' })
}

});
router.post('/payment',async(req,res)=>{
    const paymentImg = req.body.postImage.myFile;
    const findUser = await Users.findOne({email:req.body.userParsed})

    try{
        const newImage = await Enrollment.findOneAndUpdate({user_ID:findUser._id},{paymentProof:paymentImg})
        newImage.save();
        res.json({status:'ok'})
   
        
    }catch(err){
        console.log(err)
    }
})

router.get('/enrollpending',async (req,res)=>{
    const data = await Enrollment.find()

    console.log("DATA IS HERE: "+data)

   res.send(data)
})

export default router