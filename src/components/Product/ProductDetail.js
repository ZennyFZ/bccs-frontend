import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Container,Row,Col,Card,Button } from 'react-materialize'
import { addToCart } from '../../context/CartSlice'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
export default function ProductDetail() {
    const Productid = useParams();
    const [productlist, setProductList] = useState([])
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    console.log(Productid);

    function getData() {
        axios.get(`${Config.API_URL}/Product/` + Productid.id)
            .then(response => response.data)
            .then((data) => {
              setProductList(data)
            });
        console.log(productlist);
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <div>
           <Container>
            <Card>
                <div className="Product-detail">
                    <div className="continue-shopping">
                        <Link to="/san-pham">
                            <KeyboardBackspaceIcon />
                        </Link>
                    </div>
                    <div className="Product-media">
                        <img style={{height:"240px", width:"240px"}} src={productlist.Image} />
                    </div>
                    <div className="Product-info-main">
                        <div className="Product-info-title">
                            <strong style={{fontWeight:"700",fontSize:"15px",lineHeight:"5px"}} className='ProductName'>{productlist.ProductName}</strong>
                        </div>
                        <div  className="Product-add-form">
                            <div className="Product-description">
                                <span className='label' style={{fontWeight: "bold"}}>Thông tin sản phẩm: </span>
                                <div className='Price'>{productlist.Description}</div>
                            </div>
                            <div  className="Price-list">
                                <div style={{marginTop: "10px"}}>
                                    <span className='label' style={{fontWeight: "bold"}}>Giá: </span>
                                    <span className='Price'>{productlist.Price} VND</span>
                                </div>
                            </div>
                            <div className="Product-option">
                                    <div>
                                        <Button onClick={() => { handleAddToCart(productlist) }}>Mua ngay</Button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
           </Container>
        </div>
    );
}