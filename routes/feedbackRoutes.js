const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Feedback = mongoose.model('feedback');

router.get('/api/feedback', async (req, res) => {
    console.log(req.params)
    console.log("in the feedback");
    try {
        const feedbacks = await Feedback.find();

        return res.send(feedbacks);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
router.get('/api/feedback/:email', async (req, res) => {
    console.log(req.params)
    const { email } = req.params;
    try {
        const feedbacks = await Feedback.find({ email: email });
        res.send(feedbacks)
    } catch (err) {
        res.status(401).send({ message: "sometthing went wrong" });
    }
})
router.post('/api/feedback', async (req, res) => {
    console.log(req.body);
    console.log("in the server all")
    const { email, feedbackText } = req.body;
    try {
        const feedback = await Feedback({ email: email, feedback: feedbackText }).save();
        return res.send(feedback);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
router.patch('/api/feedback/:id', async (req, res) => {
    console.log(req.body);
    console.log("in the server all")
    const { id } = req.params;
    try {
        const feedback = await Feedback.findByIdAndUpdate(id,{status:"checked"});
        return res.send(feedback);
    } catch (err) {
        return res.status(401).send({ error: "user cannot update" });
    }
});
module.exports = router;