import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventsSchema = new Schema({
    eventName:{
        type:String,
        required: false
    },
    eventDate:{
        type: String,
        required: false
    },
    eventLink:{
        type:String,
        required: false
    },
    eventParticipant:{
        type: String,
        required: false
    },
    eventStart:{
        type: String,
        required:false
    },
    eventEnd:{
        type: String,
        required:false
    }

})

const Events = mongoose.model('Event', eventsSchema)
export default Events