const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { resolve } = require('path');
const { rejects } = require('assert');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    fullName:{
        type:String,
        default:""
    },
    address: {
        type:String,
        default:""
    },
    mobileNo: {
        type:String,
        default:""
    },
    adhaar: {
        type:String,
        default:""
    },
    password: String,
    rollNo: String,
    dateOfBirth:{
        type:String,
        default:""
    },
    date: {
        type: Date,
        default: new Date
    }
});

studentSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);
        }
        console.log(salt);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        })

    })
});
studentSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;
    return new Promise(async (resolve, reject) => {
        const match = await bcrypt.compare(candidatePassword, user.password);
        console.log("inside the match", match);

        if (!match) {
            return reject(false);
        }
        return resolve(true);
    });

}

mongoose.model("student", studentSchema)