const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Student = mongoose.model('student');
const Alumni = mongoose.model('alumni');
const { SECRET_KEY } = require('../config/keys');
const keys = require('../config/keys');

router.post('/api/auth/signup/student', async (req, res) => {
    console.log(req.body);
    console.log("in the server")
    const { name,email, password,rollNo } = req.body;
    try {
        const user = await new Student({ name,email, password,rollNo }).save();
        const token = jwt.sign(email, SECRET_KEY);
        return res.send({ token });
    } catch (err) {
        return res.status(401).send({ error: "user already exist" });
    }


});
router.post('/api/auth/signin/student', async (req, res) => {
    const { email, password } = req.body;
    const user = await Student.findOne({ email:email });
    if (!user) {
        return res.status(404).send({ error: "invalid email and password" });
    }
    try {
        const result = await user.comparePassword(password);
        const token = jwt.sign(email, SECRET_KEY);
        return res.send({ token });
    } catch (err) {
        return res.status(401).send({ error: "invalid email and password" });
    }

});


router.post('/api/auth/signup/alumni', async (req, res) => {
    console.log(req.body);
    console.log("in the server")
    const { name,email, password,status } = req.body;
    try {
        const user = await new Alumni({ name,email, password,status }).save();
        const token = jwt.sign(email, SECRET_KEY);
        return res.send(user);
    } catch (err) {
        return res.status(401).send({ error: "user already exist" });
    }


});
router.post('/api/auth/signin/alumni', async (req, res) => {
    const { email, password } = req.body;
    const user = await Alumni.findOne({ email:email });
    if (!user) {
        return res.status(404).send({ error: "invalid email and password" });
    }
    try {
        const result = await user.comparePassword(password);
        const token = jwt.sign(email, SECRET_KEY);
        return res.send({token});
    } catch (err) {
        return res.status(401).send({ error: "invalid email and password" });
    }

});

router.post('/api/auth/alumni/current_user', (req,res)=>{
    const {token} = req.body;
    console.log(req.body)
    jwt.verify(token,SECRET_KEY,async (err,payload)=>{
        if(err){
            return res.status(401).send({message:"you must be login"});
        }
        const user = await Alumni.findOne({email:payload})
        return res.send(user)
        
    })
});

router.post('/api/auth/student/current_user', (req,res)=>{
    const {token} = req.body;
    jwt.verify(token,SECRET_KEY,async (err,payload)=>{
        if(err){
            return res.status(401).send({message:"you must be login"});
        }
        const { email } =payload
        const user = await Student.findOne({email:email})
        return res.send(user)
        
    })
});

module.exports = router;