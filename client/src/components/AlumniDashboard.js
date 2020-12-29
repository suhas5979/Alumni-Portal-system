import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './css/AlumniDashboard.css';
const AlumniDashboard = (props) => {

    document.title = "Alumni Portal | Alumni Dashboard";
    const [schollarships, setSchollarships] = useState([])
    const [active, setActive] = useState("Applications")
    const history = useHistory();
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
            return '#64B5F6'
        }
        else {
            return '#B2EBF2'
        }
    }
    function decideColor(name) {
        return active === name ? '#0097A7' : '#FFFFFF';
    }
    function decideTextColor(name) {
        return active === name ? '#FFFFFF' : '#000000';
    }
    if (sessionStorage.getItem("alumni") === null) {
        history.push("/alumni_login");
    }
    function logout() {
        sessionStorage.removeItem("alumni");
        history.push("/alumni_login");
    }
    return (
        <div className="alumni-dashboard-container">
            <div className="alumni-dash-nav" style={{ borderBottom: "1px solid #000000" }}>
                <ul>
                    <li onClick={logout}>Logout</li>
                </ul>
            </div>
            <div className="alumni-dash-schollarships">
                <div className="alumni-dash-side-nav">
                    <ul>
                        <li className={`${active==="Home" && "alumni-dash-side-nav--selected"}`} onClick={() => setActive("Home")} >Home</li>
                        <li className={`${active==="Applications" && "alumni-dash-side-nav--selected"}`} onClick={() => setActive("Applications")} >Applications</li>
                        <li className={`${active==="Approved Applications" && "alumni-dash-side-nav--selected"}`} onClick={() => setActive("Approved Applications")} >Approved Applications</li>
                        <li className={`${active==="Rejected Applications" && "alumni-dash-side-nav--selected"}`} onClick={() => setActive("Rejected Applications")}>Rejected Applications</li>
                    </ul>
                </div>{active === "Applications" && (
                    <div className="list-schollarship">
                        <ul>
                            {schollarships.length === 0 ?
                                <li>
                                    <div className="schlp-item">
                                        <span>No applications</span>
                                    </div>
                                </li>
                                : schollarships.map((schollarship, i) =>
                                    <li key={`${schollarship.name}${schollarship.schollarship_name}`} style={{ background: decideBackground(i) }} >
                                        <div className="schlp-item">
                                            <h4>{schollarship.name}</h4>
                                            <h5>{schollarship.schollarship_name}</h5>
                                            <div>
                                                <Popup trigger={<Button variant="contained" color="primary" style={{ marginRight: "5px", background: "#f44336" }} >Student Info</Button>} modal >
                                                    {close => <StudentInfo close={close} schollarship={schollarship} />}
                                                </Popup>


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
                    <ApprovedApplication />
                )}

                {active === "Rejected Applications" && (
                    <RejectedApplication />
                )}

            </div>
        </div>
    )
}
const RejectedApplication = () => {
    const [rejectedApplications, setRejectedApplications] = useState([]);

    function decideBackground(i) {
        if (i % 2 === 0) {
            return '#dddddd'
        }
        else {
            return '#FFFFFF'
        }
    }
    async function getRejectedApplications() {
        const res = await axios.get('/api/schollarship');
        console.log(res.data);
        const filtered = res.data.filter(e => e.status === "Rejected")
        setRejectedApplications(filtered)
    }
    useEffect(() => {
        getRejectedApplications()
    }, []);
    return (
        <div className="list-schollarship">
            <ul>
                {rejectedApplications.length === 0 ?
                    <li>
                        <div className="schlp-item">
                            <span>No applications</span>
                        </div>
                    </li>

                    : rejectedApplications.map((schollarship, i) =>
                        <li key={`${schollarship.name}${schollarship.schollarship_name}`} style={{ background: decideBackground(i) }} >
                            <div className="schlp-item">
                                <h4>{schollarship.name}</h4>
                                <h5>{schollarship.schollarship_name}</h5>
                                <div>
                                    <Popup trigger={<Button variant="contained" color="primary" style={{ background: "#43A047" }} >Reason For Rejection</Button>} modal >
                                        {close => <ReasonForRejection close={close} schollarship={schollarship} />}
                                    </Popup>
                                </div>
                            </div>
                        </li>)}
            </ul>
        </div>
    )
}
const ApprovedApplication = () => {
    const [approvedApplications, setApprovedApplications] = useState([]);

    function decideBackground(i) {
        if (i % 2 === 0) {
            return '#dddddd'
        }
        else {
            return '#FFFFFF'
        }
    }
    async function getApprovedApplications() {
        const res = await axios.get('/api/schollarship');
        console.log(res.data);
        const filtered = res.data.filter(e => e.status === "Approved")
        setApprovedApplications(filtered)
    }
    useEffect(() => {
        getApprovedApplications()
    }, []);
    return (
        <div className="list-schollarship">
            <ul>
                {approvedApplications.length == 0 ?
                    <li>
                        <div className="schlp-item">
                            <span>No applications</span>
                        </div>
                    </li>
                    : approvedApplications.map((schollarship, i) =>
                        <li key={`${schollarship.name}${schollarship.schollarship_name}`} style={{ background: decideBackground(i) }} >
                            <div className="schlp-item">
                                <h4>{schollarship.name}</h4>
                                <h5>{schollarship.schollarship_name}</h5>
                                <div>
                                    <Popup trigger={<Button variant="contained" color="primary" style={{ background: "#43A047" }} >Check Status</Button>} modal >
                                        {close => <CheckStatus close={close} schollarship={schollarship} />}
                                    </Popup>

                                </div>
                            </div>
                        </li>)}
            </ul>
        </div>
    )
}
const StudentInfo = ({ schollarship, close }) => {
    return (
        <div className="schollarship-form">
            <div className="schollarship-info-item">
                <span>Name</span><span >{schollarship.name}</span></div>
            <div className="schollarship-info-item">
                <span>Email</span><span >{schollarship.email}</span></div>

            <div className="schollarship-info-item">
                <span>Address </span><span >{schollarship.address}</span></div>
            <div className="schollarship-info-item">
                <span>Annual Family Income</span><span >{schollarship.income}</span></div>
            <div className="schollarship-info-item">
                <span>Cast</span><span >{schollarship.cast}</span></div>

            <div className="schollarship-info-item">
                <span>Date of Birth</span><span >{schollarship.dateOfBirth}</span></div>
            <div className="schollarship-info-item">
                <span>Adhaar No</span><span >{schollarship.adhaar}</span></div>
            <div className="schollarship-info-item-btn">
                <Button onClick={close} color="primary" variant="contained" style={{ background: "#f44336" }}>Close</Button></div>
        </div>
    )
}
const SchollarshipForm = ({ schollarship }) => {
    function dateFormatter(date) {
        const newDate = new Date(date)
        return `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`
    }
    async function approveApplication() {
        const res = await axios.patch('api/schollarship', { id: schollarship._id, status: "Approved" });
        console.log(res)
    }
    async function rejectApplication() {
        const res = await axios.patch('api/schollarship', { id: schollarship._id, status: "Rejected" });
        console.log(res)
    }
    return (
        <div className="schollarship-form">
            <div className="schollarship-info-item">
                <span>Name</span><span >{schollarship.name}</span></div>
            <div className="schollarship-info-item">
                <span>Email</span><span >{schollarship.email}</span></div>
            <div className="schollarship-info-item">
                <span>Schollarship Name</span><span >{schollarship.schollarship_name}</span></div>
            <div className="schollarship-info-item">
                <span>Address </span><span >{schollarship.address}</span></div>
            <div className="schollarship-info-item">
                <span>Annual Family Income</span><span >{schollarship.income}</span></div>
            <div className="schollarship-info-item">
                <span>Cast</span><span >{schollarship.cast}</span></div>
            <div className="schollarship-info-item">
                <span>Date of Application</span><span >{dateFormatter(schollarship.date)}</span></div>
            <div className="schollarship-info-item">
                <span>Date of Birth</span><span >{schollarship.dateOfBirth}</span></div>
            <div className="schollarship-info-item">
                <span>Adhaar No</span><span >{schollarship.adhaar}</span></div>
            <div className="schollarship-info-item-btn">
                <Button onClick={approveApplication} color="primary" variant="contained" style={{ background: "#43A047" }}>Approved</Button>
                <Button onClick={rejectApplication} color="primary" variant="contained" style={{ background: "#f44336" }}>Reject</Button></div>
        </div>
    )
}
const CheckStatus = ({ scholarship, close }) => {
    return (
        <div>
            <h3 style={{ textAlign: "center" }}>Ready for Disbursment</h3>
            <div className="center-flex">
                <Button onClick={close} color="primary" variant="contained" style={{ background: "#f44336" }}>OK</Button>
            </div>

        </div>
    )
}

const ReasonForRejection = ({ scholarship, close }) => {
    console.log(close)
    return (
        <div>
            <h3 style={{ textAlign: "center" }}>No reason found</h3>
            <div className="center-flex">
                <Button onClick={close} color="primary" variant="contained" style={{ background: "#f44336" }}>OK</Button>
            </div>

        </div>
    )
}
export default AlumniDashboard
