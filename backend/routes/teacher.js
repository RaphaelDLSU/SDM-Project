import express from "express"

const router = express.Router()

router.get('/',(req,res) =>{
    res.send("Hello you are in teacher")
})

export default router