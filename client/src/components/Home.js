import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import './css/Home.css';

function Home() {
        document.title = "Alumni Portal | Home";
    return (
        <div className="home-container">
            <HomeNav />
            <div className="home-content" >
            <Login />
            <SlideShow />
            </div>
        </div>
    )
}
const HomeNav = () => {
    return (
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
    )
}
const Login = () => {
    return (
        <div className="login-container">
            <ul>
                <Link to="student_login"><li>Student Login</li></Link>
                <Link to="alumni_login"><li>Alumni Login</li></Link>
                <Link to="/student_reg"><li>Student Registration</li></Link>
                <Link to="/alumni_reg"><li>Alumni Registration</li></Link>
            </ul>
        </div>
    )
}
const imgs =[require('../assets/Alumni.jpg'),require('../assets/scholarship.png'),require('../assets/industry.jpg')]
const SlideShow = () =>{
    return(
        <div className="slide-show">
             <Carousel showIndicators  showArrows={true} >
                <div>
                    <img src={imgs[0]} />
                </div>
                <div>
                    <img src={imgs[1]} />
                </div>
                <div>
                    <img src={imgs[2]} />
                </div>
            </Carousel>
        </div>
    )
}
export default Home
