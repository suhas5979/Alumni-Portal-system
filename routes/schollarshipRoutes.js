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
router.get('/api/schollarship/:email', async (req, res) => {
    console.log(req.params)
    const { email } = req.params;
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
    const { email, name, schollarship_name, adhaar, contact, cast, income, address, dateOfBirth } = req.body;
    console.log(Schollarship)
    try {
        const schollarship = await Schollarship({ adhaar: adhaar, contact: contact, cast: cast, income: income, address: address, dateOfBirth: dateOfBirth, email: email, name: name, status: "new", schollarship_name: schollarship_name }).save();
        console.log(schollarship)

        return res.send(schollarship);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});

router.patch('/api/schollarship', async (req, res) => {
    console.log(req.body);
    const { id, status } = req.body;
    try {
        const schollarship = await Schollarship.findByIdAndUpdate(id, { status: status }, (err, doc) => {
            if (err) {
                return res.status(401).send({ error: "user cannot update" });
            }
        });
        console.log(schollarship)

        return res.send(schollarship);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
module.exports = router;