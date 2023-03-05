import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, SideNav, SideNavItem, Select } from 'react-materialize'
import { addToCart } from '../../context/CartSlice'
import { useDispatch } from 'react-redux'
import SearchIcon from '@mui/icons-material/Search';
import Spinner from '../Spinner/spinner';
import { useEffect, useState } from 'react';

export default function Product({ Products }) {
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    useEffect(()=>{
        setTimeout(setloading,800,true);
    },[Products])
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    return (
        <div>
            <div>
                <SideNav
                    id="SideNav-31"
                    options={{
                        draggable: true
                    }}
                    trigger={<Button
                        className="red"
                        floating
                        icon={<SearchIcon />}
                        large
                        node="button"
                        waves="light"
                    />}
                >
                    <SideNavItem
                        user={{
                            background: 'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                            email: '',
                            image: 'assets/images/logo.png',
                            name: '',
                        }}
                        userView
                    />
                    <br />
                    <div className="form-group">
                        <input style={{
                            display: "block",
                            width: "100%",
                            height: "34px",
                            padding: "6px 12px",
                            fontSize: "16px",
                            color: "#797b7c",
                            backgroundColor: "#fff",
                            border: "1px solid #ccc"
                        }}
                            type="text" className="form-control" placeholder="Tìm kiếm" required />
                    </div>
                    <Select
                        id="Select-33"
                        multiple
                        options={{
                            classes: '',
                            dropdownOptions: {
                                alignment: 'left',
                                autoTrigger: true,
                                closeOnClick: true,
                                constrainWidth: true,
                                coverTrigger: true,
                                hover: false,
                                inDuration: 150,
                                outDuration: 250
                            }
                        }}
                        value={[
                            ''
                        ]}
                    >
                        <option
                            disabled
                            value=""
                        >
                            Filter
                        </option>
                        <option value="1">
                            Thức Ăn
                        </option>
                        <option value="2">
                            Thuốc
                        </option>
                    </Select>

                </SideNav>
            </div>
                <Container>
                    <br />
                    <h3 class="AboutTitle">Các Sản Phẩm</h3>
                    <div className="bottom-line2"></div>
                    {!loading && <Spinner>LOADING . . . .</Spinner>}
                    <Row >
                        {Products.map((product) =>
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