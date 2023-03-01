import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Button } from 'react-materialize'
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function OrderDetail() {
    const orderid = useParams();
    const [orderdetail, setOrderDetail] = useState([])
    console.log(orderdetail);

    async function getData() {
        await axios.get(`${Config.API_URL3}/orderdetail/` + orderid.id)
            .then(response => response.data)
            .then((data) => {
                setOrderDetail(data)
            });
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <div>
            <div className="start-shopping">
                <Link to="/don-hang">
                    <div style={{display: "flex"}}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <div className="cart-container3">
                <div>
                    <div className="titles3">
                        <h3 className="product-title">Tên Sản Phẩm</h3>
                        <h3>Giá</h3>
                        <h3 className="price">Số Lượng</h3>
                        <h3 className="Quantity">Tổng Giá</h3>
                    </div>
                    <div className="cart-items3">
                        {orderdetail.Product?.map(orderdetail => {
                            return (
                                <div className="cart-item3" key={orderdetail.ProductID}>
                                    <div className="cart-product3">
                                        <img src={orderdetail.Image} alt={orderdetail.ProductName} />
                                        <div>
                                            <h3>{orderdetail.ProductName}</h3>
                                        </div>
                                    </div>
                                    <div className="cart-product-price">{orderdetail.Price} VND</div>
                                    <div className="cart-product-quantity">
                                        <div className="count">{orderdetail.cartQuantity}</div>
                                    </div>
                                    <div className="cart-product-total-price">
                                        {orderdetail.Price * orderdetail.cartQuantity} VND
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}