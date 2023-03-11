import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-materialize'
export default function ServicePreview({ Services }) {
    return (
        <div style={{ font: "marope" }}>
            <br />
            <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
            <div className="introHeading">Các Dịch Vụ chăm Sóc Chim</div>
            <Container>
                <br />
                <Row >
                    {Services.slice(0, 5).map((service) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card>
                            <img style={{ width: "300px", height: "200px" }} src={service.image} />
                            <Link to={`chi-tiet-dich-vu/${service.id}`}>
                                <h3 className='ProductTitle'>{service.name}</h3>
                            </Link>
                            <p style={{ textAlign: "center" }}>{service.price} VND</p>
                            <Link to={`/dich-vu/${service.id}`}>
                                <p style={{ textAlign: "center", marginTop: "10px" }}><Button>Đặt Ngay</Button></p>
                            </Link>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
            <Link to={"/dich-vu"} style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <Button>Xem Thêm</Button>
            </Link>
        </div>
    )
}