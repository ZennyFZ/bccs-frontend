import { Link } from 'react-router-dom'
import { Container,Row,Col,Card,Button } from 'react-materialize'
import { addToCart } from '../../context/CartSlice'
import { useDispatch } from 'react-redux'
export default function Product({ Products }) {
    console.log(Products);
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div>
            <Container>
                <br />
                <Row >
                    {Products.map((product) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card>
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
                                    <div style={{textAlign: "center", marginTop: "10px"}}>
                                        <Button onClick={() => { handleAddToCart(product) }} className='btn btn-primary'>Thêm vào giỏ hàng</Button>
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