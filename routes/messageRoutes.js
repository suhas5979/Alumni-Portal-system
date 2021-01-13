const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Message = mongoose.model('message');

router.get('/api/message', async (req, res) => {
    console.log(req.params)
    console.log("in the feedback");
    try {
        const messages = await Message.find();

        return res.send(messages);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
router.get('/api/message/:email', async (req, res) => {
    console.log(req.params)
    const { email } = req.params;
    try {
        const messages = await Message.find({ from: email });
        res.send(messages)
    } catch (err) {
        res.status(401).send({ message: "sometthing went wrong" });
    }
})
router.post('/api/message', async (req, res) => {
    console.log(req.body);
    console.log("in the server all")
    const { to,from,message} = req.body;
    try {
        const msg = await Message({ to:to,from:from,message:message }).save();
        return res.send(msg);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
router.patch('/api/message/:id', async (req, res) => {
    console.log(req.body);
    console.log("in the server all")
    const { id } = req.params;
    try {
        const message = await Message.findByIdAndUpdate(id,{status:"checked"});
        return res.send(message);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
module.exports = router;