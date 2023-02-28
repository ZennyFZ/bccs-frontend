import { Grid} from "@mui/material";
import { Button} from "react-materialize";
import React from "react";
import {getTotals} from "../../context/CartSlice";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import { useState } from "react";
import APICaller3 from "../../utils/APICaller3";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useEffect } from "react";
export default function Checkout() {
//thông tin product từ cart    
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const handleGetTotals = () => {
        dispatch(getTotals())
    }
    useEffect(() => {
        handleGetTotals();
    }, [cart])
////////////////////////////////////

//thông tin user điền form   
    const [formValue, setFormValue]= useState({username:'', email:'',phone:'',adress:"",note:"",Status:"đang vận chuyển"});
    const handleInput=(e)=>{
        const {name, value}= e.target;
        setFormValue({...formValue, [name]:value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        APICaller3("order","POST", {
            username: formValue.username,
            email: formValue.email,
            phone: formValue.phone,
            adress: formValue.adress,
            note: formValue.note,
            TotalPrice: cart.cartTotalAmount,
            ProductQuantity: cart.ProductQuantity,
            Status: formValue.Status
    }).then(res => {
        console.log(res);
    });
       
     }    
////////////////////////////////////

//thông tin chọn phương thức thanh toán
    /*function showSubmit() {
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
    }*/
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

                                            {/*<span style={{fontSize: "20px", fontWeight: "bold"}}>Phương thức thanh toán:</span>
                                            <div style={{display: "flex", justifyContent: "center", marginTop: "10px"}}>
                                            <Button type="button" onClick={() => showSubmit()} style={{marginLeft: "10px"}}>Thanh toán khi nhận hàng</Button>
                                            <Button type="button" onClick={() => showSubmit2()} style={{marginLeft: "30px"}}>Thanh toán online</Button>
                                        </div>*/}
                                        </div>
                                    </div>
                        <div className="order-sum-title"></div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "50px"}}>
                        <Button type="submit" style={{backgroundColor:"red", color:"white" }}  className='btn btn-primary'>Xác nhận</Button>
                    </div>
                </Grid>
            </Grid>
            </form>
        </div>
    )
}