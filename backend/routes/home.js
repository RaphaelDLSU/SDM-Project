import express from "express"
import bcrypt from 'bcryptjs'
// Load all Mongoose models
import mongoose from "mongoose"
import Users from '../models/Users.js'


const router = express.Router()

router.get('/',(req,res) =>{
    res.send("Hello you are in Home")
})
router.get('/login',(req,res)=>{
    
})
router.post('/register', async (req,res)=>{
    console.log('req.body : '+req.body)
    try{
        const newPassword = await bcrypt.hash(req.body.password,10)
        await Users.create({
            email:req.body.email,
            password:newPassword,
            type:"Student"
        })
        res.json({status:'ok'})
    }catch(err){
        res.json({status:'error',error:'Probably Duplicate email idk'})
    }
    
})

export default router