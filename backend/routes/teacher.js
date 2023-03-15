import express from "express"

const router = express.Router()

router.get('/',(req,res) =>{
    console.log("Hello you are in teacher")
})

export default router