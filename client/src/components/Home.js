import React from 'react';
import { Link } from 'react-router-dom';

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
                        <Link to="/student_reg"><li>Student Registration</li></Link>
                        <Link to="/alumni_reg"><li>Alumni Registration</li></Link>

                    </ul>
                </div>

            </div>


        </div>
    )
}

export default Home
