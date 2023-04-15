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
import e from "express"
import Emailer from "../models/Emailer.js"


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
                user_ID:user._id,
                firstName:user.firstName,
                lastName:user.lastName,
                type:user.type
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
        Emailer(req.body.email,
            'Welcome to SDM Flow!',
            'We hope that you use our services and enroll in one of our programs now!',
            '<a href="http://localhost:3000/enrollform">Enroll now! </a> <br></br> <a href="http://localhost:3000/enrollfree">Get your free trial! </a> '
            )

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
      instrument:req.body.instrument,
      
        
    })
    const enrollment = await Enrollment.create({
        status:'Pending',
        user_ID:findUser._id,
        time:date.toLocaleTimeString(),
        date: date.toLocaleDateString(),
        paymentStatus:'Not paid',
        realDate:date
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
                payment:payment,
                level:req.body.level
                
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
    var date = new Date()
    let paymentStatus

  
    try{
        const newImage = await Enrollment.findOneAndUpdate({user_ID:findUser._id},{'$set':{paymentDate:date,paymentProof:paymentImg,paymentOption:req.body.paymentOption,paymentType:req.body.paymentType}})
        newImage.save();
        
       Emailer(req.body.userParsed,
        'You have submitted your payment',
        'Please wait for confirmation of your account. We will send you an email regarding your acceptance. If there is a discrepance with your payment, expect a reply from our admin concerning this'
        )

        res.json({status:'ok'})
   
        
    }catch(err){
        console.log(err)
    }
})

router.put('/enrollpending',async (req,res)=>{
    const data = await Enrollment.find({'$or':[{status:'Pending'},{status:'Pending-Half'}]})              
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
    const data = await PreferredClass.find({days:{$regex:day},instrument:{$regex:instrument},program:'Free Trial 15 mins'})
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

    const base64 = req.body.input.input.paymentProof
    const imagesrc = `data:image/jpeg;base64,${base64   }`
    
    console.log('Data 3: '+data3)
    let arr = [data,data2,data3,imagesrc]

    console.log('base image: '+imagesrc)
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
    status:'Pending',
    date:moment().format('LL'),
    time:moment().format('LT'),
    instrument:req.body.filterInstrument,
    day:req.body.filterDay

   })

   console.log('Free Trial: '+trial)
})

router.put('/freetrialpending',async (req,res) =>{
    const freeTrial = await FreeTrial.find({status: 'Pending'})
    res.send(freeTrial)
})
router.put('/freetrialpending/details',async (req,res) =>{
    const preferredClass = await PreferredClass.findOne({_id:req.body.input.input.class_ID})
    const user = await Users.findOne({_id:preferredClass.teacher_ID})
    const arr = [preferredClass,user]
    res.send(arr)
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
    let date = new Date()
    const fromNow = moment(date+30).format('ll')

    const enrollmentQuery = await Enrollment.findOne({_id:enrollment._id})

    const user = await Users.findOne({_id:enrollmentQuery.user_ID})


    if(enrollmentQuery.status=='Pending'){
        if(enrollmentQuery.paymentType=='50% Payment'){
            paymentStatus = 'Half Paid'
            paymentMultiplier = .5*enrollmentQuery.paymentWhole   
          
        }else{      
            paymentStatus = 'Fully Paid'
            paymentMultiplier = 0
        }
        await Enrollment.findOneAndUpdate({_id:enrollment._id},{'$set':{paymentStatus:paymentStatus,paymentRemaining:paymentMultiplier,status:'Approved'}})
    
        await Student.findOneAndUpdate({_id:req.body.student._id},{'$set':{status:'Enrolled '}})
    
        Emailer(user.email,
            'Your SDM Enrollment has been approved!',
            `Your  enrollment is now approved! You can now set a schedule for you program/s. If you only paid in half, your program will be put on hold after half of your sessions.`,
            '<a href="http://localhost:3000/schedpage">Schedule your program/s here! </a> '
            )
    
        res.json({status:'ok'})

    }else if(enrollmentQuery.status =='Pending-Half'){
        
        const program2 = await Program.updateMany({user_ID:user._id,status:'On Hold'},{'$set':{status:'Scheduled'}})
        const enrollment2 = await Enrollment.findOneAndUpdate({_id:enrollment._id},{'$set':{paymentStatus:'Fully Paid',paymentRemaining:0,status:'Approved'}})
        console.log('Enrollment = '+enrollment2+' '+program2)
        Emailer(user.email,
            'Your SDM Enrollment has been paid and approved in full!',
            `If one of your programs have been put on hold, please check to see if your program is back here! `,
            '<a href="http://localhost:3000/schedpage">Check here</a>'
            )
    } 
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
    const data2 = await Teacher.findOne({teacherId:req.body.id})
    const arr = [data,data2]
    res.send(arr)
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
    
    const teacher = await Teacher.findOneAndUpdate({teacherId:req.body.teacherTemp._id},{'$set':{hasStudents:true}})
    const preferredClass = await PreferredClass.findOneAndUpdate({_id:req.body.classesTemp._id},{'$set':{student_ID:req.body.user.user_ID,status:'Unavailable'}})
    const program = await Program.findOne({_id:req.body.program._id})

    const user = await Users.findOne({_id:req.body.user.user_ID})
    Emailer(req.body.teacherTemp.email,
        'One of your schedules have been taken!',
        `${user.firstName} ${user.lastName} has taken your ${program.program} ${program.instrument} in ${preferredClass.days} ${preferredClass.startTime}--${preferredClass.endTime}`,
        '<a href="http://localhost:3000/mystudents">Check your new student here!</a>'
        )

    console.log('Preferred Class: '+preferredClass)
    await Program.findOneAndUpdate({_id:req.body.program._id},{'$set':{teacher_ID:req.body.teacherTemp._id,status:'Scheduled'}})

})

