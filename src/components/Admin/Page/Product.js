import React from 'react';
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button} from 'react-materialize'
import Spinner from '../../Spinner/spinner';
import { useEffect, useState } from 'react';
import APICaller from '../../../utils/APICaller';
export default function Product() {
    const [Product, setProductList] = useState([])
    async function getData() {
        await APICaller("Product", "GET", null).then(res => {
            setProductList(res.data)
        });
        console.log(Product);
    }
    useEffect(() => {
        getData();
    }, [])
    const [loading, setloading] = useState(false);
    useEffect(() => {
        setTimeout(setloading, 800, true);
    }, [Product]) 
    return (
        <div>
            <Container>
                <br />
                <h3 class="AboutTitle">Các Sản Phẩm</h3>
                <div className="bottom-line2"></div>
                {!loading && <Spinner>LOADING . . . .</Spinner>}
                <Row >
                    {Product.map((product) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card style={{ borderRadius: "12px" }}>
                            <div className='Product-info'>
                                <img src={product.Image} />

                                <div className='Product-item-detail'>
                                    <Link style={{ textAlign: "center", fontWeight: "bold", color: "black" }} to={`/san-pham/chi-tiet-san-pham/${product.ProductID}`}>
                                        <p className='ProductName'>{product.ProductName}</p>
                                    </Link>
                                    <div className='Product-item-price'>
                                        <div className='Price-money'>
                                            <span className='label'>Giá</span>
                                            <span className='Price'>{product.Price} VNĐ</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                                        <Button  className='btn btn-primary'>Edit</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>))}
                </Row>
            </Container>

        </div>

    )
}