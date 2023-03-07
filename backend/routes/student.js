import express from "express"

const router = express.Router()



router.post("/register", (req, res) => {
    console.log("Connected to React"); // Connected to React
    res.redirect("/");
  });
    

export default router