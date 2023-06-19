import React from "react";
import "./Footer.css";

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="">
                <h2 className="footer-header">Connect with me</h2>
                <div className="all-group-container">
                    <div className="person-container">
                        <h4 className="single-name">Ashkaun Iranfar</h4>
                        <div className="links-wrapper">
                            <a
                                href="https://www.linkedin.com/in/ashkaun-iranfar-608387220/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="linkedin-link"
                            >
                                <div className="linked-in-wrapper">
                                    <div className="linkedin-github-text">LinkedIn</div>
                                    <i className="fa-brands fa-linkedin"></i>
                                </div>
                            </a>
                            <a href="https://github.com/AIranfar" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                                <div className="github-wrapper">
                                    <div className="linkedin-github-text">Github</div>
                                    <i className="fa-brands fa-github"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
