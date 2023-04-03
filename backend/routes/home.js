import express from "express"
import bcrypt from 'bcryptjs'
// Load all Mongoose models
import mongoose from "mongoose"
import Users from '../models/Users.js'
import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'
import Enrollment from "../models/Enrollment.js"
import PreferredClass from "../models/PreferredClass.js"
import Teacher from "../models/Teacher.js"
import FreeTrial from "../models/FreeTrial.js"
import Program from "../models/Program.js"
import Class from "../models/Classes.js"
import moment from 'moment'


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
                email:user.email,
                user_ID:user._id
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
    
    console.log (req.body.program)

    console.log('No. of Programs: '+req.body.numProgram+'Programs: '+JSON.stringify(req.body.program))

    const findUser = await Users.findOne({email:req.body.userParsed}) //Find user to get its ID
    const date =new Date()
    await Student.create({ //Create Student
      user_ID:findUser._id, //Set User ID to student ID
      age:req.body.age,
      gender:req.body.gender,
      country:req.body.country,
      level:req.body.level,
      instrument:req.body.instrument,
      
        
    })
    const enrollment = await Enrollment.create({
        status:'Pending',
        user_ID:findUser._id,
        time:date.toLocaleTimeString(),
        date: date.toLocaleDateString()
    })
    
    enrollment.save()


    try{
        for(let i=0;i<= req.body.program.length-1;i++){ // Set Enrollment Values MAX :3
            console.log('How many numPrograms: '+req.body.program.length)
            const data = await Program.create({
                user_ID:findUser._id,
                enrollment_ID:enrollment._id,
                program:req.body.program[i].programName,
                instrument:req.body.program[i].instrument,
                numSessions:req.body.program[i].numSessions,
                status:'Not Scheduled'
                
            }) //CREATE Enrollment of User based on what they enrolled in
            console.log('THIS IS PROGRAM: '+data)
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

router.put('/enrollpending',async (req,res)=>{
    const data = await Enrollment.find({status:'Pending'})



   res.send(data)
})

router.post('/enrollfree/filter',async(req,res)=>{
    console.log('This is instrument and day filter '+req.body.filterInstrument+' '+req.body.filterDay)
    const instrument = req.body.filterInstrument
    let day = req.body.filterDay

    if (day=='Thursday'){
        day = 'H'
    }else if(day=='Sunday'){
       day ='U'
    }else{
        day = Array.from(day)[0] 
    }
    console.log('Instrument : '+instrument)
    console.log('Day: '+day)
    const data = await PreferredClass.find({days:{$regex:day},instrument:{$regex:instrument}})
    console.log('Data: '+data)
    res.send(data)

})
router.put('/enrollpending/query',async (req,res)=>{ //Get data of user
    const id = JSON.stringify(req.body)

    console.log("Teacher name in filter: "+ id)
    const data = await Users.findOne({_id:req.body.id})

    console.log("Teacher name in filter: "+data)

   res.send(data)
})

router.put('/enrollpending/details',async (req,res)=>{ //Get data of user
   
    const data = await Users.findOne({_id:req.body.input.input.user_ID})
  
    const data2  = await Student.findOne({user_ID:req.body.input.input.user_ID})

    const data3= await Program.find({enrollment_ID:req.body.input.input._id})
    
    console.log('Data 3: '+data3)
    let arr = [data,data2,data3]
   res.send(arr)
   console.log('Home '+arr)
})  

router.post('/enrollfree/enroll',async (req,res)=>{ //Get data of user
   const preferredClass = await PreferredClass.findOne({_id:req.body.schedule})

   console.log("First Name :"+req.body.firstName)
   
    const trial = await FreeTrial.create({
    class_ID:preferredClass._id,
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    country:req.body.country,
    gender:req.body.gender,
    parent:req.body.parent,
    level:req.body.level,
    status:'Pending'    
   })

   console.log('Free Trial: '+trial)
})

router.put('/teacherschedule',async (req,res)=>{
   

    const data = await PreferredClass.find({teacher_ID:req.body.user.user_ID})
    const teacher = await Teacher.findOne({teacherId:req.body.user.user_ID})
    const arr = [data,teacher]
    res.send(arr)
})
router.post('/teacherschedule/add',async (req,res)=>{
    const startTime = moment(req.body.time, ["HH:mm"]).format("LT");
    console.log(req.body.program)
    let endTime

    if(req.body.program=='1 hour'){
        endTime = moment.utc(req.body.time,'HH:mm').add(1,'h').format('LT')
        console.log('End time 1 hour: '+endTime)
    }else if(req.body.program=='30 min'){
        endTime = moment.utc(req.body.time,'HH:mm').add(30,'m').format('LT')
        console.log('End time 30 min: '+endTime)
    }else {
        endTime = moment.utc(req.body.time,'HH:mm').add(15,'m').format('LT')
        console.log('End time 15 min    : '+endTime)
    }

    const preferredClass = await PreferredClass.create({
        teacher_ID:req.body.user.user_ID,
        days:req.body.day,
        zoomLink:req.body.zoom,
        program:req.body.program,
        status:'Available',
        startTime:startTime,
        endTime:endTime,
        instrument:req.body.teacher.instrument

    })
    console.log('New Preferred Class: '+preferredClass)
   res.json({status:'ok'})
})

router.put('/enrollpending/approve',async (req,res)=>{
    const enrollment = req.body.inputTemp.input

    console.log('This is enrollment :'+enrollment._id)
    await Enrollment.updateOne({_id:enrollment._id},{status:'Approved'})
    console.log('This is update :'+JSON.stringify(enrollment))

    const newEnroll = Enrollment.find({status:'Pending'})
    res.json({status:'ok',newEnroll:newEnroll})
})
router.put  ('/schedulepage',async (req,res)=>{
    const data = await Program.find({user_ID:req.body.user.user_ID})
    res.send(data)
})
router.put  ('/schedulecreate',async (req,res)=>{
    console.log(req.body.program)
    const data = await PreferredClass.find({instrument:{$regex:req.body.program.instrument},program:{$regex:req.body.program.program}})
    res.send(data)
})
router.put  ('/schedulecreate/table',async (req,res)=>{
    const data = await Users.findOne({_id:req.body.id})
    res.send(data)
})
router.put('/schedulecreate/approvesched',async(req,res)=>{


})




export default router