import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
export default function Register() {
    return (
        <div className="LoginContainer">
            <img style={{opacity: 0.4}} src="https://8anime.net/storage/ads/2023-v2.png"></img>
            <div className="LForm">
                <h1>Registration</h1>
                <h5>Bird Care Consulting System - a better place to watch anime online for free!</h5>
                <form>
                    <div>
                        <input className="LoginForm" type="text" placeholder="Your Full Name..."></input>
                    </div>
                    <div style={{marginTop: "15px"}}> 
                        <input className="LoginForm" type="text" placeholder="Your Username..."></input>
                    </div>
                    <div style={{marginTop: "15px"}}>
                        <input className="LoginForm" type="text" placeholder="Your Email..."></input>
                    </div>
                    <div style={{marginTop: "15px"}}>
                        <input className="LoginForm" type="password" placeholder="Your Password..."></input>
                    </div>
                    <Button style={{marginTop: "15px"}} variant="contained">Register</Button>
                    <div>What? Already have account? <Link style={{textDecoration: "none "}} to="/dang-nhap"><span style={{color: "deeppink"}}>Login now!!!</span></Link> </div>
                </form>
            </div>
        </div>
    )
}