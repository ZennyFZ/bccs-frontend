import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Container,Row,Col,Card,Button } from 'react-materialize'
import { Link } from "react-router-dom"
export default function OrderDetail() {
    const orderid = useParams();
    const [orderdetail, setOrderDetail] = useState([])
    console.log(orderdetail);

    function getData() {
        axios.get(`${Config.API_URL3}/orderdetail/` + orderid.id)
            .then(response => response.data)
            .then((data) => {
                setOrderDetail(data)
            });
        console.log(orderdetail);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <div>
            <div className="cart-container2">
                <div>
                    <div className="titles2">
                        <h3 className="product-title">Tên Sản Phẩm</h3>
                        <h3 className="price">Số Lượng</h3>
                        <h3 className="Quantity">Tổng Giá</h3>
                    </div>
                    <div className="cart-items">
                        <div className="cart-item2" key={orderdetail.id}>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}