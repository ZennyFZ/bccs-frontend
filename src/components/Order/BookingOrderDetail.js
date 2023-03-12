import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function BookingOrderDetail() {
    const bookingid = useParams();
    const [bookingdetail, setBookingDetail] = useState([])
    const [servicedetail, setServiceDetail] = useState([])

    function getBookingDetail() {
        axios.get(`${Config.API_URL}/Booking/GetBookingDetailByBookingId?bookingId=${bookingid.id}`)
            .then(res => {
                setBookingDetail(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    function getServiceDetail() {
        axios.get(`${Config.API_URL}/Service/GetServiceByID?id=${bookingdetail[0].serviceId}`)
            .then(res => {
                setServiceDetail(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getBookingDetail();
    }, [])

    useEffect(() => {
        if(bookingdetail && bookingdetail[0]?.serviceId){
            getServiceDetail();
        }
    }, [bookingdetail])


    return (
        <div>
            <div className="start-shopping">
                <Link to="/lich-hen">
                    <div style={{display: "flex"}}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <div className="cart-container4">
                <div>
                    <div className="titles4">
                        <h3 className="product-title">Dịch Vụ</h3>
                        <h3>Giá</h3>
                    </div>
                    <div className="cart-items4">
                        <div className="cart-item4" key={bookingdetail.serviceId}>
                            <div className="cart-product4">
                                <img src={servicedetail.image} alt={servicedetail.serviceName} />
                                <div>
                                    <h3>{servicedetail.serviceName}</h3>
                                </div>
                            </div>
                            <div className="cart-product-price">{(servicedetail.price)?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}