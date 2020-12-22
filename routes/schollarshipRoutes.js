const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schollarship = mongoose.model('schollarship');

router.get('/api/schollarship', async (req, res) => {
    console.log(req.params)
    console.log("in the server all");
    try {
        const schollarships = await Schollarship.find();

        return res.send(schollarships);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
router.post('/api/emailschollarship', async (req, res) => {
    console.log(req.params)
    const { email } = req.body;
    try {
        const schollarships = await Schollarship.find({ email: email });
        res.send(schollarships)
    } catch (err) {
        res.status(401).send({ message: "sometthing went wrong" });
    }
})
router.post('/api/schollarship', async (req, res) => {
    console.log(req.body);
    console.log("in the server all")
    const { email, name, schollarship_name } = req.body;
    console.log(Schollarship)
    try {
        const schollarship = await Schollarship({ email: email, name: name, status: "new", schollarship_name: schollarship_name }).save();
        console.log(schollarship)

        return res.send(schollarship);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});


module.exports = router;