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
                    (<Col s={12} m={6} l={4}  key= {product.ProductID}>
                        <Card>
                         <img style={{width: "300px", height: "200px"}} src={product.Image} />
                         <Link to={`/san-pham/chi-tiet-san-pham/${product.ProductID}`}>
                         <h3 className='ProductTitle'>{product.ProductName}</h3>
                         </Link>
                            <p style={{textAlign: "center"}}>{product.Price} VND</p>
                            <p style={{textAlign: "center", marginTop: "10px"}}><Button onClick={ () => {handleAddToCart(product)}}>Mua ngay</Button></p>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
            <Link to={"/san-pham"}>
                <p style={{textAlign: "center", marginTop: "10px", color: "black", fontSize: "15px"}}>Xem Thêm...</p>
            </Link>
        </div>
    )
}