import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import Feedback from './Feedback'
import Schollarship from './Schollarship'
const StudentDashboard = (props) => {
    return (
        <div className="student-dashboard-container">
            <Switch>
                <Route to="/student">
                    <Nav />
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
                <li>Home</li>
                <Link to="/student/schollarship"> <li>Schollarship</li></Link>

                <li>About</li>
                <Link to="/student/feedback"><li>Feedback</li></Link>
                
            </ul>
        </div>
    )
}

export default StudentDashboard
