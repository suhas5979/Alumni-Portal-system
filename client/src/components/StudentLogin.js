import React, { useState } from 'react'
import { TextField, Button, Link } from '@material-ui/core';
import axios from 'axios'

const StudentLogin = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function loginStudent() {
       try{
        const res =  await axios.post("api/auth/signin/student",{email,password})
        console.log(res.data)
        if (res.data.token !== null && res.data.token !== undefined) {
            sessionStorage.setItem("email",email)
            props.history.push("/student")
        }
        }catch(err){
            if(err){
                window.alert("wrong password")
            }
        }
    }
    return (
        <div className="reg-container">
            <div className="reg-form" >
                <h2> Student Login</h2>
                <div className="input-container"><TextField onChange={(e) => setEmail(e.target.value)} fullWidth label="User Name" /></div>
                <div className="input-container"><TextField type="password" onChange={(e) => setPassword(e.target.value)} fullWidth label="Password" /></div>
                <Button onClick={loginStudent} variant="contained" color="primary" >Log In</Button>

            </div>
        </div>
    )
}

export default StudentLogin
