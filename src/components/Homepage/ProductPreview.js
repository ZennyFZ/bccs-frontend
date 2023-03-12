import { Link } from 'react-router-dom'
import { Container,Row,Col,Card,Button } from 'react-materialize'
import { addToCart } from '../../context/CartSlice'
import { useDispatch } from 'react-redux'
export default function ProductPreview({Products}) {
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div style={{font: "marope"}}>
            <br/>
            <div className="bottom-line2" style={{marginTop: "25px"}}></div>
            <div className="introHeading">Các Sản Phẩm cho Chim</div>
            <Container>
                <br/>
                <Row >
                    {Products.slice(0,6).map((product) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card style={{ borderRadius: "12px" }}>
                            <div className='Product-info'>
                                <img src={product.image} />

                                <div className='Product-item-detail'>
                                    <Link style={{ textAlign: "center", fontWeight: "bold", color: "black" }} to={`/san-pham/chi-tiet-san-pham/${product.productId}`}>
                                        <p className='ProductName'>{product.productName}</p>
                                    </Link>
                                    <div className='Product-item-price'>
                                        <div className='Price-money'>
                                            <span className='Price'>{(product.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "center", marginTop: "10px" }}>
                                        <Button onClick={() => { handleAddToCart(product) }} className='btn btn-primary'>Thêm vào giỏ hàng</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
            <Link to={"/san-pham"} style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <Button>Xem Thêm</Button>
            </Link>
        </div>
    )
}