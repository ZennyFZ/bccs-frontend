import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../../utils/Config";
import axios from "axios";
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { FormControl, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Button } from "react-materialize";
import callerApi from '../../../utils/APICaller';
export default function OrderDetail() {
    const orderid = useParams();
    const [userorder, setUserOrder] = useState([]);
    const [orderdetail, setOrderDetail] = useState([]);
    const [productdetail, setProductDetail] = useState([]);
    const [status, setStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const handleChangeStatus = (event, orderId) => {
        setStatus(event.target.value);
        callerApi("Order/UpdateStaus", "PUT", {
            orderId: orderId,
            statusId: event.target.value
        }).then(res => {
            console.log(res);
            window.location.reload();
        });
    };

    const handleChangePaymentMethod = (event, orderId) => {
        setPaymentMethod(event.target.value);
        callerApi("Order/UpdatePayMentMethodByOrderId", "PUT", {
            orderId: orderId,
            paymentMethod: event.target.value
        }).then(res => {
            console.log(res);
            callerApi("Order/UpdateStaus", "PUT", {
                orderId: orderId,
                statusId: 3
            }).then(res => {
                console.log(res);
                window.location.reload();
            });
        });
    }

    function getOrderUserInfo() {
        axios.get(`${Config.API_URL}/Order/GetOrderByOrderIdAdmin?id=` + orderid.orderId)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                setUserOrder(data)
                console.log(userorder);
            });
    }




    function getOrderDetail() {
        axios.get(`${Config.API_URL}/Order/GetOrderDetailByOrderId?orderId=` + orderid.orderId)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                setOrderDetail(data)
            });
    }

    function getProductDetail() {
        orderdetail.map(orderdetail => {
            axios.get(`${Config.API_URL}/Product/GetProductById?id=` + orderdetail.productId)
                .then(response => response.data)
                .then((data) => {
                    setProductDetail(productdetail => [...productdetail, data])
                });
        })
    }

    function ShowSubmit1(event, orderId){
            handleChangeStatus(event,orderId);
    }

    function ShowSubmit2(event, orderId){
        if(userorder.paymentMethod =="online"){
            handleChangeStatus(event,orderId);
        }
        else{
            document.getElementById("showOfline").style.display = "block";
        }
}
    useEffect(() => {
        getOrderUserInfo();
        getOrderDetail();
    }, [])
    useEffect(() => {
        if (orderdetail) {
            getProductDetail();
        }
    }, [JSON.stringify(orderdetail)])

    return (
        <div>
            <div className="start-shopping">
                <Link to="/admin">
                    <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <div className="user-form">
                <div className="introHeading">Chi tiết đơn hàng</div>
                <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                <br />
                <div>

                    <h4 className="UDetail-intro" >Thông tin giao hàng</h4>
                    <br/>
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
                                type="text" className="form-control" value={userorder.fullName} disabled />

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
                                className="form-control" value={userorder.phone} disabled />

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
                                type="text" className="form-control" value={userorder.address} disabled />
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
                                type="text" className="form-control" value={userorder.note} disabled />
                        </div>
                        <div className="form-group">
                            <label className="Register-title" htmlFor="type">
                                <text>Phương thức thanh toán</text>
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
                                type="text" className="form-control" value={userorder.paymentMethod} disabled />
                        </div>
                        <div id="showOfline" style={{ display: "none" }}>
                            <FormControl>
                                <label>Cập nhật phương thức thanh toán</label>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    onChange={(e) => handleChangePaymentMethod(e, userorder.orderId)}
                                >
                                    <MenuItem value={"COD - Banking"}>COD - Banking</MenuItem>
                                    <MenuItem value={"COD - Momo"}>COD - Momo</MenuItem>
                                    <MenuItem value={"COD - Visa/Mastercard"}>COD - Visa/Mastercard</MenuItem>
                                    <MenuItem value={"COD - Tiền Mặt"}>COD - Tiền Mặt</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="form-group">
                            <label className="Register-title" htmlFor="type">
                                <text>Trạng thái đơn hàng</text>
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
                                type="text" className="form-control" value={userorder.statusId == 1 ? "Chờ Xác Nhận" :
                                    userorder.statusId == 2 ? "Đã Xác Nhận" :
                                        userorder.statusId == 3 ? "Hoàn Thành" :
                                            "Đã Hủy"
                                } disabled />
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <h4 className="UDetail-intro" >Các sản phẩm trong đơn hàng</h4>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Hình ảnh</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Số lượng</TableCell>
                        <TableCell>Tạm tính</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {productdetail.map((productdetail, index) => (
                        <TableRow key={index}>
                            <TableCell><img style={{ width: "200px", height: "200px" }} src={productdetail.image} alt="" /></TableCell>
                            <TableCell>{productdetail.productName}</TableCell>
                            <TableCell>{(orderdetail[index].price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                            <TableCell>{orderdetail[index].productQuantiy}</TableCell>
                            <TableCell>{(orderdetail[index].price * orderdetail[index].productQuantiy)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <br/>
            <div style={{textAlign:"center", width:"200px",position:"relative",left:"40%",marginTop:"30px",marginBottom:"30px"}}>
            <div className="button-block">
            {userorder.statusId == 1 
            ? <Button id="submit1" onClick={(e) => ShowSubmit1(e, userorder.orderId)} value={2} style={{display:"block"}}>Xác nhận</Button> 
            : userorder.statusId == 2
            ? <Button id="submit2" onClick={(e) => ShowSubmit2(e, userorder.orderId)} value={3} style={{display:"block"}}>Hoàn thành</Button>
            : userorder.statusId == 3
            ?<></>
            :<div></div>    
            }
            {userorder.statusId ==1 || userorder.statusId == 2 
            ? <Button onClick={(e) => handleChangeStatus(e, userorder.orderId)} value={4} style={{marigin:"10px", backgroundColor:"red"}}>Hủy</Button>
            :<div></div> 
        }
            
            </div>
            </div>          
        </div>
    )
}