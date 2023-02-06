import React from 'react';
import { Link } from "react-router-dom";
export default function Footer() {
    return(
        <div className="footer">
            <div className="footer-box">
                <Link to="/" style={{textDecoration: "none"}}>
                    <img src="assets/images/logo.png" alt="logo" width="50" height="50" />
                </Link>

                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                    <div style={{fontWeight: "bold"}}>Bird Care Consulting</div>
                </Link>
            </div>

            <div className="footer-box">
                <div style={{fontWeight: "bold"}}>Available Time:</div>
                <div>Mon to Fri: 6AM-5PM</div>
                <div>Sat to Sun: Closed</div>
            </div>

            <div className="footer-box">
                <div style={{fontWeight: "bold"}}>Services:</div>
                <Link to="/schedule/nau-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Nấu Chim</div>
                </Link>
                <Link to="/schedule/tam-cho-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Tắm Cho Chim</div>
                </Link>
                <Link to="/schedule/chai-long-cho-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Chải Lông Cho Chim</div>
                </Link>
                <Link to="/schedule/kham-benh-cho-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Khám Bệnh Cho Chim</div>
                </Link>
            </div>

            <div className="footer-box">
                <div><div style={{fontWeight: "bold"}}>Address:</div> 1234 Abyss Void, Juggement Road, High Fire city, 19972</div>
                <div><div style={{fontWeight: "bold"}}>Hotline:</div> 19001080</div>
            </div>

            <div className="footer-box">
                <Link to="/about" style={{textDecoration: "none"}}>
                    <div style={{fontWeight: "bold"}}>More About Us</div>
                </Link>
            </div>

        </div>
    )
}