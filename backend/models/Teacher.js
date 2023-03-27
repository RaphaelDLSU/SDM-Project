import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    teacherId:{ // All enrollments
        type:String,
        required: true
    },
    biography:{
        type: String,
        required: false
    },
    instrument:{
        type: String,
        required: false
    }

})

const Teacher = mongoose.model('teacher', teacherSchema)
export default Teacher