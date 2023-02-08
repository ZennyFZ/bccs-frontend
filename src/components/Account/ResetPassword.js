import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
export default function ResetPassword() {
    return (
        <div className="LoginContainer">
            <img style={{opacity: 0.4}} src="https://8anime.net/storage/ads/2023-v2.png"></img>
            <div className="LForm">
                <h1>You forget password again?</h1>
                <h5>Bird Care Consulting System - a better place to watch anime online for free!</h5>
                <form>
                    <div>
                        <input className="LoginForm" type="text" placeholder="Input your email..."></input>
                    </div>
        
                    <Button style={{marginTop: "15px"}} variant="contained">Reset password</Button>
                    <div>Suddently remember your password OwO? <Link style={{textDecoration: "none "}} to="/login"><span style={{color: "deeppink"}}>Login now!!!</span></Link> </div>
                </form>
            </div>
        </div>
    )
}