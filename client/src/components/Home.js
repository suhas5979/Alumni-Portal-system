import React from 'react';
import './css/Home.css';
import Header from './Header';
import Greeting from '../components/Greeting';
import Contact from '../components/Contact';
import Footer from './Footer'
function Home() {
        document.title = "Alumni Portal | Home";
    return (
        <div className="home-container">
            <Header />
            {/* <HomeNav /> */}
            <Greeting />
            <Contact />
            {/* <Footer /> */}
            
        </div>
    )
}
export default Home
