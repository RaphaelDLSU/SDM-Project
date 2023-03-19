import mongoose from "mongoose";
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    student_ID:{
        type:String,
        required:false
    },
    planID:{ // All enrollments
        type:Number,
        required: false
    },
    age:{
        type: String,
        required: false
    },
    gender:{
        type:String,
        required: false
    },
    country:{
        type: String,
        required: true
    },
    level:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required:false
    }
    

})

const Student = mongoose.model('student', studentSchema)
export default Student