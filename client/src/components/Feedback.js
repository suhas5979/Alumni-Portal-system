import React from 'react'
import { Button, TextField } from '@material-ui/core'
function Feedback() {
    return (
        <div className="student-feedback">
            <TextField fullWidth label="Name" />
            <TextField fullWidth label="Email" />
            <TextField fullWidth label="Contact No" />
            <div style={{ height: "100px" }} >

                <TextField fullWidth label="Suggestions" />
            </div>
            <div className="feedback-btn">
                <Button variant="contained" color="secondary" >Send</Button>
                <Button variant="contained" color="primary" >Discard</Button>
            </div>
        </div>
    )
}

export default Feedback
