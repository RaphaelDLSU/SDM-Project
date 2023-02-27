import express from "express"

const router = express.Router()

router.get('/',(req,res) =>{
    res.send("Hello you are in Home")
})
router.get('/login',(req,res)=>{
    
})

export default router