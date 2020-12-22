const mongoose = require('mongoose');
const { Schema } = mongoose;

const schollashipSchema = new Schema({
    schollarship_name:String,
    name: {
        type: String
    },
    email:{
        type:String,
    },
    status:String,
    date: {
        type: Date,
        default: new Date
    }
});


mongoose.model("schollarship",schollashipSchema)