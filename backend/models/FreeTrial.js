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
    

})

const FreeTrial = mongoose.model('FreeTrial', freeTrialSchema)
export default FreeTrial