import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@material-ui/core';

function Home() {
    const [alumnis, setAlumnis] = useState(null);

    useEffect(() => {
        getAllAlumnis()
    }, []);
    async function getAllAlumnis() {
        const res = await axios.get('/api/alumni');
        setAlumnis(res.data);
        console.log(res.data);
    }
    return (
        <div className="home-container">
            <nav className="nav">
                <img src={require('../assets/gcoea.png')} className="nav-logo" />
                <div className="moto" >
                    <span>Government college of engineering Amravati</span>
                    <span>Towards Global Technological Excellence</span>
                    <span>An Autonomus institute of Government of maharastra</span>
                </div>
                <div className="spacer" />
                <div className="title">
                    <span>Alumna Connect</span>
                </div>
            </nav>
            <div className="home-content" >

                <div className="login-container">

                    <ul>
                        <Link to="student_login"><li>Student Login</li></Link>
                        <Link to="alumni_login"><li>Alumni Login</li></Link>

                        <Link to="/student_reg">
                            <li>Student Registration</li>
                        </Link>
                        <Link to="/alumni_reg"><li>Alumni Registration</li></Link>

                    </ul>
                </div>
                <div className="landing-alumni">
                    <div className="alumni-list">
                        <h4 style={{ textAlign: "center", borderBottom: "1px solid #dddddd" }}>Alumnis</h4>
                        <ul>
                            {alumnis !== null ? (alumnis.map((alumni, i) =>
                                <AlumniCard alumni={alumni} />
                            )) :
                                (<li>Loading .....</li>)}
                        </ul>
                    </div>
                </div>
            </div>


        </div>
    )
}
const AlumniCard = ({ alumni }) => {
    return (
        <li key={alumni.email} style={{borderBottom:"1px solid #dddddd"}}>
            <div className="alumni-item">
                <div style={{ flex: "1",display:"flex",padding:"5px" }}>
                    <img src={require('../assets/user.png')} />
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <span style={{ fontSize: "1rem", color: "#03A9F4" }}>{alumni.name}</span>
                        <span style={{ fontSize: "0.8rem", color: "#9E9E9E" }}>{alumni.status}</span>
                    </div>

                </div>
            </div>
        </li>
    )
}

export default Home
