import React from 'react'
import { Button, TextField } from '@material-ui/core'
function Feedback() {
    return (
        <div className="student-feedback">
            <TextField fullWidth label="Name" />
            <TextField fullWidth label="Email" />
            <TextField fullWidth label="Contact No" />
            <textarea placeholder="suggestions" className="text-area" style={{ fontSize: "1rem", height: "100px", outline: "none", width: "100%" }} />
            <div className="feedback-btn">
                <Button style={{ background: "#4CAF50" }} variant="contained" color="primary" >Send</Button>
                <Button style={{ background: "#f44336" }} variant="contained" color="primary" >Discard</Button>
            </div>
        </div>
    )
}

export default Feedback
