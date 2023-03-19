import mongoose from "mongoose";
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    user_ID:{
        type:String,
        required:false
    },
    offer_ID:{
        type:String,
        required: true
    },
    instrument:{
        type:String,
        required: true
    },
    numberOfSessions:{
        type:String,
        required: true
    },
    status:{
        type:String,
        required: true
    },
   

})

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment