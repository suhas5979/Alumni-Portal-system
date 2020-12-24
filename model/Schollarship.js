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
    adhaar:String,
    contact:String,
    cast:String,
    income:String,
    address:String,
    dateOfBirth:String,
    status:String,
    date: {
        type: Date,
        default: new Date
    }
});


mongoose.model("schollarship",schollashipSchema)