router.put('/studentrecords',async (req,res)=>{
    const data = await Users.find({type:'Student'})
    console.log('data :'+data)  
   res.send(data)
})

router.put('/studentrecords/details',async (req,res)=>{
    const data = await Enrollment.findOne({user_ID:req.body.id,status:{'$ne':'Past'},status:{'$ne':'Not Enrolled'}})
    console.log('Enrollment :'+data)
   res.send(data)
})
router.put(`/studentrecords/details/specific`,async (req,res)=>{

    const data = await Enrollment.findOne({user_ID:req.body.user_ID})
    const data2 = await Program.find({enrollment_ID:data._id,status:{'$ne':'Past'}})



   res.send(data2)
})
router.put(`/studentrecords/details/specific/past`,async (req,res)=>{
    
    const data = await Enrollment.findOne({user_ID:req.body.user_ID})
    const data2 = await Program.find({enrollment_ID:data._id,status:'Past'})
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

   
    const data3 = await PreferredClass.findOne({_id:data2.preferred_ClassID})
    const data4 = await Student.findOne({user_ID:req.body.user_ID})  
    const data5= await Users.findOne({_id:data3.teacher_ID})

    const completeClass = await Class.find({program_ID:req.body.program._id,attendance:'Present'})
    const remainingClass = await Class.find({program_ID:req.body.program._id},{'$or':[{attendance:'Absent'},{attendance:''}]})

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
    const user = await Users.findOne({_id:req.body.preferredClass.student_ID})

    console.log('User: '+user)
    const arr=[classes,user]
    res.send(arr)
})
router.put('/mystudents',async(req,res)=>{   

    const programs = await Program.find({teacher_ID:req.body.user.user_ID,status:{'$ne':'Past'}})  
    res.send(programs)
})
router.put('/mystudents/details',async(req,res)=>{
    const user = await Users.findOne({_id:req.body.program.user_ID})
    const enrollment = await Enrollment.findOne({user_ID:req.body.program.user_ID})
    const student = await Student.findOne({user_ID:req.body.program.user_ID})
    const arr= [user,enrollment,student]
    res.send(arr)
})
router.put('/mystudents/levelchange',async(req,res)=>{
    const level = await Program.findOneAndUpdate({_id:req.body.program._id},{'$set':{level:req.body.e}})
    level.save()
})
router.put('/mystudents/manage',async(req,res)=>{
  const programs = await Program.find({'$and':[{teacher_ID:req.body.teacher.user_ID},{user_ID:req.body.student._id},{status:{'$ne':'Past'}}]})
  res.send(programs)
})
router.put('/mystudents/manage/sessions',async(req,res)=>{

    let classes
    if(!req.body.isPast){
        classes = await Class.find({'$and':[{program_ID:req.body.program._id},{attendance:''}]})
      
    }
    else{
        classes = await Class.find({'$and':[{program_ID:req.body.program._id},{attendance:{'$nin':[null,'']}}]})
    }
   

    res.send(classes)
})
router.put('/mystudents/manage/sessions/details',async(req,res)=>{

    const preferredClass = await PreferredClass.findOne({_id:req.body.classes.preferred_ClassID})
   
    res.send(preferredClass)
})
router.put('/mystudents/manage/sessions/update',async(req,res)=>{

    // const classes = await Class.findOne({_id:req.body.classes._id})
    // const today = new Date()
    // if(classes.realDate.setHours(0,0,0,0)!=today.setHours(0,0,0,0)){
    //     res.status(404)
      
    // }else  {
        const classes = await Class.findOneAndUpdate({_id:req.body.classes._id},{'$set':{attendance:req.body.attendance,note:req.body.notes}})
        const remainingClass = await Class.find({program_ID:req.body.program._id,'$or':[{attendance:''},{attendance:'Absent'}]})

        console.log('Remaining Classes" '+remainingClass.length)
        if(remainingClass.length ==0){// Program dead
            const program = await Program.findOneAndUpdate({_id:req.body.program._id},{'$set':{status:'Past'}})
            const programMany = await Program.find({user_ID:req.body.user._id,status:{'$ne':'Past'}})
            const preferredClass = await PreferredClass.findOneAndUpdate({student_ID:program._id,status:'Available'})
            console.log('Remaining Programs: '+programMany.length) 
            if(programMany.length==0){ //Student Dead
                await Student.findOneAndUpdate({user_ID:req.body.user._id},{'$set':{status:'Not Enrolled'}})
            }
        }

        res.status(500)
    // }


  
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

    const classes = await Class.find({'$and':[{teacher_ID:req.body.user._id},{attendance:'Present'},{paid:'false'}]})
  
   res.send(classes)
})
router.put('/payroll/getclasses/details',async(req,res)=>{

    const user = await Users.findOne({_id:req.body.classes.user_ID})
    const program =await Program.findOne({_id:req.body.classes.program_ID})

    const arr = [user,program]
  
   res.send(arr)
})
router.put('/payroll/getcompletedsessions',async(req,res)=>{
    const payrollCount1hour =await Class.find({'$and':[{teacher_ID:req.body.teacher._id},{program:'1 hour'},{attendance:'Present'},{paid:false}]})
    const payrollCount30min =await Class.find({'$and':[{teacher_ID:req.body.teacher._id},{program:'30 min'},{attendance:'Present'},{paid:false}]})
    const arr = [payrollCount1hour.length,payrollCount30min.length]
    res.send(arr)
}) 
router.put('/studentenrollments',async(req,res)=>{
    const enrollmentsCurrent = await Enrollment.find({'$and':[{user_ID:req.body.user.user_ID},{status:{'$ne':'Past'}}]})
    const enrollmentsPast= await Enrollment.find({'$and':[{user_ID:req.body.user.user_ID},{status:'Past'}]})
    const arr=[enrollmentsCurrent,enrollmentsPast]
    res.send(arr)
}) 
router.put('/studentenrollments/details',async(req,res)=>{
    const programs = await Program.find({enrollment_ID:req.body.enrollment._id})
    res.send(programs)
}) 

