import express from "express"
import bcrypt from 'bcryptjs'
// Load all Mongoose models
import mongoose from "mongoose"
import Users from '../models/Users.js'
import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'
import Enrollment from "../models/Enrollment.js"


const router = express.Router()

router.get('/',(req,res) =>{
    console.log(localStorage.getItem('token')) //Doesn't work. Use useEffect in .jsx instead
})


router.post('/login',async(req,res)=>{
    const user = await Users.findOne({
        email:req.body.email
    })
    if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

    if(await bcrypt.compare(req.body.password,user.password)){
        const token=jwt.sign(
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
        const newPassword = await bcrypt.hash(req.body.password,10)
        const newUser = await Users.create({
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            password:newPassword,
            type:"Student"
        }) // Create Student User in MongoDB 
        console.log('New User : '+ newUser)
        res.json({status:'ok'})

    }catch(err){
        res.json({ status: 'error', error: 'Duplicate email' })
    }
    
})
router.post("/enroll", async (req, res) => {
  try{
    console.log ('Working start of enroll')
    
    console.log (req.body.userParsed)

    console.log('No. of Programs: '+req.body.numProgram+'Programs: '+JSON.stringify(req.body.program))
    const findUser = await Users.findOne({email:req.body.userParsed})

    await Student.create({
      student_ID:findUser._id,
      age:req.body.age,
      gender:req.body.gender,
      country:req.body.country,
      level:req.body.level,
        
    })

    try{
        for(let i=0;i<= req.body.numProgram.length;i++){
            
            const data = await Enrollment.create({
                user_ID:findUser._id,
                offer_ID:req.body.program[i].programName,
                instrument:req.body.program[i].instrument,
                numberOfSessions:req.body.program[i].programName,
                status:'Pending'
            })
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
    res.json({ status: 'error', error: 'Duplicate email' })
}

});

export default router