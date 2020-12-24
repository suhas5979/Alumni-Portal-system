import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AlumniDashboard from './components/AlumniDashboard';
import AlumniLogin from './components/AlumniLogin';
import AlumniRegistration from './components/AlumniRegistration';
import Feedback from './components/Feedback';
import Home from './components/Home';
import Schollarship from './components/Schollarship';
import { StudentDashboard, Home as StudentHome } from './components/StudentDashboard';
import StudentLogin from './components/StudentLogin';
import StudentRegistration from './components/StudentRegistration';
function App() {
  return (
    <BrowserRouter >
      <Route path="/" exact component={Home} />
      <Route path="/student_reg" exact component={StudentRegistration} />
      <Route path="/alumni_reg" exact component={AlumniRegistration} />
      <Route path="/alumni_login" exact component={AlumniLogin} />
      <Route path="/student_login" exact component={StudentLogin} />
      <Route path="/student" component={StudentDashboard} />
      <Route path="/student/home" exact component={StudentHome} />
      <Route path="/student/schollarship" exact component={Schollarship} />
      <Route path="/student/feedback" exact component={Feedback} />
      <Route path="/alumni" exact component={AlumniDashboard} />
    </BrowserRouter>
  );
}

export default App;