router.put('/schedsummary',async(req,res)=>{
    const classes = await Class.find({'$and':[{program_ID:req.body.program._id},{attendance:''}]})
    const classes2 = await Class.find({'$and':[{program_ID:req.body.program._id},{attendance:{'$ne':''}}]})
    const teacher = await Users.findOne({_id:req.body.program.teacher_ID})
     const teacher2 = await Teacher.findOne({teacherId:req.body.program.teacher_ID})

    const arr = [classes,teacher,teacher2,classes2]
    res.send(arr)
}) 
router.put('/schedsummary/details',async(req,res)=>{
    const preferredClass = await PreferredClass.findOne({_id:req.body.classes.preferred_ClassID})
    res.send(preferredClass)
}) 

router.put('/generateenrollment',async(req,res)=>{
    const programs = await Program.find({status:{'$ne':'Not Scheduled'}})

    let voice=0,piano=0,guitar=0,drums=0,ukulele=0,violin=0,cello=0,sax=0,flute=0,clarinet=0
    let info =[]
    const info2 = []
    const startDate = new Date(req.body.dateEnrollmentStart)
    const endDate = new Date(req.body.dateEnrollmentEnd)
    let total =0

    await Promise.all(programs.map(async(element)=>{
        const enrollment = await Enrollment.findOne({_id:element.enrollment_ID})
            
        if(enrollment.realDate >= startDate && enrollment.realDate <=endDate){
   
            if(element.instrument =='Voice')
                voice++
            else if(element.instrument =='Piano')
                piano++
            else if(element.instrument =='Guitar')
                guitar++
            else if(element.instrument =='Drums')
                drums++
            else if(element.instrument =='Ukulele')
                ukulele++
            else if(element.instrument =='Violin')
                violin++    
            else if(element.instrument =='Cello')
                cello++
            else if(element.instrument =='Saxophone')
                sax++
            else if(element.instrument =='Flute')
                flute++
            else if(element.instrument =='Clarinet')
                clarinet++
        }
   })) 
       
    pushToArray('Voice',voice,info)
    pushToArray('Piano',piano,info)
    pushToArray('Guitar',guitar,info)
    pushToArray('Drums',drums,info)
    pushToArray('Ukulele',ukulele,info)
    pushToArray('Cello',cello,info)
    pushToArray('Saxophone',sax,info)
    pushToArray('Flute',flute,info)
    pushToArray('Clarinet',clarinet,info)
    pushToArray('Violin',violin,info)

    total=voice+piano+guitar+drums+ukulele+cello+sax+flute+clarinet+violin
    info.push(['TOTAL',total])

        
    await Promise.all(programs.map(async(element)=>{
        const enrollment = await Enrollment.findOne({_id:element.enrollment_ID})
        if(enrollment.realDate >= startDate && enrollment.realDate <=endDate){
            const user = await Users.findOne({_id:element.user_ID})
            const name = user.firstName+' '+user.lastName
            info2.push([element.instrument,user.email,name,enrollment.status,enrollment.date])
        } 
    }))
    const arr = [info,info2]
    res.send(arr)

}) 

