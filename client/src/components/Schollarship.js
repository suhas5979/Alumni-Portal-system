import React, { useState } from 'react'
import { TextField, Button, Checkbox } from '@material-ui/core';
import axios from 'axios';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Schollarship = (props) => {
    const [active, setActive] = useState("All Schollarship");
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [adhaar, setAdhaar] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [schollarships, setSchollarships] = useState(null);

    const Faqs = [
        "What types of scholarships are available?",
        "What are my chances of gaining a scholarship?",
        "Can I get a scholarship for graduate study?",
        "Where do I go to find scholarship opportunities?",
        "Can I apply for a scholarship before being accepted into a university?",
        "How do I apply for international scholarships?",
        "How do I know if I am eligible to apply?",
        "What should I submit with my scholarship application?",
        "What should I include in my scholarship essay?",
        "When is the best time to apply for study abroad scholarships?",
        "How do I get help with my scholarship application letter?",
        "What are scholarship scams and how do I avoid them?",
        "Further questions?"
    ];

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

    function setButtonDesabled() {
        if (fullName === "" || address === "" | adhaar === "" || mobileNo === "") {
            return true;
        } else {
            return false;
        }
    }
    async function submitProfile() {
        const res = await axios.patch('/api/student', { email, fullName, address, mobileNo, adhaar })
    }
    async function applySchollarshipToStudent(name) {
        if (fullName !== "") {
            try {
                const res = await axios.post('/api/schollarship', { email: email, name: fullName, schollarship_name: name });
            } catch (err) {
                window.alert("schollarship not register")
            }
        } else {
            window.alert("please update your profile first")
        }

    }
    async function getSchollarships() {
        console.log(email)
        const res = await axios.post("/api/emailschollarship", { email: email });
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


                        <Button variant="contained" color="primary" onClick={() => { applySchollarshipToStudent("Pragati Schollarship") }} >Apply Now</Button>
                    </li>
                    <li>

                        <div className="schlp-info">
                            <h4>1000 Dreams Schollarship</h4>
                            <span>For girls</span>
                        </div>
                        <Popup trigger={<Button variant="outlined" color="primary"  >eligibility criteria</Button>} modal >
                            <SchollarshipCriteria name={"1000 Dreams Schollarship"} />
                        </Popup>
                        <Button variant="contained" color="primary" onClick={() => { applySchollarshipToStudent("1000 Dreams Schollarship") }} >Apply Now</Button></li>
                    <li>
                        <div className="schlp-info">
                            <h4>Leadership Developement Schollarship</h4>
                            <span>Leadership</span>
                        </div>
                        <Popup trigger={<Button variant="outlined" color="primary"  >eligibility criteria</Button>} modal >
                            <SchollarshipCriteria name={"Leadership Developement Schollarship"} />
                        </Popup>
                        <Button variant="contained" color="primary" onClick={() => { applySchollarshipToStudent("Leadership Developement Schollarship") }} >Apply Now</Button></li>
                    <li>
                        <div className="schlp-info">
                            <h4>Startup Schollarship</h4>
                            <span>For Entrepreneur</span>
                        </div>
                        <Popup trigger={<Button variant="outlined" color="primary"  >eligibility criteria</Button>} modal >
                            <SchollarshipCriteria name={"Startup Schollarship"} />
                        </Popup>
                        <Button variant="contained" color="primary" onClick={() => { applySchollarshipToStudent("Startup Schollarship") }} >Apply Now</Button></li>
                </ul>
            </div>)}
            {active === "Profile" && (
                <div className="schlp-profile">
                    <div className="profile-form">
                        <div className="input-schlp"><TextField onChange={(e) => { setFullName(e.target.value) }} fullWidth label="Full Name" /></div>

                        <div className="input-schlp">
                            <TextField value={email} disabled fullWidth label="Email" /></div>

                        <div className="input-schlp">
                            <TextField onChange={(e) => { setMobileNo(e.target.value) }} fullWidth label="Mobile No" /></div>
                        <div className="input-schlp">
                            <TextField onChange={(e) => { setAddress(e.target.value) }} fullWidth label="address" /></div>
                        <div className="select-merge">
                            <span>State  </span>
                            <select>
                                <option>Maharastra</option>
                                <option>Maddhya pradesh</option>
                                <option>Goa</option>
                            </select>
                            <span>Dist  </span>
                            <select>
                                <option>Satara</option>
                                <option>Sangli</option>
                                <option>Pune</option>
                                <option>Amravati</option>
                                <option>Aurangabad</option>
                            </select>
                        </div>
                        <div className="input-schlp">
                            <TextField onChange={(e) => { setAdhaar(e.target.value) }} fullWidth label="Adhaar No" /></div>
                        <div className="button-separator">
                            <Button onClick={submitProfile} disabled={setButtonDesabled()} variant="contained" color="primary">Apply Changes</Button>
                            <Button variant="contained" color="primary">Cancel</Button>
                        </div>

                    </div>


                </div>)}
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
                                        <h3>{faq}</h3>
                                        <Button variant="contained" color="primary">View</Button>
                                    </div>
                                </li>
                            )}
                    </ul>
                </div>
            )}
        </div>
    )
}

const SchollarshipCriteria = ({ name }) => {
    return (
        <>
        <div className="criteria-popup">
            <h3>{name}</h3>
            <div>
                <span style={{color:"#FF5722"}}>Eligibility</span>
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
                <span style={{color:"#FF5722"}}>Reservations</span>
                <p>Students belonging to reserved categories/weaker sections /minorities are eligible
                on the basis of merit, subject to Central Reservation Policy and internal
                earmarking. Reservations for the various categories are as follows : Scheduled
                Castes (SCs) 15 % , Scheduled Tribes ( STs) 7.5 %, Other Backward
                Classes(OBCs) 27 % and horizontally 5 % for Physically Handicapped /
                Persons(s) with Disabilities (PwDs) in all the categories.
</p>
            </div>
            <div>
                <span style={{color:"#FF5722"}}>RATE OF SCHOLARSHIPS</span>
                <p>The rate of scholarship is Rs.10000/- per annum at Graduation level for first three
                years of College and University courses and Rs.20000/- per annum at PostGraduation level. Students pursuing professional courses, in case, where the
                duration of course is five (5) years/Integrated course would get Rs.20000/- per
                annum in the 4th and 5th year. However, students pursuing technical courses such as B.Tech., B.Engg would get scholarship up to graduation level.</p>
            </div>
            <div>
                <span style={{color:"#FF5722"}}>
                    PARENTAL INCOME CEILING
                </span>
                <p>The parental/family income ceiling is Rs. 8 lakh per annum for all categories
                    under the scheme and would be applicable from the Academic Session 2018-19.Income certificate would be required for the fresh applicants only.</p>
            </div>
        </div>
        <div>
        <Checkbox /> <span>Yes I read all criteria and i understand</span></div>
        </>
    )
}
export default Schollarship
