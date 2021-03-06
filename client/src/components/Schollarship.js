import React, { useState, useEffect } from 'react'
import { TextField, Button, Checkbox } from '@material-ui/core';
import axios from 'axios';
import { Faqs } from './data/FAQs'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './css/Scholarship.css';
const schol = [{ name: "Pragati Schollarship", candidates: "For girls" },
{ name: "Leadership Schollarship", candidates: "" },
{ name: "1000 Dreams Schollarship", candidates: "" },
{ name: "Startup Schollarship", candidates: "" }
];
function decideBackground(i) {
    if (i % 2 == 0) {
        return '#90CAF9'
    }
    else {
        return '#64B5F6'
    }
}
const Schollarship = (props) => {
    document.title = "Alumni Portal | Student | Scholarship"
    const [active, setActive] = useState("Profile");

    const [student, setStudent] = useState(null);
    const email = sessionStorage.getItem("email");

    useEffect(() => {
        getStudentInfo()
    }, [])
    async function getStudentInfo() {
        const res = await axios.get(`/api/student/${email}`);
        console.log(res.data)
        setStudent(res.data)

    }
    return (
        <div className="schollarship-page">
            <div className="schollarship-nav">
                <ul>
                    <li className={`${active === "Profile" && "scholarship-nav--selected"}`} onClick={() => setActive("Profile")} >Profile</li>
                    <li className={`${active === "All Schollarship" && "scholarship-nav--selected"}`} onClick={() => setActive("All Schollarship")}>All Schollarship</li>
                    <li className={`${active === "My Applied Schollarship" && "scholarship-nav--selected"}`} onClick={() => { setActive("My Applied Schollarship") }} >My applied Schollarship</li>
                    <li className={`${active === "Rejected Applications" && "scholarship-nav--selected"}`} onClick={() => setActive("Rejected Applications")} >Rejected Applications</li>
                    <li className={`${active === "FAQs" && "scholarship-nav--selected"}`} onClick={() => setActive("FAQs")} >FAQs</li>
                </ul>
            </div>
            {active === "All Schollarship" && (<div className="schollarship-list" >
                <ul>
                    {schol.map(sch =>
                        <li>
                            <div className="schlp-info">
                                <h4>{sch.name}</h4>
                                <span>{sch.candidates}</span>
                            </div>
                            <Popup trigger={<Button variant="outlined" color="primary" style={{ marginRight: "5px" }}  >eligibility criteria</Button>} modal >
                                <SchollarshipCriteria name={sch.name} />
                            </Popup>
                            <Popup trigger={<Button variant="contained" color="primary">Apply Now</Button>} modal >
                                {close => <ScholarshipForm close={close} student={student} name={sch.name} email={email} />}
                            </Popup>
                        </li>)}
                </ul>
            </div>)}
            {active === "Profile" && student !== null && (
                <StudentProfile callback={getStudentInfo} student={student} />)}
            {active === "My Applied Schollarship" && (
                <MyAppliedScholarships email={email} />
            )}

            {active === "Rejected Applications" && Faqs !== null && (
                <MyRejectedScholarships email={email} />
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
                                        <h5>{faq.name}</h5>
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
const ScholarshipForm = ({ name: scholarship, email, student, close }) => {
    console.log(student)
    const [fullName, setFullName] = useState(student.fullName);
    const [address, setAddress] = useState(student.address);
    const [adhaar, setAdhaar] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(student.dateOfBirth);
    const [mobileNo, setMobileNo] = useState(student.mobileNo);
    const [income, setIncome] = useState("Below 40000");
    const [cast, setCast] = useState("Open");


    function validateForm() {
        if (fullName === "" || address === "" | adhaar === "" || mobileNo === "" ||
            dateOfBirth === "") {
            return false;
        } else {
            return true;
        }
    }
    async function applySchollarship(name) {
        if (validateForm()) {
            try {
                const res = await axios.post('/api/schollarship', { dateOfBirth: dateOfBirth, email: email, address: address, income: income, cast: cast, contact: mobileNo, name: fullName, schollarship_name: scholarship });
                close();
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
                    <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} label="Full Name" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField value={email} disabled label="Email" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField value={address} onChange={(e) => setAddress(e.target.value)} label="Address" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} label="Mobile No" fullWidth />
                </div>
                <div className="input-margin" >
                    <TextField value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} label="Date of Birth" fullWidth />
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
                    <Button onClick={close} variant="contained" color="primary" style={{ background: "#f44336" }} >Discard</Button>
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
            <h2 style={{ textAlign: "center",color: "#FF5722" }}>Answer</h2>
            <p style={{paddingTop: "10px" }}>{info} </p>
        </div>
    )
}
const StudentProfile = ({ callback, student }) => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [active, setActive] = useState("Information");
    if (student === null) {
        return (
            <div className="schlp-profile">
                Loading........
            </div>
        )
    }
    function validateForm() {
        if (fullName === "" || address === "" || mobileNo === "" ||
            dateOfBirth === "") {
            return false;
        } else {
            return true;
        }
    }
    function decideColor(name) {
        return active === name ? '#0288D1' : '#FFFFFF';
    }
    function decideTextColor(name) {
        return active === name ? '#FFFFFF' : '#000000';
    }
    async function editProfile() {
        if (validateForm()) {
            try {
                const res = await axios.patch('/api/student', { email: student.email, fullName, address, dateOfBirth, mobileNo });
                console.log(res.data)
                callback();

            } catch (err) {
                window.alert("something went wrong")
            }
        } else {
            window.alert("please enter information")
        }
    }
    return (
        <div className="schlp-profile">
            <div style={{ display: "flex" }}>
                <div style={{ width: "220px", padding: "10px" }}>
                    <img src={require('../assets/avatar-rect.jpg')} style={{ width: "100%", padding: "10px" }} />
                </div>
                <div>
                    <div style={{ padding: "10px" }}>
                        <span style={{ fontSize: "2rem" }}>{student.name}</span></div>
                    <div style={{ padding: "10px" }}>
                        <span style={{ fontSize: "1rem", color: "#0288D1" }}>{student.email}</span></div>
                    <div style={{ padding: "10px" }}>
                        <span style={{ fontSize: "1rem" }}>{student.mobileNo === "" ? "No Contact" : student.mobileNo}</span></div>
                </div>

            </div>
            <div style={{ borderTop: "1px solid #dddddd" }}>
                <div className="student-profile-nav" >
                    <ul style={{ display: "flex" }}>
                        <li onClick={() => setActive("Information")} style={{ background: decideColor("Information"), color: decideTextColor("Information") }}>Information</li>
                        <li onClick={() => setActive("Edit Information")} style={{ background: decideColor("Edit Information"), color: decideTextColor("Edit Information") }}>Edit Information</li>
                    </ul>
                </div>
                {active === "Information" && (
                    <div>
                        <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "1rem", color: "#0288D1" }}>Address :</span>
                            <div>
                                <span>{student.address}</span>
                            </div>
                        </div>
                        <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "1rem", color: "#0288D1" }}>Date of Birth :</span>
                            <div>
                                <span>{student.dateOfBirth}</span>
                            </div>

                        </div>
                        <div style={{ padding: "10px", display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "1rem", color: "#0288D1" }}>Gender :</span>
                            <div>
                                <span>{"None"}</span>
                            </div>
                        </div>
                    </div>
                )}
                {active === "Edit Information" && (
                    <div style={{ padding: "5px" }}>
                        <div className="input-margin" >
                            <TextField fullWidth onChange={(e) => setFullName(e.target.value)} label="Full Name" />
                        </div>
                        <div className="input-margin" >
                            <TextField fullWidth disabled value={student.email} label="Email" />
                        </div>
                        <div className="input-margin" >
                            <TextField fullWidth onChange={(e) => setAddress(e.target.value)} label="Address" />
                        </div>
                        <div className="input-margin" >
                            <TextField fullWidth onChange={(e) => setMobileNo(e.target.value)} label="Mobile No" />
                        </div>
                        <div className="input-margin" >
                            <TextField fullWidth onChange={(e) => setDateOfBirth(e.target.value)} label="Date of Birth" />
                        </div>
                        <Button onClick={editProfile} style={{ background: "#03A9F4", color: "#FFFFFF" }} > Edit</Button>
                    </div>
                )}


            </div>
        </div>
    )
}
const AreYouSureWarning = ({ scholarship, msg }) => {
    return (
        <div className="font" style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ padding: "10px" }}>Are you sure you want to cancel {scholarship.schollarship_name} </span>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button style={{ background: "#f44336", color: "#FFFFFF" }} >Cancel Application</Button>
            </div>

        </div>
    )
}
const ViewInfo = ({ msg,close }) => {
    return (
        <div className="font" style={{ padding:"10px", display: "flex", flexDirection: "column" }}>
            <p>{msg}</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button onClick={close} style={{ background: "#f44336", color: "#FFFFFF" }} >Close</Button>
            </div>

        </div>
    )
}
const MyAppliedScholarships = ({ email }) => {
    const [scholarships, setScholarships] = useState([])

    useEffect(() => {
        getMySchollarships()
    }, [])
    async function getMySchollarships() {
        console.log(email)
        const res = await axios.get(`/api/schollarship/${email}`);
        console.log(res.data)
        setScholarships(res.data)
    }
    function decideColorForStatus(text) {
        return text === "Rejected" ? "#f44336" : "#4CAF50";
    }
    return (
        <div className="applied-schollarship">
            <ul>
                {scholarships.length === 0 ?
                    <li>
                        <div className="schlp-item">
                            <span>No applications</span>
                        </div>
                    </li>
                    : (scholarships).map((scholarship, i) =>
                        <li  key={`${scholarship.schollarship_name}${scholarship.name}`}>
                            <div className="schlp-item">
                                <h4>{scholarship.schollarship_name}</h4>
                                <h5 style={{ color: decideColorForStatus(scholarship.status) }}>{scholarship.status}</h5>
                                <Popup trigger={<Button variant="contained" color="primary" style={{ marginRight: "5px", background: "#f44336" }}>Cancel</Button>} modal >
                                    <AreYouSureWarning scholarship={scholarship} />
                                </Popup>

                            </div>
                        </li>
                    )}
            </ul>
        </div>
    )
}
const MyRejectedScholarships = ({ email }) => {
    const [scholarships, setScholarships] = useState([])

    useEffect(() => {
        getMySchollarships()
    }, [])
    async function getMySchollarships() {
        console.log(email)
        const res = await axios.get(`/api/schollarship/${email}`);
        console.log(res.data)
        const filtered = res.data.filter(e => e.status === "Rejected");;
        setScholarships(filtered)
    }
    return (
        <div className="applied-schollarship">
            <ul>
                {scholarships.length === 0 ?
                    <li>
                        <div className="schlp-item">
                            <span>No applications</span>
                        </div>
                    </li>
                    : (scholarships).map((scholarship, i) =>
                        <li key={`${scholarship.schollarship_name}${scholarship.name}`}>
                            <div className="schlp-item">
                                <h4>{scholarship.schollarship_name}</h4>
                                <Popup trigger={<Button variant="contained" color="primary">View Reason</Button>} modal >
                                   {close => <ViewInfo close ={close} msg={"If you've applied for scholarships before, you'll understand how lengthy some scholarships forms can be. From details of all your family members to every last thing you did in school, some applications request enough information for you to write an autobiography. Tedious as it may be, you have to make sure you provide all the info they want, and if for some reason you can't, be sure you include a short explanation why."} /> } 
                                </Popup>

                            </div>
                        </li>
                    )}
            </ul>
        </div>
    )
}

export default Schollarship
