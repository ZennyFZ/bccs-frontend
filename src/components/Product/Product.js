import { Link } from 'react-router-dom'
import { Container,Row,Col,Card,Button } from 'react-materialize'
export default function Product({ Products }) {
    console.log(Products);
    return (
        <div>
            <Container>
                <br/>
                <Row >
                    {Products.map((product) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card>
                            <div className='Product-info'>
                            <img src={product.Image} />
                            
                            <div className='Product-item-detail'>
                            <strong className='ProductName'>{product.ProductName}</strong>
                            <div className='Product-item-price'>
                                <div className='Price-money'>
                                    <span className='label'>Price</span>
                                    <span className='Price'>{product.Price} VNĐ</span>
                                </div>
                            </div>
                            <p className='placeholder'></p>
                            <Link style={{textAlign:"center"}} to={`/san-pham/chi-tiet-san-pham/${product.ProductID}`}>
                                <Button style={{borderRadius:"50px"}}>Thêm vào vỏ hàng</Button>
                            </Link>
                            </div>
                            </div>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
        </div>

    )
}