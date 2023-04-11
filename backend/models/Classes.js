import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classSchema = new Schema({
    user_ID:{
        type:String,
        required:false
    },
    preferred_ClassID:{ // All enrollments
        type:String,
        required: false
    },
    program_ID:{
        type:String,
        required: false
    },
    date:{
        type:String,
        required: false
    },
    attendance:{
        type: String,
        required: false,
    },
    note:{
        type: String,
        required: false
    },
    teacher_ID:{
        type:String,
        required:false
    },
    day:{
        type:String,
        required:false
    },
    realDate:{
        type:Date,
        required:false
    },
    program:{
        type:String,
        required:false
    }
    

})

const Class = mongoose.model('class', classSchema)
export default Class