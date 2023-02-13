import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
export default function Login() {
    return (
        <div className="LoginContainer">
            <img style={{opacity: 0.4, width: "1536px", height: "510px"}} src="https://8anime.net/storage/ads/2023-v2.png"></img>
            <div className="LForm">
                <h1>Đăng Nhập</h1>
                <h5>Bird Care Consulting System - a better place to watch anime online for free!</h5>
                <form>
                    <div>
                        <input className="LoginForm" type="text" placeholder="Input Your Email Here!!"></input>
                    </div>
                    <div style={{marginTop: "15px"}}>
                        <input className="LoginForm" type="password" placeholder="Input Your Password Here!!"></input>
                    </div>
                    <div>
                        <div>
                            <input type="checkbox" id="rememberMe" name="rememberMe" value="rememberMe"></input>
                            <span>Tự động đăng nhập</span>

                            <Link style={{textDecoration: "none "}} to="/khoi-phuc-tai-khoan">
                                <span style={{color: "deeppink", marginLeft: "55px"}}>Quên mật khẩu?</span>
                            </Link>
                        </div>
                    </div>
                    <Button variant="contained">Đăng nhập</Button>
                    <div>Don't have account? <Link style={{textDecoration: "none "}} to="/dang-ky"><span style={{color: "deeppink"}}>Register now!!!</span></Link> </div>
                </form>
            </div>
        </div>
    )
}