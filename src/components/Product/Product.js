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
                         {/* <img className='Image' src={product.Image} />*/}
                            <h3 className='ProductName'>{product.ProductName}</h3>
                            <p className='Price'>price : {product.Price}</p>
                            <p className='Quantity'>qty :{product.Quantity}</p>
                            <p className='Description'>{product.Description}</p>
                            <Link to={`detail/${product.id}`}>
                                <p className='button1'><Button>detail</Button></p>
                            </Link>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
        </div>

    )
}