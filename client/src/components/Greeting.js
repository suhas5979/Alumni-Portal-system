import React from "react";
import { Fade } from "react-reveal";
import "./css/Greeting.css";
import { Link } from "react-router-dom";
import Button from "./button/Button";

export default function Greeting() {
  const isDark = false;
  return (
    <Fade bottom duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-main">
          <div className="greeting-text-div">
            <div>
              <h1
                className={isDark ? "dark-mode greeting-text" : "greeting-text"}
              >
                {" "}
                {"Alumna"}
                {" Connect"}
              </h1>
              <p
                className={
                  isDark
                    ? "dark-mode greeting-text-p"
                    : "greeting-text-p subTitle"
                }
              >
                {""}
              </p>
              {/* <SocialMedia /> */}
              <div className="button-greeting-div">
                <Link to="student_login">
                  <Button text="Student Log In " />
                </Link>
                <Link to="alumni_login">
                  <Button text="Alumni Log In" href="#contact" />
                </Link>
              </div>
            </div>
          </div>
          <div className="greeting-image-div">
          </div>
        </div>
      </div>
    </Fade>
  );
}
