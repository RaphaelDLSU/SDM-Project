import mongoose from "mongoose";
const Schema = mongoose.Schema;

const classSchema = new Schema({
    user_ID:{
        type:String,
        required:false
    },
    preferred_ClassID:{ // All enrollments
        type:String,
        required: true
    },
    enrollment_ID:{
        type: String,
        required: false
    },
    date:{
        type:String,
        required: false
    },
    attendance:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    note:{
        type: String,
        required: true
    }
    

})

const Class = mongoose.model('class', classSchema)
export default Class