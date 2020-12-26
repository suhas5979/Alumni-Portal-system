import React, { useState, useEffect } from 'react'
import { TextField, Button, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { Faqs } from './data/FAQs'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Schollarship = (props) => {
    const [active, setActive] = useState("Profile");

    const [student, setStudent] = useState(null);
    const [schollarships, setSchollarships] = useState(null);



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
    const email = sessionStorage.getItem("email");

    useEffect(() => {
        getStudentInfo()
    }, [])
    async function getStudentInfo() {
        const res = await axios.get(`/api/student/${email}`);
        console.log(res.data)
        setStudent(res.data)

    }
    async function getSchollarships() {
        console.log(email)
        const res = await axios.get(`/api/schollarship/${email}`);
        console.log(res.data)
        setSchollarships(res.data)
    }
    return (
        <div className="schollarship-page">
            <div className="schollarship-nav">
                <ul>
                    <li onClick={() => setActive("Profile")} style={{ background: decideColor("Profile"), color: decideTextColor("Profile") }}>Profile</li>
                    <li onClick={() => setActive("All Schollarship")} style={{ background: decideColor("All Schollarship"), color: decideTextColor("All Schollarship") }}>All Schollarship</li>
                    <li onClick={() => { setActive("My Applied Schollarship"); getSchollarships() }} style={{ background: decideColor("My Applied Schollarship"), color: decideTextColor("My Applied Schollarship") }}>My applied Schollarship</li>
                    <li onClick={() => setActive("Rejected Applications")} style={{ background: decideColor("Rejected Applications"), color: decideTextColor("Rejected Apllications") }}>Rejected Applications</li>
                    <li onClick={() => setActive("FAQs")} style={{ background: decideColor("FAQs"), color: decideTextColor("FAQs") }}>FAQs</li>
                </ul>
            </div>
            {active === "All Schollarship" && (<div className="schollarship-list" >
                <ul>
                    <li>
                        <div className="schlp-info">
                            <h4>Pragati Schollarship</h4>
                            <span>For girls</span>
                        </div>

                        <Popup trigger={<Button variant="outlined" color="primary"  >eligibility criteria</Button>} modal >
                            <SchollarshipCriteria name={"Pragati Schollarship"} />
                        </Popup>

                        <Popup trigger={<Button variant="contained" color="primary">Apply Now</Button>} modal >
                            <ScholarshipForm name={"Pragati Schollarship"} email={email} />
                        </Popup>


                    </li>
                    <li>

                        <div className="schlp-info">
                            <h4>1000 Dreams Schollarship</h4>
                            <span>For girls</span>
                        </div>
                        <Popup trigger={<Button variant="outlined" color="primary"  >eligibility criteria</Button>} modal >
                            <SchollarshipCriteria name={"1000 Dreams Schollarship"} />
                        </Popup>
                        <Popup trigger={<Button variant="contained" color="primary" >Apply Now</Button>} modal >
                            <ScholarshipForm name={"1000 Dreams Schollarship"} email={email} />
                        </Popup>
                    </li>
                    <li>
                        <div className="schlp-info">
                            <h4>Leadership Developement Schollarship</h4>
                            <span>Leadership</span>
                        </div>
                        <Popup trigger={<Button variant="outlined" color="primary"  >eligibility criteria</Button>} modal >
                            <SchollarshipCriteria name={"Leadership Developement Schollarship"} />
                        </Popup>
                        <Popup trigger={
                            <Button variant="contained" color="primary" >Apply Now</Button>} modal >
                            <ScholarshipForm name={"Leadership Developement Schollarship"} email={email} />
                        </Popup></li>
                    <li>
                        <div className="schlp-info">
                            <h4>Startup Schollarship</h4>
                            <span>For Entrepreneur</span>
                        </div>
                        <Popup trigger={<Button variant="outlined" color="primary"  >eligibility criteria</Button>} modal >
                            <SchollarshipCriteria name={"Startup Schollarship"} />
                        </Popup>
                        <Popup trigger={
                            <Button variant="contained" color="primary">Apply Now</Button>} modal >
                            <ScholarshipForm name={"Startup Schollarship"} email={email} />
                        </Popup></li>
                </ul>
            </div>)}
            {active === "Profile" && student !== null && (
                <StudentProfile student={student} />)}
            {active === "My Applied Schollarship" && schollarships !== null && (
                <div className="applied-schollarship">
                    <ul>
                        {schollarships.length === 0 ?
                            <li>
                                <div className="schlp-item">
                                    <span>No applications</span>
                                </div>
                            </li>
                            : (schollarships).map(schollarship =>
                                <li key={`${schollarship.schollarship_name}${schollarship.name}`}>
                                    <div className="schlp-item">
                                        <h3>{schollarship.schollarship_name}</h3>
                                        {console.log(schollarship.status)}
                                        <Button variant="contained" color="primary">Cancel</Button>
                                    </div>
                                </li>
                            )}
                    </ul>
                </div>
            )}

            {active === "Rejected Applications" && Faqs !== null && (
                <div className="applied-schollarship">
                    <ul >
                        <li >
                            <div className="schlp-item">
                                <span>No Rejected applications</span>
                            </div>
                        </li>
                    </ul>
                </div>
            )}

            {active === "FAQs" && Faqs !== null && (
                <div className="applied-schollarship">
                    <ul >
                        {Faqs.length === 0 ?
                            <li>
                                <div className="schlp-item">
                                    <span>No applications</span>
                                </div>
                            </li>
                            : (Faqs).map((faq, i) =>
                                <li key={faq} style={{ background: decideBackground(i) }} >
                                    <div className="schlp-item">
                                        <h3>{faq.name}</h3>
                                        <Popup trigger={<Button variant="contained" color="primary">View</Button>} modal >
                                            <FaqInformation info={faq.info} />
                                        </Popup>

                                    </div>
                                </li>
                            )}
                    </ul>
                </div>
            )}
        </div>
    )
}
const ScholarshipForm = ({ name: scholarship, email }) => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [adhaar, setAdhaar] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [income, setIncome] = useState("");
    const [cast, setCast] = useState("Open");


    function validateForm() {
        if (fullName === "" || address === "" | adhaar === "" || mobileNo === "" ||
            dateOfBirth === "" || income === "") {
            return false;
        } else {
            return true;
        }
    }
    async function applySchollarship(name) {
        if (validateForm()) {
            try {
                const res = await axios.post('/api/schollarship', { dateOfBirth: dateOfBirth, email: email, address: address, income: income, cast: cast, contact: mobileNo, name: fullName, schollarship_name: scholarship });
            } catch (err) {
                window.alert("schollarship not register")
            }
        } else {
            window.alert("please fill the form")
        }

    }
    return (
        <>
            <h3>{scholarship}</h3>
            <div className="scholarship-form">
                <div className="input-margin" >
                    <TextField onChange={(e) => setFullName(e.target.value)} label="Full Name" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField value={email} disabled label="Email" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField onChange={(e) => setAddress(e.target.value)} label="Address" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField onChange={(e) => setMobileNo(e.target.value)} label="Mobile No" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField onChange={(e) => setDateOfBirth(e.target.value)} label="Date of Birth" fullWidth />
                </div>
                <div className="input-margin" >
                    <span>Annual Family income</span>
                    <select onChange={(e) => setIncome(e.target.value)} style={{ padding: "3px", outline: "none", margin: "0px 10px" }}>
                        <option>Below 40000</option>
                        <option>Below 1 lac</option>
                        <option>Below 6 lac</option>
                        <option>Above 6 lac</option>
                        <option>Infinity</option>
                    </select>
                    <input type="file" />
                </div>
                <div className="input-margin" >
                    <span>Cast</span>
                    <select onChange={(e) => setCast(e.target.value)} style={{ padding: "3px", outline: "none", margin: "0px 10px" }}>
                        <option>Open</option>
                        <option>OBC</option>
                        <option>NT</option>
                        <option>SC</option>
                        <option>ST</option>
                    </select>
                    <input type="file" />
                </div>
                <div className="input-margin" >
                    <TextField onChange={(e) => setAdhaar(e.target.value)} label="Adhaar Number" fullWidth />
                </div>
                <div style={{ display: "flex", justifyContent: "space-around", padding: "10px" }} >
                    <Button onClick={applySchollarship} variant="contained" color="primary" style={{ background: "#43A047" }} >Apply for Scholarship</Button>
                    <Button variant="contained" color="primary" style={{ background: "#f44336" }} >Discard</Button>
                </div>
            </div>
        </>
    )
}

