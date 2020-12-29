const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    email:{
        type:String,
        required:true
    },
    feedback:{
        type:String
    },
    status:{
        type:String,
        default:"new"
    },
    date: {
        type: Date,
        default: new Date
    }
});


mongoose.model("feedback",feedbackSchema)