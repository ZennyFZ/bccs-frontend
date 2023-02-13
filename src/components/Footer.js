import React from 'react';
import { Link } from "react-router-dom";
export default function Footer() {
    return(
        <div className="footer">
            <div className="footer-box">
                <Link to="/" style={{textDecoration: "none"}}>
                    <img src="assets/images/logo.png" alt="logo" width="50" height="50" />
                </Link>

                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                    <div style={{fontWeight: "bold"}}>Bird Care Consulting</div>
                </Link>
            </div>

            <div className="footer-box">
                <div style={{fontWeight: "bold"}}>Thời Gian Hoạt Động:</div>
                <div>Thứ 2 tới Thứ 6: 6h sáng-5h chiều</div>
                <div>Thứ 7 tới Chủ Nhật: Đóng Cửa</div>
            </div>

            <div className="footer-box">
                <div style={{fontWeight: "bold"}}>Các Dịch Vụ:</div>
                <Link to="/dich-vu/tri-benh-cho-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Trị Bệnh Cho Chim</div>
                </Link>
                <Link to="/dich-vu/lam-dep-cho-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Làm Đẹp Cho Chim</div>
                </Link>
                <Link to="/dich-vu/ngua-benh-cho-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Ngừa Bệnh Cho Chim</div>
                </Link>
                <Link to="/dich-vu/kham-suc-khoe-dinh-ki" style={{textDecoration: "none", color: "black"}}>
                    <div>Khám Sức Khỏe Định Kì</div>
                </Link>
                <Link to="/dich-vu/khach-san-cho-chim" style={{textDecoration: "none", color: "black"}}>
                    <div>Khách Sạn Cho Chim</div>
                </Link>
            </div>

            <div className="footer-box">
                <div><div style={{fontWeight: "bold"}}>Địa Chỉ:</div> 525 Nguyễn Trãi, Hồ Chí Minh</div>
                <div><div style={{fontWeight: "bold"}}>Số Điện Thoại:</div> 19001080</div>
            </div>

            <div className="footer-box">
                <Link to="/lien-he" style={{textDecoration: "none"}}>
                    <div style={{fontWeight: "bold"}}>Tìm Hiểu Thêm</div>
                </Link>
            </div>

        </div>
    )
}