const SchollarshipCriteria = ({ name }) => {
    return (
        <>
            <div className="criteria-popup">
                <h3>{name}</h3>
                <div>
                    <span style={{ color: "#FF5722" }}>Eligibility</span>
                    <p>Students who are above 8.25 CGPA of successful candidates in the relevant
                    stream from the respective Board of Examination in Class XII of 10+2 pattern
                    or equivalent and pursuing regular courses (not correspondence or distance
                    mode) in Colleges/Institutions recognized by All India Council of Technical
                    Education, UGC Act, 1956, Medical Council of India, Dental Council of India
                    and respective regulatory authorities and not availing benefit of any other
                    scholarship scheme including State run scholarship schemes/Fee waiver and
                    reimbursement scheme are eligible under the scheme. Students pursuing Diploma
                 courses are not eligible under the scheme. </p>
                </div>
                <div>
                    <span style={{ color: "#FF5722" }}>Reservations</span>
                    <p>Students belonging to reserved categories/weaker sections /minorities are eligible
                    on the basis of merit, subject to Central Reservation Policy and internal
                    earmarking. Reservations for the various categories are as follows : Scheduled
                    Castes (SCs) 15 % , Scheduled Tribes ( STs) 7.5 %, Other Backward
                    Classes(OBCs) 27 % and horizontally 5 % for Physically Handicapped /
                    Persons(s) with Disabilities (PwDs) in all the categories.
</p>
                </div>
                <div>
                    <span style={{ color: "#FF5722" }}>Rate Of Scholarship</span>
                    <p>The rate of scholarship is Rs.10000/- per annum at Graduation level for first three
                    years of College and University courses and Rs.20000/- per annum at PostGraduation level. Students pursuing professional courses, in case, where the
                    duration of course is five (5) years/Integrated course would get Rs.20000/- per
                annum in the 4th and 5th year. However, students pursuing technical courses such as B.Tech., B.Engg would get scholarship up to graduation level.</p>
                </div>
                <div>
                    <span style={{ color: "#FF5722" }}>
                        Parental Income Ceiling
                </span>
                    <p>The parental/family income ceiling is Rs. 1 lakh per annum for all categories
                    under the scheme and would be applicable from the Academic Session 2020-21.
                    Income certificate would be required for the fresh applicants only.</p>
                </div>
            </div>
            <div>
                <Checkbox /> <span>Yes I read all criteria and i understand</span></div>
        </>
    )
}
const FaqInformation = ({ info }) => {
    console.log(info)
    return (
        <div style={{ padding: "10px" }}>
            <p >{info} </p>
        </div>
    )
}
const StudentProfile = ({ student }) => {
    if (student === null) {
        return (
            <div className="schlp-profile">
                Loading........
            </div>
        )
    }
    return (
        <div className="schlp-profile">
            <div style={{ display: "flex" }}>
                <div style={{ width: "220px", padding: "10px" }}>
                    <img src={require('../assets/avatar-rect.jpg')} style={{ width: "100%", padding: "10px" }} />
                </div>
                <div>
                    <div style={{ padding: "10px" }}>
                        <span style={{ fontSize:"2rem" }}>{student.name}</span></div>
                    <div style={{ padding: "10px" }}>
                        <span style={{ fontSize:"1rem",color:"#0288D1" }}>{student.email}</span></div>
                </div>

            </div>
            <div style={{borderTop:"1px solid #dddddd"}}>
            <div style={{ padding: "10px" }}>
                        <span>Name :</span>
                        <span>{student.name}</span></div>
                    <div style={{ padding: "10px" }}>
                        <span>Email :</span>
                        <span>{student.email}</span></div>
            </div>
        </div>
    )
}
export default Schollarship
