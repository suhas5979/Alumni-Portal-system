import React, { useState } from 'react'
import { TextField, Button } from '@material-ui/core'
import axios from 'axios';
import './css/StudentRegistration.css';

const StudentRegistration = (props) => {
    document.title ="Alumni Portal | Student Registration"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rollNo, setRollNo] = useState("");

    async function registerStudent() {
        if(validateForm()){
        const res = await axios.post('api/auth/signup/student', { name, email, password, rollNo })
        if (res.data.token !== null && res.data.token !== undefined) {
            props.history.push("/")
        }
        }
        
    }
    function validateForm(){
        if(name==="" || email===""){
            window.alert("name and email should not be empty");
            return false;
        }else if(password===""){
            window.alert("password should not be empty");
            return false;
        
        }else if(password.length<6){
            window.alert("password should be atleast 6 character long");
            return false;
        }else{
            return true;
        }
    }
    return (
        <div className="reg-container">
            <div className="reg-form" >
                <h2> Student Registration</h2>
                <div className="input-container"><TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Student Name" /></div>
                <div className="input-container"><TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label="Email" /></div>
                <div className="input-container"><TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label="Password" /></div>
                <div className="input-container"><TextField type="password" fullWidth label="Confirm Password" /></div>
                <div className="input-container"><TextField value={rollNo} onChange={(e) => setRollNo(e.target.value)} fullWidth label="Roll No" /></div>
                <Button onClick={registerStudent} variant="contained" color="primary" >Register</Button>
            </div>
        </div>
    )
}

export default StudentRegistration
