const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    plan:{
        program:{
            type: Object,
            required: false
        },
        status:{
            type:String,
            required:false
        }
    }

})

module.exports = mongoose.model('student', studentSchema)