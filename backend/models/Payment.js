import mongoose from "mongoose";
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    teacher_ID:{
        type:'String',
        required:false
    },
    option:{
        type:'String',
        required:false
    },
    details:{
        type:'String',
        required:false
    },
    name:{
        type:'String',
        required:false
    },
    number:{
        type:'String',
        required:false
    },
})

const Payment = mongoose.model('payment', paymentSchema)
export default Class