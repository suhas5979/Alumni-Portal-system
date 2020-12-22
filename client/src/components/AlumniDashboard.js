import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AlumniDashboard = () => {

    const [schollarships, setSchollarships] = useState(null)
    const [active, setActive] = useState("Applications")

    useEffect(() => {
        getAllStudents()
    }, [])
    async function getAllStudents() {
        const res = await axios.get('/api/schollarship');
        console.log(res.data)
        setSchollarships(res.data)
    }
    function decideBackground(i) {
        if (i % 2 == 0) {
            return '#dddddd'
        }
        else {
            return '#FFFFFF'
        }
    }
    function decideColor(name) {
        return active === name ? '#0097A7' : '#FFFFFF';
    }
    function decideTextColor(name) {
        return active === name ? '#FFFFFF' : '#000000';
    }
    return (
        <div className="alumni-dashboard-container">
            <div className="alumni-dash-nav">
                <ul>
                    <li>Home</li>
                    <li>Logout</li>
                </ul>
            </div>
            <div className="alumni-dash-schollarships">
                <div className="alumni-dash-side-nav">
                    <ul>
                        <li onClick={() => setActive("Home")} style={{ background: decideColor("Home"), color: decideTextColor("Home") }} >Home</li>
                        <li onClick={() => setActive("Applications")} style={{ background: decideColor("Applications"), color: decideTextColor("Applications") }} >Applications</li>
                        <li onClick={() => setActive("Approved Applications")} style={{ background: decideColor("Approved Applications"), color: decideTextColor("Approved Applications") }} >Approved Applications</li>
                        <li onClick={() => setActive("Rejected Applications")} style={{ background: decideColor("Rejected Applications"), color: decideTextColor("Rejected Applications") }} >Rejected Applications</li>
                    </ul>
                </div>{active === "Applications" && (
                    <div className="list-schollarship">
                        <ul>
                            {schollarships !== null && schollarships.length > 0 &&
                                schollarships.map((schollarship, i) =>
                                    <li key={`${schollarship.name}${schollarship.schollarship_name}`} style={{ background: decideBackground(i) }} >
                                        <div className="schlp-item">
                                            <h4>{schollarship.name}</h4>
                                            <h5>{schollarship.schollarship_name}</h5>
                                            <div>

                                                <Button variant="outlined" color="primary" >Student Info</Button>
                                                <Popup trigger={
                                                    <Button variant="contained" color="primary" style={{ background: "#43A047" }} >View</Button>} modal >
                                                    <SchollarshipForm schollarship={schollarship} />
                                                </Popup>
                                            </div>
                                        </div>
                                    </li>)}
                        </ul>
                    </div>)}
                {active === "Approved Applications" && (
                    <div className="list-schollarship">
                        <ul>
                            <li >
                                <div className="schlp-item">
                                    <h4>No applications</h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}

                {active === "Rejected Applications" && (
                    <div className="list-schollarship">
                        <ul>
                            <li >
                                <div className="schlp-item">
                                    <h4>No applications</h4>
                                </div>
                            </li>
                        </ul>
                    </div>
                )}

            </div>
        </div>
    )
}

const SchollarshipForm =({schollarship})=>{
    function dateFormatter(date){
        const newDate = new Date(date)
        return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
    }
    return(
        <div className="schollarship-form">
            <div className="schollarship-info-item">
            <span>Name</span><span >{schollarship.name}</span></div>
            <div className="schollarship-info-item">
            <span>Email</span><span >{schollarship.email}</span></div>
            <div className="schollarship-info-item">
            <span>Schollarship Name</span><span >{schollarship.schollarship_name}</span></div>
            <div className="schollarship-info-item">
            <span>Date of Application</span><span >{dateFormatter(schollarship.date)}</span></div>
            <div className="schollarship-info-item-btn">
            <Button color="primary" variant="contained" style={{background:"#43A047"}}>Approved</Button> <Button color="primary" variant="contained" style={{background:"#f44336"}}>Reject</Button></div>
        </div>
    )
}
export default AlumniDashboard
