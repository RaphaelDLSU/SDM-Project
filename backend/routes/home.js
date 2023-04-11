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
        date: date.toLocaleDateString(),
        paymentStatus:'Not paid',
    })
    
    enrollment.save()

    let paymentWhole = 0
    try{
        
        for(let i=0;i<= req.body.program.length-1;i++){ // Set Enrollment Values MAX :3
            console.log('How many numPrograms: '+req.body.program.length)
            let program = req.body.program[i].programName
            let numSessions = req.body.program[i].numSessions
            let payment =0
            
            console.log('program and payment :'+req.body.program[i].programName+' '+payment)
            
            if(program =='1 hour'){
                if(numSessions=='4')
                    payment=3490
                else if(numSessions=='8'){
                    payment=6490
                }
                else if(numSessions=='12'){
                    payment=9090
                }
                else if(numSessions=='20'){
                    payment=14490
                }
            }else if(program =='30 min'){
                if(numSessions=='8')
                payment=3490
                else if(numSessions=='12'){
                    payment=4790
                }
                else if(numSessions=='20'){
                    payment=7490
                }
            }
            const data = await Program.create({
                user_ID:findUser._id,
                enrollment_ID:enrollment._id,
                program:req.body.program[i].programName,
                instrument:req.body.program[i].instrument,
                numSessions:req.body.program[i].numSessions,
                status:'Not Scheduled',
                payment:payment
                
            })
            paymentWhole +=payment

            

            data.save()
        }   
    }
    catch(err){
        console.log(err)
    }
    console.log('Payment :'+paymentWhole)
    await Enrollment.updateOne({_id:enrollment._id},{'$set':{paymentWhole:paymentWhole}})

    res.json({status:'ok'})

}catch(err){
    console.log(err)
    res.json({ status: 'error', error: 'Duplicate email IDK' })
}

});
router.post('/payment',async(req,res)=>{
    const paymentImg = req.body.postImage.myFile;
    const findUser = await Users.findOne({email:req.body.userParsed})
    let paymentStatus

  
    try{
        const newImage = await Enrollment.findOneAndUpdate({user_ID:findUser._id},{'$set':{paymentProof:paymentImg,paymentOption:req.body.paymentOption,paymentType:req.body.paymentType}})
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
    age:req.body.age,
    status:'Pending'    
   })

   console.log('Free Trial: '+trial)
})

router.put('/freetrialpending',async (req,res) =>{
    const freeTrial = await FreeTrial.find({status: 'Pending'})
    const preferredClass = await PreferredClass.findOne({class_ID:req.body.schedule})

    let arr = [freeTrial, preferredClass]
    res.send(arr)

    console.log('Test' +arr)
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
    let paymentStatus
    let paymentMultiplier
    const enrollment = req.body.inputTemp.input

    const enrollmentQuery = await Enrollment.findOne({_id:enrollment._id})


    
    if(enrollmentQuery.paymentType=='50% Payment'){
        paymentStatus = 'Half Paid'
        paymentMultiplier = .5*enrollmentQuery.paymentWhole   
      
    }else{      
        paymentStatus = 'Fully Paid'
        paymentMultiplier = 0
    }
    await Enrollment.findOneAndUpdate({_id:enrollment._id},{'$set':{paymentStatus:paymentStatus,paymentRemaining:paymentMultiplier,status:'Approved'}})

    await Student.findOneAndUpdate({_id:req.body.student._id},{'$set':{status:'Enrolled '}})

    res.json({status:'ok'})
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

    console.log('Teacher Temp: '+JSON.stringify(req.body.teacherTemp))
    
    const getDay =(day)=>{
        const parsedDay = moment(day).format('dddd')
        if(parsedDay=='Thursday'){
            return 'H'
        }else if(parsedDay=='Sunday'){
            return 'U'
        }else{
            return Array.from(parsedDay)[0]
        }
    }
    const hasLetter = (str, char) =>{
        for(var i = 0; i < str.length; i++) {
          if (str[i] == char) {
            return true;
          }
        }
        
        return false;
      };

      let startDate =req.body.startDate
      console.log('Check '+req.body.user.user_ID+' '+req.body.classesTemp._id+' '+moment(req.body.startDate).format('LL'))

    for(let i=0;i<req.body.program.numSessions;i++){
        let parsedDay = moment(startDate).format('dddd')
        let dayLetter = getDay(startDate)
        if(hasLetter(req.body.classesTemp.days,dayLetter)){
            await Class.create({
                user_ID:req.body.user.user_ID,
                preferred_ClassID:req.body.classesTemp._id,
                program_ID:req.body.program._id,
                date:moment(startDate).format('LL'),
                attendance:'',
                note:'',
                teacher_ID:req.body.teacherTemp._id,
                day:parsedDay,
                realDate:startDate ,
                program:req.body.program.program

            })
        }else{
            i--
        }

        startDate = moment(startDate).add(1,"days")

       

    }
    const student = await Student.findOneAndUpdate({user_ID:req.body.user.user_ID},{'$set':{teacher_ID:req.body.teacherTemp._id}})
    const teacher = await Teacher.findOneAndUpdate({teacherId:req.body.teacherTemp._id},{'$set':{hasStudents:true}})
    const preferredClass = await PreferredClass.findOneAndUpdate({_id:req.body.classesTemp._id},{'$set':{student_ID:req.body.user.user_ID,status:'Unavailable'}})

    console.log('Preferred Class: '+preferredClass)
    await Program.findOneAndUpdate({_id:req.body.program._id},{'$set':{teacher_ID:req.body.teacherTemp._id}})

})

