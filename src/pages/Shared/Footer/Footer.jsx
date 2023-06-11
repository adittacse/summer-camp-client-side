import React from 'react';
import logo from "../../../assets/TranquilZen.png";
import moment from 'moment';

const Footer = () => {
    return (
        <div className="max-w-screen-xl mx-auto">
            <footer className="footer p-10 text-base-content">
                <div>
                    <img className="w-52" src={logo} alt="Website Footer Logo"/>
                    <p>Learn YOGA from and MEDITATION <br/>from TranquilZen online!</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </div>
                <div>
                    <span className="footer-title">Follow Us</span>
                    <a className="link link-hover">Facebook</a>
                    <a className="link link-hover">Twitter</a>
                    <a className="link link-hover">LinkedIn</a>
                    <a className="link link-hover">YouTube</a>
                </div>
                <div>
                    <span className="footer-title">Contact Us</span>
                    <p>
                        123 Main St, Suite 456<br />
                        Paris, France<br />
                        info@company.com<br />
                        (123) 456-7890
                    </p>
                </div>
            </footer>
            <footer className="footer footer-center p-4 text-base-content">
                <div>
                    <p>Copyright © {moment().format("YYYY")} - All right reserved by TranquilZen</p>
                </div>
            </footer>
        </div>
    );
};

export default Footer;