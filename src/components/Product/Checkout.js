import { Grid} from "@mui/material";
import { Button} from "react-materialize";
import React from "react";
import {getTotals} from "../../context/CartSlice";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useState } from "react";
import APICaller3 from "../../utils/APICaller3";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import  { useNavigate } from "react-router-dom";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
export default function Checkout() {
//thông tin product từ cart    
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [note, setNote] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [paymentType, setPaymentType] = useState();
    const [order, setOrder] = React.useState('');
    const [billingInfo, setBillingInfo] = React.useState('');
    const dispatchh = useDispatch();
    const handleGetTotals = () => {
        dispatchh(getTotals())
    }
    useEffect(() => {
        handleGetTotals();
    }, [cart])
//////////////////////////////////// Tich Hop Paypal

    const [{ options, isPending  }, dispatch] = usePayPalScriptReducer();
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
        var VNDToUSD = (cart.cartTotalAmount/23000).toFixed(2);
        console.log(VNDToUSD);
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
        });
    }

//////////////////////////////////// Tich Hop Paypal

////////////////////////////////////
//thời gian
    const time = new Date().toLocaleDateString();
    const [CurrentTime, setCurrentTime] = useState(time);
    const updateTime =() =>{
        let time = new Date().toLocaleDateString();
        setCurrentTime(time);
    }
//thông tin user điền form   
    const [formValue, setFormValue]= useState({username:'', email:'',phone:'',adress:"",note:"",Status:"đang vận chuyển"});
    const handleInput=(e)=>{
        const {name, value}= e.target;
        setFormValue({...formValue, [name]:value});
    }
    setInterval(updateTime, 1000);
    const handleSubmit = async (e) => {
        setOrder([cart]);
        setBillingInfo([{ name, email, phone, note, address, paymentType }])
        localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
        localStorage.setItem("orderInfo", JSON.stringify(order));;
        e.preventDefault();
        APICaller3("order","POST", {
            username: formValue.username,
            email: formValue.email,
            phone: formValue.phone,
            adress: formValue.adress,
            note: formValue.note,
            TotalPrice: cart.cartTotalAmount,
            ProductQuantity: cart.cartQuantity,
            Status: formValue.Status,
            OrderDate: CurrentTime
    }).then(res => {
        console.log(res);
    });
       submitBillingInfo();
     }    
////////////////////////////////////

//thông tin chọn phương thức thanh toán
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
        <div className="checkout">
            <form onSubmit={ handleSubmit}>
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
                                type="text" className="form-control" placeholder="Họ tên" name="username" value={formValue.username} onChange={ handleInput} required />
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
                                type="email" className="form-control" placeholder="Email" name="email" value={formValue.email} onChange={ handleInput} required />
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
                                type="number" className="form-control" placeholder="Số điện thoại" name="phone" value={formValue.phone} onChange={ handleInput} required />
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
                                type="text" className="form-control" placeholder="Địa chỉ nhận hàng" name="adress" value={formValue.adress} onChange={ handleInput} required />
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
                                type="text" className="form-control" placeholder="Ghi chú" name="note" value={formValue.note} onChange={ handleInput} required />
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
                                                    <span className=' checkout-text' value={formValue.TotalPrice} onChange={ handleInput}>{cartItem.Price}  VND</span>
                                                </div>
                                              )  
                                            })}
                                        </div>
                                        <div className='checkout-col'>
                                            <span style={{fontWeight:"bold"}} className='checkout-text'>Tổng tiền</span>
                                            <span className='checkout-text'>{cart.cartTotalAmount} VND</span>

                                            <div style={{fontSize: "20px", fontWeight: "bold"}}>Phương thức thanh toán:</div>
                                            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                                <Button type="button" onClick={() => showSubmit()} style={{marginLeft: "10px"}}>Thanh toán khi nhận hàng</Button>
                                                <Button type="button" onClick={() => showSubmit2()} style={{marginLeft: "30px"}}>Thanh toán online</Button>
                                            </div>
                                        </div>

                                        {/* Thanh Toan Online */}
                                         <div style={{width: '180px', height: '40px'}}>
                                        {
                                        isPending ? <p>LOADING...</p> : (
                                            <>
                                                <PayPalButtons
                                                    style={{ layout: "vertical" }}
                                                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                                                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                                                />
                                            </>
                                        )
                                        }
                                        </div> 
                                        {/* Thanh Toan Online */}
                                    </div>
                        <div className="order-sum-title"></div>
                    </div>
                    <div style={{display: "none", textAlign: "center", marginTop: "50px"}} id="submit">
                        <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Xác nhận</Button>
                    </div>
                </Grid>
            </Grid>
            </form>
        </div>
    )
}