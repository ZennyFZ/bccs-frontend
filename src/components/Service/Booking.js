import { Grid } from "@mui/material";
import { Button } from "react-materialize";
import React from "react";
import { getTotals } from "../../context/CartSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from "react";
import APICaller5 from "../../utils/APICaller5";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import {Link} from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast } from "react-toastify";
import axios from "axios";
export default function Booking() {
        //thông tin BookingDate từ local storage
        const BookingDate = JSON.parse(localStorage.getItem("BookingDate"));
        const [ServiceInformation, setServiceInformation] = useState([]);
        const [paymentType, setPaymentType] = useState();
        const dispatchh = useDispatch();
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

        function getServiceInformation() {
            axios.get("https://63eb3889fb6b6b7cf7d9cb2f.mockapi.io/Service/" + BookingDate[0].id)
                .then(response => response.data)
                .then((data) => {
                    setServiceInformation(data)
                    localStorage.setItem("ServiceInformation", JSON.stringify(data));
                });
        }

        useEffect(() => {
            getServiceInformation();
        }, [ServiceInformation])

    
        const onCreateOrder = (data, actions) => {
            var serviceInfo = JSON.parse(localStorage.getItem("ServiceInformation"));
            var VNDToUSD = ( serviceInfo.price / 23000).toFixed(2);
            console.log(VNDToUSD);
            console.log(scheduleInfo)
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
                var bill = JSON.parse(localStorage.getItem("scheduleInfo"));
                APICaller5("Booking", "POST", {
                    bookingdate: CurrentTime,
                    date: BookingDate[0].day,
                    price: ServiceInformation.price,
                    status: "Chờ Xác Nhận",
                    note: bill.note,
                    phone: bill.phone,
                    address: bill.adress,
                    name: bill.username, 
                    email: bill.email,
                    paymentType: "online"
                }).then(res => {
                    console.log(res);
                    submitScheduleInfo();
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
        const [scheduleInfo, setScheduleInfo] = useState({ username: '', email: '', phone: '', adress: "", note: "", Status: "Chờ Xác Nhận",paymentType:"" });
        localStorage.setItem("scheduleInfo", JSON.stringify(scheduleInfo));
        const handleInput = (e) => {
            const { name, value } = e.target;
            setScheduleInfo({ ...scheduleInfo, [name]: value });
            console.log(scheduleInfo);
            localStorage.setItem("scheduleInfo", JSON.stringify(scheduleInfo));
        }
        setInterval(updateTime, 1000);
        const handleSubmit = async (e) => {
            localStorage.setItem("scheduleInfo", JSON.stringify(scheduleInfo));
            console.log(scheduleInfo);
            e.preventDefault();
            if(paymentType=="cod"){
                APICaller5("Booking", "POST", {
                    bookingdate: CurrentTime,
                    date: BookingDate[0].day,
                    price: ServiceInformation.price,
                    status: "Chờ Xác Nhận",
                    note: scheduleInfo.note,
                    phone: scheduleInfo.phone,
                    address: scheduleInfo.adress,
                    name: scheduleInfo.username, 
                    email: scheduleInfo.email,
                    paymentType: "cod"
                }).then(res => {
                    console.log(res);
                });
                submitScheduleInfo();
            }else if(paymentType=="online"){
                showPaypalButton();
            }
        }
        ////////////////////////////////////
    
        //thông tin chọn phương thức thanh toán
        function showSubmit1() {
            document.getElementById("submit1").style.display = "block";
            document.getElementById("submit2").style.display = "none";
            document.getElementById("submit2_2").style.display = "none";
            setPaymentType("cod");
        }
    
        function showSubmit2() {
            if(document.getElementById("submit2").style.display == "none" && document.getElementById("submit2_2").style.display == "block"){
            document.getElementById("submit1").style.display = "none";
            document.getElementById("submit2").style.display = "block";
            document.getElementById("submit2_2").style.display = "none";
            }else{
                document.getElementById("submit1").style.display = "none";
                document.getElementById("submit2").style.display = "block";
            }
            setPaymentType("online");
        }
    
        function showPaypalButton() {
            document.getElementById("submit2").style.display = "none";
            document.getElementById("submit2_2").style.display = "block";
        }
    
        function submitScheduleInfo() {
            var serviceInfo = JSON.parse(localStorage.getItem("ServiceInformation"));
            APICaller5("BookingDetail", "POST", {
                serviceid: BookingDate[0].id,
                price: serviceInfo.price
            }).then(res => {
                console.log(res);
                localStorage.removeItem("scheduleInfo");
                localStorage.removeItem("paymentStatus");
                localStorage.removeItem("BookingDate");
                localStorage.removeItem("ServiceInformation");
                toast.success("Đặt hẹn thành công", {
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
                    <Link to={`/dich-vu`}>
                        <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div>
                    </Link>
                </div>
                <div className="checkout">
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} >
                            <Grid xs={6}>
                                <div className="billing-detail">
                                    <div className="section-title">
                                        <div className="checkout-title">THÔNG TIN LỊCH HẸN</div>
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
                                            type="text" className="form-control" placeholder="Họ tên" name="username" value={scheduleInfo.username} onChange={handleInput} required />
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
                                            type="email" className="form-control" placeholder="Email" name="email" value={scheduleInfo.email} onChange={handleInput} required />
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
                                            type="number" className="form-control" placeholder="Số điện thoại" name="phone" value={scheduleInfo.phone} onChange={handleInput} required />
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
                                            type="text" className="form-control" placeholder="Địa chỉ" name="adress" value={scheduleInfo.adress} onChange={handleInput} required />
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
                                            type="text" className="form-control" placeholder="Ghi chú" name="note" value={scheduleInfo.note} onChange={handleInput} />
                                    </div>
                                </div>
                            </Grid>
                            <Grid xs={6}>
                                <div className="order-detail">
                                    <div className="section-title">
                                        <div style={{ textAlign: "center" }} className="checkout-title">LỊCH HẸN CỦA BẠN</div>
                                    </div>
                                </div>
                                <div className="order-summary">
                                    <div className='Product-item-price'>
                                        <div className='Price-money'>
                                            <span className='checkout-text'>Dịch Vụ</span>
                                            <span className="space"></span>
                                            <span className='checkout-text'>Ngày Hẹn</span>
                                            <span className="space"></span>
                                            <span className='checkout-text'>Giá Tiền</span>
                                        </div>
                                        <div>
                                            <div className='checkout-col' key={ServiceInformation.id}>
                                                <span className=' checkout-text'>{ServiceInformation.name}</span>
                                                <span className=' checkout-text'>{BookingDate[0].day}</span>
                                                <span className=' checkout-text'>{ServiceInformation.price} VND</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="section-title">
                                                <div style={{ textAlign: "center" }} className="checkout-title">PHƯƠNG THỨC THANH TOÁN</div>
                                            </div>
                                            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                                <Button type="button" onClick={() => showSubmit1()} style={{ marginLeft: "10px" }}>Thanh toán tại nhà</Button>
                                                <Button type="button" onClick={() => showSubmit2()} style={{ marginLeft: "30px" }}>Thanh toán online</Button>
                                            </div>
                                        </div>
    
    
                                    </div>
                                    <div className="order-sum-title"></div>
                                </div>
    
                                <div style={{ textAlign: "center", marginTop: "50px", display: "none" }} id="submit1">
                                    <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Đặt Hẹn</Button>
                                </div>
    
                                {/* Thanh Toan Online */}
                                <div style={{ textAlign: "center", marginTop: "50px", display: "none" }} id="submit2">
                                    <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Đặt Hẹn</Button>
                                </div>
                                <div style={{ width: '180px', height: '40px', marginLeft: "250px", marginTop: "50px", display: "none" }} id="submit2_2" >
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
