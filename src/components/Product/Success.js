import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import { useEffect } from 'react';
export default function Success() {
    const [status, setStatus] = useState([]);
    useEffect(() => {
        setStatus(localStorage.getItem('paymentStatus'));
        console.log(status.status);
    }, [status]);
    return (
        <div>
            {status.status? (
                <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                    <h1>Cảm Ơn Bạn Đã Mua Hàng!</h1>
                </div>
                ) : (
                <div style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                    <h1>Đã có lỗi xảy ra. Vui lòng thử lại</h1>
                </div>
                )}
        </div>
    );
}