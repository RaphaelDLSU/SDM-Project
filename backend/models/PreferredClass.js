import mongoose from "mongoose";
const Schema = mongoose.Schema;

const preferredClassSchema = new Schema({
    teacher_ID:{
        type:String,
        required:false
    },
    days:{
        type:String,
        required:false
    },
    zoomLink:{
        type:String,
        required:false
    },
    program:{
        type:String,
        required:false
    },
    startTime:{
        type:String,
        required:false
    },
    endTime:{
        type:String,
        required:false
    },
    instrument:{
        type:String,
        required:false
    },
    firstName:{
        type:String,
        required:false
    },
    lastName:{
        type:String,
        required:false
    },
    status:{
        type:String,
        required:false

    },
    student_ID:{
        type:String,
        required:false,
        default:''
    }


})

const PreferredClass = mongoose.model('PreferredClass', preferredClassSchema)
export default PreferredClass