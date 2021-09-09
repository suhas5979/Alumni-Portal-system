import React from "react";
import "../components/css/Contact.css";
import { Fade } from "react-reveal";

export default function Contact() {
  const isDark = false;
  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">{"Connect To Aulmni"}</h1>
            <br />
            <br />
            <p
              className={
                isDark
                  ? "dark-mode contact-subtitle"
                  : "contact-subtitle"
              }
            >
              {"Career Guidance,Scholarship And Other Opportunities"}
            </p>
          </div>
        </div>
      </div>
    </Fade>
  );
}
