import React from 'react';
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core';

function Home() {

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
                <div className="notice-container">

                </div>
            </div>
            <div className="landing-alumni">
                <h1>Discover alumni via pre curated lists</h1>
                <div className="alumni-gr">
                    <img className="img-alumni-gr-1" src={require('../assets/alumni1.jpg')} />
                    <img className="img-alumni-gr-2" src={require('../assets/alumni2.jpg')} />
                    <img className="img-alumni-gr-3" src={require('../assets/alumni3.jpg')} />
                </div>
                <div className="alumni-list">
                    <img className="img-alumni-list-1" src={require('../assets/alumni4.jpg')} />
                    <img className="img-alumni-list-2" src={require('../assets/alumni5.jpg')} />
                    <img className="img-alumni-list-3" src={require('../assets/alumni6.jpg')} />
                </div>
                <div className="btn-center">
                    
                <Button variant="contained" color="secondary" >See All list</Button>
                </div>
            </div>

        </div>
    )
}

export default Home