router.put('/generatesalessummary',async(req,res)=>{
    let one4 = 0,one8 = 0,one12 = 0,one20 = 0
    let thir9 = 0,thir12 = 0,thir20 = 0
    let info =[]
    let info2 = []
    const startDate = new Date(req.body.dateSalesStart)
    const endDate = new Date(req.body.dateSalesEnd)

    const programs = await Program.find({status:{'$ne':'Not Scheduled'}})

    await Promise.all(programs.map(async(element)=>{
        const enrollment = await Enrollment.findOne({_id:element.enrollment_ID,paymentStatus:'Fully Paid'})
        
        if(enrollment !=null && enrollment.realDate >= startDate && enrollment.realDate <=endDate){
            if(element.program =='1 hour' &&element.numSessions ==4 )
                one4++
            else if(element.program =='1 hour' &&element.numSessions ==8 )
                one8++
            else if(element.program =='1 hour' &&element.numSessions ==12 )
                one12++
            else if(element.program =='1 hour' &&element.numSessions ==20 )
                one20++
            else if(element.program =='30 min' &&element.numSessions ==9)
                thir9++
            else if(element.program =='30 min' &&element.numSessions ==12 )
                thir12++
            else if(element.program =='30 min' &&element.numSessions ==20 )
                thir20++
        }
   })) 
    pushToArray2('1 hour, 4 sessions',3490,one4,info)
    pushToArray2('1 hour, 8 sessions',6490,one8,info)
    pushToArray2('1 hour, 12 sessions',9090,one12,info)
    pushToArray2('1 hour, 20 sessions',14490,one20,info)
    pushToArray2('30 min, 9 sessions',3490,thir9,info)
    pushToArray2('30 min, 12 sessions',4790,thir12,info)
    pushToArray2('30 min, 20 sessions',7490,thir20,info)

    let total=one4+one8+one12+one20+thir9+thir12+thir20
    info.push(['TOTAL','','',total])

    await Promise.all(programs.map(async(element)=>{
        let time =''
        const enrollment = await Enrollment.findOne({_id:element.enrollment_ID,paymentStatus:'Fully Paid'})      
        if(enrollment !=null && enrollment.realDate >= startDate && enrollment.realDate <=endDate){
            const user = await Users.findOne({_id:element.user_ID})
            const name = user.firstName+' '+user.lastName
            if(element.program=='1 hour')
                time='1 hour'
            else if(element.program=='30 min')
                time='30 minutes'
            info2.push([`${time}, ${element.numSessions} Sessions`,user.email,name,enrollment.paymentStatus,enrollment.date])
        } 
    }))
    const arr = [info,info2]
    res.send(arr)

}) 

