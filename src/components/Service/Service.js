import { Button, Row, Col, Container, Icon, Card, CardTitle, Collapsible, CollapsibleItem, Checkbox, } from "react-materialize";
import { Link } from "react-router-dom";
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'

export default function Service({ Services }) {
    console.log(Services)
    const [selectesDate, setSelectedDate] = useState(null);
    return (
        <div>
            <h3 class="AboutTitle">Các Dịch Vụ</h3>
            <div className="bottom-line2"></div>

            <Container>
                <Row>
                    <Col
                        m={12}
                        s={12}
                    >
                        <Card
                            className="lightgray darken-1 tex"
                            textClassName="black-text"
                            title="1.Dịch Vụ Chăm Sóc Chim cảnh"
                        >
                            <Collapsible accordion>
                                <CollapsibleItem
                                    expanded={false}
                                    header="Chọn Dịch Vụ"
                                    node="div"
                                >

                                    <Container>
                                        <br />
                                        <Row >
                                            {Services.slice(0, 5).map((service) =>
                                            (<Col s={12} m={6} l={4} >
                                                <Card>
                                                    <img style={{ width: "150px", height: "100px" }} src={service.image} />
                                                    <Link to={`chi-tiet-dich-vu/${service.id}`}>
                                                        <h3 className='ProductTitle'>{service.name}</h3>
                                                    </Link>
                                                    <p style={{ textAlign: "center" }}>{service.price} VND</p>
                                                    <Checkbox
                                                        filledIn
                                                    // onClick={() => {
                                                    //     this.setState({
                                                    //         checkedServices: this.state.checkedServices.set(
                                                    //             service,
                                                    //             !this.state.checkedServices.get(service)
                                                    //         ),
                                                    //     });
                                                    // }}
                                                    // isChecked={!!this.state.checkedServices.get(service)}
                                                    // leftText={service}
                                                    />
                                                </Card>
                                            </Col>))}
                                        </Row>
                                    </Container>
                                </CollapsibleItem>
                            </Collapsible>
                        </Card>

                        <Card
                            className="lightgray darken-1 tex"
                            textClassName="black-text"
                            title="2.Booking"
                        >
                            <Collapsible accordion>
                                <CollapsibleItem
                                    expanded={false}
                                    header="Chọn Ngày"
                                    node="div"
                                >
                                    <Container>
                                        <div className="row">
                                            <div className="col-sm-10">
                                                <h5 className="mt-3 mb-4 text-white"></h5>

                                                <form className='row'>
                                                    <div className="row mb-4">
                                                        <label className="col-sm-2 col-form-label" onclic> Date</label>
                                                        <div className="col-sm-5">
                                                            <DatePicker selected={selectesDate}
                                                                onChange={date => setSelectedDate(date)}


                                                            />
                                                        </div>
                                                    </div>

                                                </form>

                                            </div>
                                        </div>
                                    </Container>
                                </CollapsibleItem>
                            </Collapsible>
                        </Card>

                        <Link to={`/gio-hang`}><p style={{ textAlign: "center", marginTop: "10px" }}><Button>Đặt ngay</Button></p></Link>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}