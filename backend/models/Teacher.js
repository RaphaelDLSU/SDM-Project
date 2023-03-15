import mongoose from "mongoose";
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    handledClasses:{ // All enrollments
        type:Number,
        required: true
    },
    biography:{
        type: String,
        required: false
    }

})

const Teacher = mongoose.model('teacher', teacherSchema)
export default Teacher