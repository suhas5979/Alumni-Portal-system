import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import './css/Feedback.css';
function Feedback() {
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    document.title = "Alumni Portal | Feedback";
    useEffect(() => {
        setEmail(sessionStorage.getItem("email"))
    }, []);
    async function sendFeedback() {
        const res = await axios.post('/api/feedback', { email: email, feedback: feedback });
        console.log(res);
    }
    return (
        <div className="student-feedback">
            <TextField value={email} disabled fullWidth label="Email" />
            <textarea onChange={(e)=>setFeedback(e.target.value)} placeholder="suggestions" className="text-area" style={{ fontSize: "1rem", height: "100px", outline: "none", width: "100%" }} />
            <div className="feedback-btn">
                <Button onClick={sendFeedback} style={{ background: "#4CAF50" }} variant="contained" color="primary" >Send</Button>
                <Button style={{ background: "#f44336" }} variant="contained" color="primary" >Discard</Button>
            </div>
        </div>
    )
}

export default Feedback
