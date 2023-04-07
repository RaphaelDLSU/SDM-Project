import mongoose from "mongoose";
const Schema = mongoose.Schema;

const programSchema = new Schema({
    user_ID:{
        type:String,
        required:false
    },
    enrollment_ID:{ // All enrollments
        type:String,
        required: true
    },
    numSessions:{
        type: Number,
        required: false
    },
    instrument:{
        type:String,
        required: false
    },
    program:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    completedSessions:{
        type:Number,required:false
    }
    

})

const Program = mongoose.model('program', programSchema)
export default Program