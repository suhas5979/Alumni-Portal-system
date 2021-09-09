import React from "react";
import "../components/css/Footer.css";
import { Fade } from "react-reveal";

export default function Footer() {
  const isDark = false;
  return (
    <Fade bottom duration={500} distance="5px">
      <div className="footer-div">
        <p className={isDark ? "dark-mode footer-text" : "footer-text"}>
          {"Developed Wtih passion by Suhas S Suryavanshi "}
        </p>
      </div>
    </Fade>
  );
}
