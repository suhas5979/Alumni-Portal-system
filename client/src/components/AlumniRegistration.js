import React, { useState } from 'react';

import { TextField, Button } from '@material-ui/core';
import axios from 'axios';

const AlumniRegistration = (props) => {
    document.title ="Alumni Portal | Alumni Registration"
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState("");
    async function registerAlumni(){
        if(validateForm()){
            try{
                const res = await axios.post("/api/auth/signup/alumni",{name,email,password,status});
                props.history.push("/")
            }catch(err){
                window.alert("alumni already exists")
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
                <h2> Alumni Registration</h2>
                <div className="input-container"><TextField value={name} onChange={(e) => setName(e.target.value)} fullWidth label="Alumni Name" /></div>
                <div className="input-container"><TextField value={email} onChange={(e) => setEmail(e.target.value)} fullWidth label="Email" /></div>
                <div className="input-container"><TextField type="password" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth label="Password" /></div>
                <div className="input-container"><TextField type="password" fullWidth label="Confirm Password" /></div>
                <div className="input-container"><TextField value={status} onChange={(e) => setStatus(e.target.value)} fullWidth label="Current Status" /></div>
                <Button onClick={registerAlumni} variant="contained" color="primary" >Register</Button>
            </div>
        </div>
    )
}

export default AlumniRegistration