router.put('/studentrecords',async (req,res)=>{
    const data = await Users.find({type:'Student'})
    console.log('data :'+data)  
   res.send(data)
})

router.put('/studentrecords/details',async (req,res)=>{
    const data = await Enrollment.findOne({user_ID:req.body.id})
    console.log('Enrollment :'+data)
   res.send(data)
})
router.put(`/studentrecords/details/specific`,async (req,res)=>{
    const data = await Enrollment.findOne({user_ID:req.body.user_ID})
    const data2 = await Program.find({enrollment_ID:data._id})

    console.log('Program: '+data2)


   res.send(data2)
})

router.put('/facultymembers',async (req,res)=>{
    const data = await Teacher.find({instrument:{$regex:'Guitar'}})
    console.log('Teacher :'+data)
    res.send(data)
})
router.put(`/studentrecords/details/specific/program`,async (req,res)=>{
 
    const data = await Enrollment.findOne({user_ID:req.body.user_ID})


    const data2 = await Class.findOne({program_ID:req.body.program._id})  

    console.log('Program:  WHAT THE FUCK IS THIS '+data2+' '+req.body.program._id)
    const data3 = await PreferredClass.findOne({_id:data2.preferred_ClassID})
    const data4 = await Student.findOne({user_ID:req.body.user_ID})  
    const data5= await Users.findOne({_id:data3.teacher_ID})

    const completeClass = await Class.find({program_ID:req.body.program._id,attendance:'Present'})
    const remainingClass = await Class.find({program_ID:req.body.program._id,$or:[{attendance:'Absent'},{attendance:''}]})

    const arr=[data,data3,data4,data5,completeClass.length,remainingClass.length]

    res.send(arr)

})

router.put('/facultymanage',async(req,res)=>{
    const data = await Users.find({type:'Teacher'})
    res.send(data)
})
router.put('/facultymanage/details',async(req,res)=>{

   
    const data = await Teacher.findOne({teacherId:req.body.id})

    console.log('Teacher id: '+data)
    res.send(data)
})
router.put('/facultymanage/details/specific',async(req,res)=>{

    const data = await PreferredClass.find({teacher_ID:req.body.user._id})

    res.send(data)
})
router.put('/facultymanage/details/specific/class',async(req,res)=>{


    const classes = await Class.find({preferred_ClassID:req.body.preferredClass._id})
    res.send(classes)
})
router.put('/mystudents',async(req,res)=>{   

    const studentUser = await Student.find({teacher_ID:req.body.user.user_ID})

    console.log('User HERE'+studentUser)   
    res.send(studentUser)
})
router.put('/mystudents/details',async(req,res)=>{
    console.log(req.body.student)

    const user = await Users.findOne({_id:req.body.student.user_ID})
    res.send(user)
})
router.put('/mystudents/levelchange',async(req,res)=>{
    const level = await Student.findOneAndUpdate({_id:req.body.student._id},{'$set':{level:req.body.e}})
    level.save()
})
router.put('/mystudents/manage',async(req,res)=>{
  const programs = await Program.find({'$and':[{teacher_ID:req.body.teacher.user_ID},{user_ID:req.body.student._id}]})
  res.send(programs)
})
router.put('/mystudents/manage/sessions',async(req,res)=>{
    let classes
    if(!req.body.isPast){
        console.log('isPast :'+req.body.program._id)
        classes = await Class.find({'$and':[{program_ID:req.body.program._id},{attendance:''}]})
    }
    else{
        console.log('notPast :'+ req.body.program._id)
        classes = await Class.find({'$and':[{program_ID:req.body.program._id},{attendance:{'$nin':[null,'']}}]})
    }
   
    console.log('Classes: '+classes)
    res.send(classes)
})
router.put('/mystudents/manage/sessions/details',async(req,res)=>{

    const preferredClass = await PreferredClass.findOne({_id:req.body.classes.preferred_ClassID})
   
    res.send(preferredClass)
})
router.put('/mystudents/manage/sessions/update',async(req,res)=>{

    const classes = await Class.findOne({_id:req.body.classes._id})
    const today = new Date()
    if(classes.realDate.setHours(0,0,0,0)!=today.setHours(0,0,0,0)){
        res.status(404)
      
    }else  {
        const classes = await Class.findOneAndUpdate({_id:req.body.classes._id},{'$set':{attendance:req.body.attendance,note:req.body.notes}})
        res.status(500)
    }


  
   res.send(classes)
})
router.put('/payroll',async(req,res)=>{

    const users = await Teacher.find({hasStudents:true})

  
   res.send(users)
})
router.put('/payroll/list',async(req,res)=>{
    const teacher = await Users.findOne({_id:req.body.teacher.teacherId})

    

  
   res.send(teacher)
})
router.put('/payroll/getclasses',async(req,res)=>{

    const classes = await Class.find({'$and':[{teacher_ID:req.body.user._id},{attendance:'Present'}]})
  
   res.send(classes)
})
router.put('/payroll/getclasses/details',async(req,res)=>{

    const user = await Users.findOne({_id:req.body.classes.user_ID})
    const program =await Program.findOne({_id:req.body.classes.program_ID})

    const arr = [user,program]
  
   res.send(arr)
})
router.put('/payroll/getcompletedsessions',async(req,res)=>{
    const payrollCount1hour =await Class.find({'$and':[{teacher_ID:req.body.teacher._id},{program:'1 hour'},{attendance:'Present'}]})
    const payrollCount30min =await Class.find({'$and':[{teacher_ID:req.body.teacher._id},{program:'30 min'},{attendance:'Present'}]})
    const arr = [payrollCount1hour.length,payrollCount30min.length]
    res.send(arr)
}) 
      
      
    
      
    
  




export default router   