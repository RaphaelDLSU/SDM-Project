import mongoose from "mongoose";
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    email:{
        type:String,
        required: true
    },
    firstName:{
        type: String,
        required: false
    },
    lastName:{
        type:String,
        required: false
    },
    password:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required:false
    }

})

const Users = mongoose.model('User', usersSchema)
export default Users