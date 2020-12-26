const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Student = mongoose.model('student');

router.patch('/api/student', async (req, res) => {
    console.log(req.body);
    console.log("in the server")
    const { email, fullName, address, mobileNo, dateOfBirth } = req.body;
    try {
        const user = await Student.findOneAndUpdate({ email: email }, { fullName: fullName, address: address, mobileNo: mobileNo, dateOfBirth: dateOfBirth });

        return res.send(user);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
router.get('/api/student/:email', async (req, res) => {
    console.log(req.params);
    console.log("in the server")
    const { email } = req.params;
    try {
        const user = await Student.findOne({ email: email });
        console.log(user)

        return res.send(user);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});

router.get('/api/students', async (req, res) => {
    console.log("in the students")
    try {
        const users = await Student.find();
        console.log(users)

        return res.send(users);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});

module.exports = router;