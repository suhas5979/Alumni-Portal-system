const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    to:{
        type:String,
        required:true
    },
    from:{
        type:String
    },
    message:String,
    status:{
        type:String,
        default:"new"
    },
    date: {
        type: Date,
        default: new Date
    }
});


mongoose.model("message",messageSchema)