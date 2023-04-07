import mongoose from "mongoose";
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    user_ID:{
        type:String,
        required:false
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

    },
    paymentStatus:{
        type:String,
        required: false
    },
    paymentWhole:{
        type:Number,
        required:false
    },
    paymentOption:{
        type:String,required:false
    },
    paymentType:{
        type:String,required:false
    }
})

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)
export default Enrollment