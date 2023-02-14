import { Link } from 'react-router-dom'
import { Container,Row,Col,Card,Button } from 'react-materialize'
export default function ProductPreview({Products}) {
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
                        <Card>
                         <img style={{width: "300px", height: "200px"}} src={product.Image} />
                         <Link to={`chi-tiet-san-phan/${product.ProductID}`}>
                         <h3 className='ProductTitle'>{product.ProductName}</h3>
                         </Link>
                            <p style={{textAlign: "center"}}>{product.Price} VND</p>
                            <Link to={`/gio-hang`}>
                                <p style={{textAlign: "center", marginTop: "10px"}}><Button>Mua ngay</Button></p>
                            </Link>
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