const pushToArray =(instrument,tally,array)=>{
    if(tally >0){
        array.push([instrument,tally])
    }
}
const pushToArray2 =(instrument,price,tally,array)=>{
    if(tally >0){
        array.push([instrument,`P${price}`,tally,`P${price*tally}`])     
    }
}
router.put('/studentenrollments',async(req,res)=>{
    const enrollmentsCurrent = await Enrollment.find({'$and':[{user_ID:req.body.user.user_ID},{status:{'$ne':'Past'}}]})
    const enrollmentsPast= await Enrollment.find({'$and':[{user_ID:req.body.user.user_ID},{status:'Past'}]})
    const arr=[enrollmentsCurrent,enrollmentsPast]
    res.send(arr)
}) 
router.put('/reschedule',async(req,res)=>{
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
      let startDate =req.body.resched

      const program = await Class.find({program_ID:req.body.classes.program_ID,date:moment(startDate).format('LL')})
      console.log('Program: '+program)
    if(program==''){
        console.log('Program: '+program)
        for(let i=0;i<1;i++){
            let parsedDay = moment(startDate).format('dddd')
            let dayLetter = getDay(startDate)
            if(hasLetter(req.body.preferredClass.days,dayLetter)){
                await Class.create({
                    user_ID:req.body.classes.user_ID,
                    preferred_ClassID:req.body.classes.preferred_ClassID,
                    program_ID:req.body.classes.program_ID,
                    date:moment(startDate).format('LL'),
                    attendance:'',
                    note:'',
                    teacher_ID:req.body.classes.teacher_ID,
                    day:parsedDay,
                    realDate:startDate ,
                    program:req.body.classes.program
                })
            }else{
                i--
            }
    
            await Class.findOneAndUpdate({_id:req.body.classes._id},{'$set':{attendance:'Rescheduled'}})
            startDate = moment(startDate).add(1,"days")
            
        }   
       
      }
      
      
     
    
})
router.put('/payroll/payment',async(req,res)=>{

    const classes = await Class.find({'$and':[{teacher_ID:req.body.user._id},{attendance:'Present'},{paid:'false'}]})

    await Promise.all(classes.map(async(element)=>{
        element.updateOne({'$set':{paid:true}})      
    }))
    Emailer(req.body.user.email,
        'Welcome to SDM Flow!',
        'We hope that you use our services and enroll in one of our programs now!',
        '<a href="http://localhost:3000/enrollform">Enroll now! </a> <br></br> <a href="http://localhost:3000/enrollfree">Get your free trial! </a> '
        )
    
}) 

router.put('/studentrecords/onhold',async(req,res)=>{

    const program = await Program.findOneAndUpdate({_id:req.body.program._id},{'$set':{status:'On Hold'}})
    console.log('Program putting on hold:'+program)
}) 

            
      
router.put('/mystudents/changeprogram',async(req,res)=>{

    const program = await Program.findOne({_id:req.body.e})

    console.log('Changed Program: '+program)

    res.send(program)
}) 
router.put('/payment/getonhold',async(req,res)=>{

    const program = await Program.find({user_ID:req.body.user.user_ID,status:'On Hold'})
    const enrollment = await Enrollment.findOne({user_ID:req.body.user.user_ID,status:'Pending'})
    const arr=[program,enrollment]
    res.send(arr)
}) 
router.put('/payment/getenrollment',async(req,res)=>{
    const program = await Program.findOne({_id:req.body.selected})
    
    const enrollment = await Enrollment.findOne({user_ID:req.body.user.user_ID,_id:program.enrollment_ID})
    console.log(program)
    console.log(enrollment)
    res.send(enrollment)
}) 
router.put('/payment/submithalf',async(req,res)=>{

    const paymentImg = req.body.postImage.myFile;
    const findUser = await Users.findOne({email:req.body.user.user_ID})
    var date = new Date()

    console.log('Here: ')
    try{
        const newImage = await Enrollment.findOneAndUpdate({user_ID:req.body.user.user_ID},{'$set':{paymentDate:date,paymentProof:paymentImg,paymentOption:req.body.paymentOption,status:'Pending-Half',time:date.toLocaleTimeString()}})
        newImage.save();

        res.json({status:'ok'})
   
        
    }catch(err){
        console.log(err)
    }
}) 

router.put('/notify',async(req,res)=>{

    const user = await Users.findOne({_id:req.body.user_ID})
    const program = req.body.program

    Emailer(user.email,
        'Due Payments Warning!',
        `It has come to our attention that your ${program.program} ${program.instrument} is in danger of being on hold by our dear admin. Please update your payments now >:( Note that you won't be able to check your classes while your account is on hold.`,
        '<a href="http://localhost:3000/payment">Pay here! </a>  '
    )
    

   
}) 

             
      
      
      
      
    
      
    
  




export default router   