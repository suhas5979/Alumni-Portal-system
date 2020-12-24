const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Alumni = mongoose.model('alumni');

router.get('/api/alumni', async (req, res) => {
    console.log("in the server all");
    try {
        const alumnis = await Alumni.find();

        return res.send(alumnis);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
router.get('/api/alumni/:email', async (req, res) => {
    console.log(req.params)
    const { email } = req.params;
    try {
        const alumni = await Alumni.findOne({ email: email });
        res.send(alumni)
    } catch (err) {
        res.status(401).send({ message: "sometthing went wrong" });
    }
})



module.exports = router;