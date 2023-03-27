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
    paymentProof:{
        type:String,
        required:false
    },
    time:{
        type:String,
        required:false

    },
    date:{
        type:String,
        required:false

    }
   

})

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment