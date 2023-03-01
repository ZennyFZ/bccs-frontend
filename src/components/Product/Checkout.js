import { Grid } from "@mui/material";
import { Button } from "react-materialize";
import React from "react";
import { getTotals } from "../../context/CartSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from "react";
import APICaller3 from "../../utils/APICaller3";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {Link} from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast } from "react-toastify";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
export default function Checkout() {
    //thông tin product từ cart    
    const cart = useSelector(state => state.cart);
    const [paymentType, setPaymentType] = useState();
    const dispatchh = useDispatch();
    const handleGetTotals = () => {
        dispatchh(getTotals())
    }
    useEffect(() => {
        handleGetTotals();
    }, [cart])
    //////////////////////////////////// Tich Hop Paypal

    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatchh({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data, actions) => {
        var VNDToUSD = (cart.cartTotalAmount / 23000).toFixed(2);
        console.log(VNDToUSD);
        console.log(billingInfo)
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: VNDToUSD,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            localStorage.setItem("paymentStatus", JSON.stringify([details]));
            var bill = JSON.parse(localStorage.getItem("billingInfo"));
            APICaller3("order", "POST", {
                username: bill.username,
                email: bill.email,
                phone: bill.phone,
                adress: bill.adress,
                note: bill.note,
                TotalPrice: cart.cartTotalAmount,
                ProductQuantity: cart.cartTotalQuantity,
                Status: bill.Status,
                OrderDate: CurrentTime,
                paymentType: "online"
            }).then(res => {
                console.log(res);
                submitBillingInfo();
            });
        });
    }

    //////////////////////////////////// Tich Hop Paypal

    ////////////////////////////////////
    //thời gian
    const time = new Date().toLocaleDateString();
    const [CurrentTime, setCurrentTime] = useState(time);
    const updateTime = () => {
        let time = new Date().toLocaleDateString();
        setCurrentTime(time);
    }
    //thông tin user điền form   
    const [billingInfo, setBillingInfo] = useState({ username: '', email: '', phone: '', adress: "", note: "", Status: "Chờ Xác Nhận",paymentType:"" });
    localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
    const handleInput = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
        console.log(billingInfo);
        localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
    }
    setInterval(updateTime, 1000);
    const handleSubmit = async (e) => {
        localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
        console.log(billingInfo);
        e.preventDefault();
        if(paymentType=="cod"){
            APICaller3("order", "POST", {
                username: billingInfo.username,
                email: billingInfo.email,
                phone: billingInfo.phone,
                adress: billingInfo.adress,
                note: billingInfo.note,
                TotalPrice: cart.cartTotalAmount,
                ProductQuantity: cart.cartTotalQuantity,
                Status: billingInfo.Status,
                OrderDate: CurrentTime,
                paymentType: "cod"
            }).then(res => {
                console.log(res);
            });
            submitBillingInfo();
        }
    }
    ////////////////////////////////////

    //thông tin chọn phương thức thanh toán
    function showSubmit1() {
        document.getElementById("submit1").style.display = "block";
        document.getElementById("submit2").style.display = "none";
        setPaymentType("cod");
    }

    function showSubmit2() {
        document.getElementById("submit1").style.display = "none";
        document.getElementById("submit2").style.display = "block";
        setPaymentType("online");
    }

    function submitBillingInfo() {
        APICaller3("orderdetail", "POST", {
            Product: cart.cartItems
        }).then(res => {
            console.log(res);
            localStorage.removeItem("cartItems");
            localStorage.removeItem("billingInfo");
            localStorage.removeItem("paymentStatus");
            toast.success("Đặt hàng thành công", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "light",
            });
            setInterval(() => {
                window.location.href = "/";
            }, 5000);
        });
    }
    ////////////////////////////////////

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
        <div>
            <div className="start-shopping">
                <Link to="/gio-hang">
                    <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <div className="checkout">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
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
                                        type="text" className="form-control" placeholder="Họ tên" name="username" value={billingInfo.username} onChange={handleInput} required />
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
                                        type="email" className="form-control" placeholder="Email" name="email" value={billingInfo.email} onChange={handleInput} required />
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
                                        type="number" className="form-control" placeholder="Số điện thoại" name="phone" value={billingInfo.phone} onChange={handleInput} required />
                                </div>
                                <div className="form-group">
                                    <input style={{
                                        display: "block",
                                        maxWidth: "90%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" placeholder="Địa chỉ nhận hàng" name="adress" value={billingInfo.adress} onChange={handleInput} required />
                                </div>
                                <div className="form-group">
                                    <textarea style={{
                                        display: "block",
                                        maxWidth: "94%",
                                        height: "auto",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" placeholder="Ghi chú" name="note" value={billingInfo.note} onChange={handleInput} />
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className="order-detail">
                                <div className="section-title">
                                    <div style={{ textAlign: "center" }} className="checkout-title">ĐƠN HÀNG CỦA BẠN</div>
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
                                        {cart.cartItems?.map(cartItem => {
                                            return (
                                                <div className='checkout-col' key={cartItem.ProductID}>
                                                    <span className=' checkout-text'>{cartItem.ProductName} x {cartItem.cartQuantity}</span>
                                                    <span className=' checkout-text'>{cartItem.Price}  VND</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='checkout-col'>
                                        <span style={{ fontWeight: "bold" }} className='checkout-text'>Tổng tiền</span>
                                        <span className='checkout-text'>{cart.cartTotalAmount} VND</span>
                                    </div>
                                    <div>
                                        <div className="section-title">
                                            <div style={{ textAlign: "center" }} className="checkout-title">ĐƠN HÀNG CỦA BẠN</div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                            <Button type="button" onClick={() => showSubmit1()} style={{ marginLeft: "10px" }}>Thanh toán khi nhận hàng</Button>
                                            <Button type="button" onClick={() => showSubmit2()} style={{ marginLeft: "30px" }}>Thanh toán online</Button>
                                        </div>
                                    </div>


                                </div>
                                <div className="order-sum-title"></div>
                            </div>

                            <div style={{ textAlign: "center", marginTop: "50px", display: "none" }} id="submit1">
                                <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Đặt hàng</Button>
                            </div>

                            {/* Thanh Toan Online */}
                            <div style={{ width: '180px', height: '40px', marginLeft: "250px", marginTop: "50px", display: "none" }} id="submit2" >
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                                />
                            </div>
                            {/* Thanh Toan Online */}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}