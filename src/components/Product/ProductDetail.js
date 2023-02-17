import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../utils/Config";
import axios from "axios";
import { Container,Row,Col,Card,Button } from 'react-materialize'
import { height } from "@mui/system";
export default function ProductDetail() {
    const Productid = useParams();
    const [productlist, setProductList] = useState([])
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
                    <div className="Product-media">
                        <img style={{height:"240px", width:"240px"}} src={productlist.Image} />
                    </div>
                    <div className="Product-info-main">
                        <div className="Product-info-title">
                            <strong style={{fontWeight:"700",fontSize:"15px",lineHeight:"5px"}} className='ProductName'>{productlist.ProductName}</strong>
                        </div>
                        <div  className="Product-add-form">
                            <div  className="Price-list">
                                <div className="Product-info-money">
                                    <span className='label'>Price</span>
                                    <span className='Price'>{productlist.Price} VNĐ</span>
                                </div>
                            </div>
                            <div className="Product-option">
                                    <div style={{textAlign:"center"}}>
                                        <Button style={{borderTopLeftRadius:"15px",borderBottomLeftRadius:"15px"}}>-</Button>
                                        <Button style={{backgroundColor:"white",color:"black",width:"100px"}} >1</Button>
                                        <Button style={{borderTopRightRadius:"15px",borderBottomRightRadius:"15px"}}>+</Button>
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