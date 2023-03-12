import { useRef, useState, useEffect } from 'react';
import callerApi from '../../utils/APICaller_Account';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-materialize';
import Box from '@mui/material/Box';

const Login = () => {
    const navigate = useNavigate()

    const userRef = useRef();

    const [mail, setmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [mail, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        callerApi("Login", "POST", {
            email: mail,
            password: pwd,
        }).then(response => {
            console.log(response);
            console.log(JSON.stringify(response?.data));
            if (response?.status === 200) {
                localStorage.setItem("accessToken", response.accessToken)
                console.log(response.accessToken);
                navigate("/Admin");
            }
        }).catch(err => {
            console.log(err.response.status);
            setErrMsg(err.response.data);
        });
    }
    return (
        < >
            <Box
                sx={{
                    width: 300,
                    height: 370,
                }}
                className='loginform'
            >
                <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h4>Login</h4>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setmail(e.target.value)}
                        value={mail}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required

                    />
                    
                    <Link to={"/khoi-phuc-tai-khoan"}>Forgot Password?</Link>
                    <Button
                        style={{
                            backgroundColor: "blue",
                            width: "100%",
                            borderRadius: "25px",
                            margin:"7px 0 7px 0"
                        }}
                    >Login</Button>

                    <div className='signup_link'>
                        Need an Account?
                        <span className="line">
                            <Link to={'/dang-ky'}>Sign up</Link>
                        </span>
                    </div>
                </form>

            </Box>
        </>
    )
}

export default Login