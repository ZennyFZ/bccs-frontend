import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function OrderDetail() {
    const orderid = useParams();
    const [orderdetail, setOrderDetail] = useState([])
    const [productdetail, setProductDetail] = useState([])

    function getData() {
        axios.get(`${Config.API_URL}/Order/GetOrderDetailByOrderId?orderId=` + orderid.id)
            .then(response => response.data)
            .then((data) => {
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

    useEffect(()=>{
        getData();
    },[])

    useEffect(()=>{
        if (orderdetail){
            getProductDetail();
        }
    },[JSON.stringify(orderdetail)])

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
                        <h3 className="Quantity">Tạm Tính</h3>
                    </div>
                    <div className="cart-items3">
                        {productdetail.map((productdetail, index) => (
                            <div className="cart-item3" key={index}>
                                <div className="product-title">
                                    <img style={{width: "200px", height: "200px"}} src={productdetail.image} alt="" />
                                    <div className="product-info">
                                        <div>{productdetail.productName}</div>
                                    </div>
                                </div>
                                <div className="price">{(orderdetail[index].price)?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                                <div className="Quantity">{orderdetail[index].productQuantiy}</div>
                                <div className="total-price">{(orderdetail[index].price * orderdetail[index].productQuantiy)?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}