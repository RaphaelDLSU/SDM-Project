import mongoose from "mongoose";
const Schema = mongoose.Schema;

const freeTrialSchema = new Schema({
    class_ID:{
        type:String,
        required:false
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    parent:{
        type:String,
        required:true
    },
    level:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
    },
    age:{
        type:String,required:false
    }
    

})

const FreeTrial = mongoose.model('FreeTrial', freeTrialSchema)
export default FreeTrial