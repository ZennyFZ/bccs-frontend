import { Button, Row, Col, Container, Icon, Card } from "react-materialize";
import { Link } from "react-router-dom";
import React, { useState } from 'react';

export default function Service({ Services }) {
    console.log(Services);
    return (
        <div>
            <h3 class="AboutTitle">Các Dịch Vụ</h3>
            <div className="bottom-line2"></div>
            <br />

            <Container>

                <Row>
                    {Services.map((service) =>
                    (<Col s={12} m={6} l={4}  >
                        <div className='Service-info'>
                            <Card style={{ borderRadius: "20px", width: "300px", height: "400px" }}>
                                <img style={{ width: "250px", height: "150px" }} src={service.image} />
                                <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }} className='Service'>{service.name}</p>
                                <div>
                                    <p style={{ textAlign: "center" }}>{service.description}</p>
                                </div>
                                <div className='Service-item-price'>
                                    <div className='Price-money'>
                                        <p style={{ textAlign: "center" }}>{service.price} VND</p>
                                    </div>
                                </div>
                                <Link to={'/booking'}>
                                    <p style={{ textAlign: "center", marginTop: "10px" }}>
                                        <Button>Đặt ngay</Button></p>
                                </Link>
                            </Card>

                        </div>

                    </Col>))}
                </Row>
            </Container>
        </div >
    );

}
