import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Feedback from './Feedback';
import Schollarship from './Schollarship';
import axios from 'axios';
import { IconButton, TextField } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import MessageIcon from '@material-ui/icons/Message';
import SendIcon from '@material-ui/icons/Send';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const StudentDashboard = (props) => {

    if (sessionStorage.getItem("email") === null) {
        props.history.push("/student_login");
    }
    return (
        <div className="student-dashboard-container">
            <Switch>

                <Route to="/student" >
                    <Nav />
                </Route>
                <Route to="/student/home" >
                    <Home />
                </Route>
                <Route to="/student/schollarship">
                    <Schollarship />
                </Route>

                <Route to="/student/feedback">
                    <Feedback />
                </Route>
            </Switch>

        </div>
    )
}
const Nav = () => {
    return (
        <div className="student-dash-nav">
            <ul >
                <Link to="/student/home"><li>Home</li></Link>

                <Link to="/student/schollarship"> <li>Schollarship</li></Link>

                <li>About</li>
                <Link to="/student/feedback"><li>Feedback</li></Link>

            </ul>
        </div>
    )
}
const Home = () => {
    const [alumnis, setAlumnis] = useState(null);

    useEffect(() => {
        getAllAlumnis()
    }, []);
    async function getAllAlumnis() {
        const res = await axios.get('/api/alumni');
        setAlumnis(res.data)
        console.log(res.data)
    }
    function decideBackground(i) {
        if (i % 2 == 0) {
            return '#dddddd'
        }
        else {
            return '#FFFFFF'
        }
    }
    return (
        <div className="student-home">
            <div className="alumni-list">
                <h4 style={{ textAlign: "center", borderBottom: "1px solid #dddddd" }}>Alumnis</h4>
                <ul>
                    {alumnis !== null ? (alumnis.map((alumni, i) =>
                        <AlumniCard alumni={alumni} />
                    )) :
                        (<li>Loading .....</li>)}
                </ul>
            </div>
            <div className="student-home-content">
                <h2 style={{textAlign:"center"}} > Home</h2>
            </div>
        </div>
    )
}
const AlumniCard = ({ alumni }) => {
    return (
        <li key={alumni.email}>
            <div className="alumni-item">
                <div style={{ flex: "1" }}>
                    <img src={require('../assets/avatar.png')} />
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <span style={{ fontSize: "1rem", color: "#03A9F4" }}>{alumni.name}</span>
                        <span style={{ fontSize: "0.8rem", color: "#9E9E9E" }}>{alumni.status}</span>
                    </div>

                </div>
                <Popup trigger={<IconButton style={{ color: "#03A9F4" }} ><MessageIcon /></IconButton>} modal >
                    <SendMessage name={alumni.name} />
                </Popup>

                <IconButton style={{ color: "#03A9F4" }} ><PersonAddIcon /></IconButton>
            </div>
        </li>
    )
}

const SendMessage = ({ name }) => {
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("");
    function sendMessage() {
        if (text !== "") {
            setMessages([...messages, text]);
            setText("")
        } else {

        }
    }
    console.log(messages);
    return (
        <div style={{ height: "300px", display: "flex", flexDirection: "column" }}>
            <h3 style={{ textAlign: "center", borderBottom:"1px solid #dddddd"}}>{name}</h3>
            <div style={{ display: "flex", flex: "1", flexDirection: "column" }} >
                <div style={{ flex: "1" }} >
                    <ul style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }} >
                        {messages.map(message =>

                            <span key={message} style={{ margin: "5px", background: "#29B6F6", padding: "2px 6px", borderRadius: "12px", color: "#FFFFFF" }}>
                                {message}
                            </span>


                        )}
                    </ul>
                </div>
                <div style={{ display: "flex" }} >
                    <TextField value={text} onChange={(e) => setText(e.target.value)} fullWidth label="message" />
                    <IconButton onClick={sendMessage} style={{ color: "#4CAF50" }}><SendIcon /> </IconButton>
                </div>
            </div>
        </div>
    )
}
export { StudentDashboard, Home }
