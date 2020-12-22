import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { TextField, Button } from '@material-ui/core'
import axios from 'axios';

const AlumniLogin = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cookies, setCookie] = useCookies(['token']);
    async function loginAlumni() {
        try {
            const res = await axios.post("/api/auth/signin/alumni", { email, password })
            sessionStorage.setItem("alumni", email)
            props.history.push("/alumni")
        } catch (err) {
            if (err) {
                window.alert("wrong password")
            }
        }
    }
    return (
        <div className="reg-container">
            <div className="reg-form" >
                <h2> Alumni Login</h2>
                <div className="input-container"><TextField onChange={(e) => setEmail(e.target.value)} fullWidth label="User Name" /></div>
                <div className="input-container"><TextField type="password" onChange={(e) => setPassword(e.target.value)} fullWidth label="Password" /></div>
                <Button onClick={loginAlumni} variant="contained" color="primary" >Log In</Button>
                <Link to="/alumni_reg">Register</Link>

            </div>
        </div>
    )
}

export default AlumniLogin
