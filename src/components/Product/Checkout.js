import { Grid} from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Button} from "react-materialize";
import React from "react";
import {getTotals} from "../../context/CartSlice";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
export default function Checkout() { 
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const handleGetTotals = () => {
        dispatch(getTotals())
    }
    useEffect(() => {
        handleGetTotals();
    }, [cart])

    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [note, setNote] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [paymentType, setPaymentType] = React.useState('');
    const [billingInfo, setBillingInfo] = React.useState('');
    const [order, setOrder] = React.useState('');

    function showSubmit() {
        document.getElementById("submit").style.display = "block";
        setPaymentType("cod");
    }

    function showSubmit2() {
        document.getElementById("submit").style.display = "block";
        setPaymentType("online");
    }

    function submitBillingInfo() {
        if (paymentType == "cod") {
            navigate("/success");
        } else if (paymentType == "online") {
            navigate("/success2");
        }
    }

    const handleSubmit = (e) => {
        setOrder([cart]);
        setBillingInfo([{ name, email, phone, note, address, paymentType }])
        localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
        localStorage.setItem("orderInfo", JSON.stringify(order));;
        e.preventDefault();
        submitBillingInfo();
        // console.log(name, email, phone, note, address, paymentType);
    }


    // const {isAuthenticated} = useAuth0();
    // const checkUser = () => {
    //     if (isAuthenticated==false) {
    //         window.location.href = "http://localhost:3000/";
    //     }
    // }

    // useEffect(() => {
    //     checkUser();
    // }, [])
    // Đang cải thiện, không được uncomment

    return (
        <div className="checkout">
            <Link to="/gio-hang">
                <KeyboardBackspaceIcon />
            </Link>
            <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid xs={6}>
                    <div className="billing-detail">
                        <div className="section-title">
                            <div className="checkout-title">THÔNG TIN GỬI HÀNG</div>
                            <div className="checkout-text">Điền các thông tin dưới đây, chúng tôi sẽ liên lạc khi cần thiết</div>
                        </div>
                        <div className="form-group">
                            <input style={{
                                display: "block",
                                width: "90%",
                                height: "34px",
                                padding: "6px 12px",
                                fontSize: "16px",
                                color: "#797b7c",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc"
                            }}
                                type="text" className="form-control" placeholder="Họ tên" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <input style={{
                                display: "block",
                                width: "90%",
                                height: "34px",
                                padding: "6px 12px",
                                fontSize: "16px",
                                color: "#797b7c",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc"
                            }}
                                type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <input style={{
                                display: "block",
                                width: "90%",
                                height: "34px",
                                padding: "6px 12px",
                                fontSize: "16px",
                                color: "#797b7c",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc"
                            }}
                                type="number" className="form-control" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <textarea style={{
                                display: "block",
                                width: "93%",
                                height: "auto",
                                padding: "6px 12px",
                                fontSize: "16px",
                                color: "#797b7c",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc"
                            }}
                                type="text" className="form-control" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <textarea style={{
                                display: "block",
                                width: "93%",
                                height: "auto",
                                padding: "6px 12px",
                                fontSize: "16px",
                                color: "#797b7c",
                                backgroundColor: "#fff",
                                border: "1px solid #ccc"
                            }}
                                type="text" className="form-control" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ghi chú đơn hàng" />
                        </div>
                    </div>
                </Grid>
                <Grid xs={6}>
                    <div className="order-detail">
                        <div className="section-title">
                            <div style={{textAlign :"center"}} className="checkout-title">ĐƠN HÀNG CỦA BẠN</div>
                        </div>
                    </div>
                    <div className="order-summary">
                    <div className='Product-item-price'>
                                        <div className='Price-money'>
                                            <span className='checkout-text'>Sản Phẩm</span>
                                            <span className="space"></span>
                                            <span className="space"></span>
                                            <span className='checkout-text'>Giá Tiền</span>
                                        </div>
                                        <div >
                                            {cart.cartItems?.map(cartItem =>{
                                              return(
                                                <div className='checkout-col'  key={cartItem.ProductID}>
                                                    <span className=' checkout-text'>{cartItem.ProductName} x {cartItem.cartQuantity}</span>
                                                    <span className=' checkout-text'>{cartItem.Price} VND</span>
                                                </div>
                                              )  
                                            })}
                                        </div>
                                        <div className='checkout-col'>
                                            <span style={{fontWeight:"bold"}} className='checkout-text'>Tổng tiền</span>
                                            <span className='checkout-text'>{cart.cartTotalAmount} VND</span>
                                        </div>
                                        <span style={{fontSize: "20px", fontWeight: "bold"}}>Phương thức thanh toán:</span>
                                        <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            <Button type="button" onClick={() => showSubmit()} style={{marginLeft: "10px"}}>Thanh toán khi nhận hàng</Button>
                                            <Button type="button" onClick={() => showSubmit2()} style={{marginLeft: "30px"}}>Thanh toán online</Button>
                                        </div>
                                    </div>
                        <div className="order-sum-title"></div>
                    </div>
                    <div style={{display: "none", textAlign: "center", marginTop: "50px"}} id="submit">
                        <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Xác nhận</Button>
                    </div>
                </Grid>


                {/* <FormControl variant="standard" sx={{ m: 1}} style={{width:"95%", marginLeft: "10px"}}>
                        <InputLabel >Phương thức thanh toán</InputLabel>
                        <Select
                            value={Typepayment}
                            onChange={handleChange}
                            label="Phương Thức thanh toán"
                        >
                            <MenuItem value={"offline"}>Thanh toán tiền mặt</MenuItem>
                            <MenuItem value={"online"}>Thanh toán online</MenuItem>
                        </Select>
        </FormControl> */}
            </Grid>
            </form>
        </div>
    )
}