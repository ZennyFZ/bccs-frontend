import { useRef, useState, useEffect} from 'react';
import  useAuth  from "./useAuth";
import callerApi from '../../utils/APICaller_Account';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
    const { auth,setAuth } = useAuth();

   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/"; 

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
            console.log(JSON.stringify(response?.status));
            console.log(JSON.stringify(response?.data));
            if (response?.status === 200) {
                const role = response?.data?.role;
                console.log(response?.data?.role);
                setAuth({ mail, pwd, role });
                console.log(auth.role)
                setmail('');
                setPwd('');
                navigate(from, { replace: true });
            }
        }).catch(err => {
            console.log(err.response.status);
            setErrMsg(err.response.data);
        });
    }
    return (
    <>
        <div>
            <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
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
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to={'/dang-ky'}>Sign up</Link>
                </span>
            </p>
        </div>
    </>
    )
}

export default Login