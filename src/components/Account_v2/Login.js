import { useRef, useEffect } from 'react';
import callerApi from '../../utils/APICaller_Account';
import { Link} from 'react-router-dom';
import { Button} from 'react-materialize';
import Box from '@mui/material/Box';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InfoIcon from '@mui/icons-material/Info';
import { textAlign } from '@mui/system';
const Login = () => {
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: Yup.object({
          email: Yup.string()
            .email('Mail không hợp lệ')
            .required('Không được để trống'),
          password: Yup.string()
            .required('không được để trống'),
        }),
        onSubmit: values => {
            callerApi('Login', 'POST', {
            email: values.email,
            password: values.password,
          }).then(res => {
            if (res.status === 200){
              toast.success("Đăng nhập thành công");
              setInterval(() => {
                checkLogin();
              }, 2000);
            }
          }).catch(err => {
            toast.error("Sai email hoặc mật khẩu");
          })
          console.log(values);
        }
      });
    
      function checkLogin(){
        callerApi('GetCurrentCustomer', 'GET', null).then(res => {
          if (res.data.roleId === 1){
            window.location.href = "/";
          } else if (res.data.roleId === 2){
            window.location.href = "/admin";
          }
        }).catch(err => {
          console.log(err);
        })
      }
    
    const userRef = useRef();
    useEffect(() => {
        userRef.current.focus();
    }, [])

    return (
        < >
            <Box
                sx={{
                    width: 300,
                    minHeight: 370,
                    maxHeight:460
                }}
                className='loginform'
                
            >
                <h4>Đăng nhập</h4>
                <form component="form" onSubmit={formik.handleSubmit}>
                    <label htmlFor="email" style={{fontSize:"15px"}}>Email:</label>
                    <input
                        type="text"
                        ref={userRef}
                        autoComplete="off"
                        placeholder="Nhập Email..."
                        id="email"
                        onChange={formik.handleChange}
                        required
                    /> 
                    {formik.errors.email && formik.touched.email && (<p 
                    style={{ color: "red",
                             display:"flex",
                             
                    }}>
                        <InfoIcon/>
                        <div>{formik.errors.email}</div>
                    </p>)}
                    <label htmlFor="password" style={{fontSize:"15px"}}>Mật khẩu:</label>
                    <input
                    placeholder="Nhập Mật Khẩu..."
                    id="password"
                    type="password"
                    onChange={formik.handleChange}

                    />
                    {formik.errors.password && formik.touched.password && (
                    <p style={{ color: "red",
                                display:"flex",
                                
                    }}>
                        <InfoIcon/>
                        <div>{formik.errors.password}</div>
                    </p>)}
                    <Link to={"/khoi-phuc-tai-khoan"}>Quên mật khẩu?</Link>
                    <Button
                        style={{
                            background:"rgb(34,193,195)",
                            background:"linear-gradient(90deg, rgba(34,193,195,1) 0%,     rgba(253,187,45,1) 100%)",
                            width: "100%",
                            borderRadius: "25px",
                            margin:"7px 0 7px 0"
                        }}
                    >Đăng nhập</Button>

                    <div className='signup_link'>
                        Chưa có tài khoản?
                        <span className="line">
                            <Link to={'/dang-ky'}>Đăng ký</Link>
                        </span>
                    </div>
                </form>

            </Box>
        </>
    )
}

export default Login