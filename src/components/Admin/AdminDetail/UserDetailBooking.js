import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../../utils/Config";
import axios from "axios";
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Button } from "react-materialize";
import callerApi from '../../../utils/APICaller';
export default function UserDetailBooking() {
    const bookingid = useParams();
    const [userbooking, setUserBooking] = useState([]);
    const [bookingdetail, setBookingDetail] = useState([]);
    const [serviceDetail, setServiceDetail] = useState([]);
    const [status, setStatus] = useState('');

    const handleChangeStatus = (event, bookingId) => {
        setStatus(event.target.value);
        callerApi("Booking/UpdateStaus", "PUT", {
            bookingId: bookingId,
            statusId: event.target.value
        }).then(res => {
            console.log(res);
            window.location.reload();
        });
    };

    function getBookingUserInfo() {
        axios.get(`${Config.API_URL}/Booking/GetBookingByBookingIdAdmin?id=` + bookingid.bookingId)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                setUserBooking(data)
                console.log(userbooking);
            });
    }

    function getBookingDetail() {
        axios.get(`${Config.API_URL}/Booking/GetBookingDetailByBookingId?bookingId=` + bookingid.bookingId)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                setBookingDetail(data)
            });
    }

    function getServiceDetail() {
        bookingdetail.map(bookingdetail => {
            axios.get(`${Config.API_URL}/Service/GetServiceById?id=` + bookingdetail.serviceId)
                .then(response => response.data)
                .then((data) => {
                    setServiceDetail(serviceDetail => [...serviceDetail, data])
                });
        })
    }

    useEffect(() => {
        getBookingUserInfo();
        getBookingDetail();
    }, [])
    useEffect(() => {
        if (bookingdetail) {
            getServiceDetail();
        }
    }, [JSON.stringify(bookingdetail)])

    return (
        <div>
            <div className="start-shopping">
                <Link to="/admin">
                    <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <div>
                <h4 className="UDetail-intro" >Thông tin đặt lịch</h4>
                <div style={{ marginLeft: "30px" }}>
                    <div className="form-group">
                        <label className="Register-title" htmlFor="user">
                            <text>Họ và Tên</text>
                        </label>
                        <input style={{
                            display: "block",
                            width: "30%",
                            height: "34px",
                            padding: "6px 12px",
                            fontSize: "16px",
                            color: "#797b7c",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc"

                        }}
                            type="text" className="form-control" value={userbooking.fullName} disabled />
                    </div>

                    <div className="form-group">
                        <label className="Register-title" htmlFor="phone">
                            <text>Số điện thoại</text>
                        </label>
                        <input style={{
                            display: "block",
                            width: "30%",
                            height: "34px",
                            padding: "6px 12px",
                            fontSize: "16px",
                            color: "#797b7c",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc"
                        }}
                            className="form-control" value={userbooking.phone} disabled />

                    </div>
                    <div className="form-group">
                        <label className="Register-title" htmlFor="address">
                            <text>Địa chỉ</text>
                        </label>
                        <input style={{
                            display: "block",
                            maxWidth: "30%",
                            height: "34px",
                            padding: "6px 12px",
                            fontSize: "16px",
                            color: "#797b7c",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc"
                        }}
                            type="text" className="form-control" value={userbooking.address} disabled />
                    </div>
                    <div className="form-group">
                        <label className="Register-title" htmlFor="note">
                            <text>Ghi chú</text>
                        </label>
                        <input style={{
                            display: "block",
                            maxWidth: "30%",
                            height: "34px",
                            padding: "6px 12px",
                            fontSize: "16px",
                            color: "#797b7c",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc"
                        }}
                            type="text" className="form-control" value={userbooking.note} disabled />
                    </div>
                    <div className="form-group">
                        <label className="Register-title" htmlFor="type">
                            <text>Trạng thái lịch hẹn</text>
                        </label>
                        <input style={{
                            display: "block",
                            maxWidth: "30%",
                            height: "34px",
                            padding: "6px 12px",
                            fontSize: "16px",
                            color: "#797b7c",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc"
                        }}
                            type="text" className="form-control" value={userbooking.statusId == 1 ? "Chờ Xác Nhận" :
                                "Đã Xác Nhận"
                            } disabled />
                    </div>
                </div>
            </div>
            <br />
            <h4 className="UDetail-intro" >Dịch vụ đã chọn</h4>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Giá</TableCell>
                        <TableCell>Dịch vụ</TableCell>
                        <TableCell>Giá</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {serviceDetail.map((serviceDetail, index) => (
                        <TableRow key={index}>
                            <TableCell><img style={{ width: "200px", height: "200px" }} src={serviceDetail.image} alt="" /></TableCell>
                            <TableCell>{serviceDetail.serviceName}</TableCell>
                             <TableCell>{(bookingdetail[index].price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div style={{ textAlign: "center", width: "200px", position: "relative", left: "40%", marginTop: "30px", marginBottom: "30px" }}>
                <div className="button-block">
                    {userbooking.statusId == 1
                        ? <Button id="submit1" onClick={(e) => handleChangeStatus(e, userbooking.bookingId)} value={2} style={{ display: "block" }}>Xác nhận</Button>
                        : <></>
                    }
                    {userbooking.statusId == 1
                        ? <Button onClick={(e) => handleChangeStatus(e, userbooking.bookingId)} value={4} style={{ marigin: "10px", backgroundColor: "red" }}>Hủy</Button>
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}