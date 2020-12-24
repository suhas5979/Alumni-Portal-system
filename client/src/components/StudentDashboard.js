import React, { useState, useEffect } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import Feedback from './Feedback';
import Schollarship from './Schollarship';
import axios from 'axios';
import { Button, IconButton } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const StudentDashboard = (props) => {
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
                      <AlumniCard alumni={alumni}  />
                    )):
                    (<li>Loading .....</li>)}
                </ul>
            </div>
            <div className="student-home-content">
                Suhas
            </div>
        </div>
    )
}
const AlumniCard = ({alumni}) => {
    return (
        <li key={alumni.email}>
            <div className="alumni-item">
                <div style={{ flex: "1" }}>
                    <img src={require('../assets/user.png')} />
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <span style={{ fontSize: "1rem", color: "#03A9F4" }}>{alumni.name}</span>
                        <span style={{ fontSize: "0.8rem", color: "#9E9E9E" }}>{alumni.status}</span>
                    </div>

                </div>

                <IconButton style={{ color: "#03A9F4" }} ><PersonAddIcon /></IconButton>
            </div>
        </li>
    )
}
export { StudentDashboard, Home }
