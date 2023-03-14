import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import callerApi from '../../../utils/APICaller';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toast } from 'react-toastify';
import { Container, Card, CardContent, CardActions } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    let options = [...document.querySelectorAll("#selectBox option:checked")].map(elemento => elemento.value)
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Admin() {
    const [value, setValue] = React.useState(0);
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [posts, setPosts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = React.useState('');
    const [birds, setBirds] = React.useState([]);
    const [search, setSearch] = useState("");
    let totalMoney



    async function getProducts() {
        await callerApi("Product/GetAllProduct/Filter?filterPrice=nothing&filterCategory=nothing", "GET", null).then(res => {
            setProducts(res.data);
        });
    }

    async function getServices() {
        await callerApi("Service/GetAllServices", "GET", null).then(res => {
            setServices(res.data);
        });
    }

    async function getPosts() {
        await callerApi("Post/GetAllPost/FilterByDate?filter=newest", "GET", null).then(res => {
            setPosts(res.data);
        });
    }

    async function getOrders() {
        await callerApi("Order/GetOrder", "GET", null).then(res => {
            setOrders(res.data);
        });
    }

    async function getBookings() {
        await callerApi("Booking/GetAllBooking", "GET", null).then(res => {
            setBookings(res.data);
        });
    }

    async function getBirds() {
        await callerApi("Bird/GetAllBirdtype", "GET", null).then(res => {
            setBirds(res.data);
        });
    }

    useEffect(() => {
        getBirds();
        getBookings();
        getOrders();
        getPosts();
        getServices();
        getProducts();
    }, [])

    function deleteProduct(id) {
        callerApi("Product/DeteleProduct?proId=" + id, "DELETE", null).then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success("Xóa thành công");
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            }
        }).catch(err => {
            toast.error("Xóa thất bại");
        });
    }

    function deleteService(id) {
        callerApi("Service/DeleteService?id=" + id, "DELETE", null).then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success("Xóa thành công");
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            }
        }).catch(err => {
            toast.error("Xóa thất bại");
        });;
    }

    function deletePost(id) {
        callerApi("Post/DeletePost?postId=" + id, "DELETE", null).then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success("Xóa thành công");
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            }
        }).catch(err => {
            toast.error("Xóa thất bại");
        });
    }


    const handleChangeStatus = (event, orderid) => {
        setStatus(event.target.value);
        callerApi("Order/UpdateStaus", "PUT", {
            orderId: orderid,
            statusId: event.target.value
        }).then(res => {
            console.log(res);
            window.location.reload();
        });
    };

    const handleChangeStatusBooking = (event, bookingid) => {
        setStatus(event.target.value);
        callerApi("Booking/UpdateStaus", "PUT", {
            bookingId: bookingid,
            statusId: event.target.value
        }).then(res => {
            console.log(res);
            window.location.reload();
        });
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: "#f5f5f5" }}
            >
                <Tab icon={<BarChartIcon style={{color: "red"}} />} iconPosition="start" label="Bảng Điều Khiển" {...a11yProps(0)} />
                <Tab icon={<InventoryIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Sản Phẩm" {...a11yProps(1)} />
                <Tab icon={<HomeIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Dịch Vụ" {...a11yProps(2)} />
                <Tab icon={<ArticleIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Bài Viết" {...a11yProps(3)} />
                <Tab icon={<ShoppingCartIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Đơn Hàng" {...a11yProps(4)} />
                <Tab icon={<CalendarMonthIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Đặt Lịch" {...a11yProps(5)} />
            </Tabs>
            <TabPanel value={value} index={0} style={{ marginBottm: "10px", backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Tổng Quan</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <Grid container spacing={2} style={{width: "1300px"}}>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Sản Phẩm
                                        <InventoryIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {products.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(1)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff", width: "100px" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Dịch Vụ
                                        <HomeIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {services.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(2)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Bài Viết
                                        <ArticleIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {posts.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(3)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Đơn Hàng
                                        <ShoppingCartIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {orders.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(4)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Lịch Hẹn
                                        <CalendarMonthIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {bookings.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(5)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                    </Grid>
                    <div>
                        
                    </div>

  
                    <div className="introHeading">Các Đơn Hàng Gần Đây</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tên Khách Hàng</TableCell>
                                <TableCell>Địa Chỉ</TableCell>
                                <TableCell>Số Điện Thoại</TableCell>
                                <TableCell>Ngày Đặt Hàng</TableCell>
                                <TableCell>Trạng Thái</TableCell>
                                <TableCell>Chi Tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {((orders.slice(orders.length-5,orders.length)).reverse()).map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.fullName}</TableCell>
                                    <TableCell>{order.address}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</TableCell>
                                    <TableCell>
                                        <div>
                                            {order.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                order.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                    order.statusId == 3 ? <div>Hoàn Thành</div> :
                                                        <div>Đã Hủy</div>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin/don-hang/${order.orderId}`}>
                                            <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                Chi Tiết
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* 5 lịch hẹn mới nhất */}
                    <div className="introHeading">Các Lịch Hẹn Gần Đây</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tên Khách Hàng</TableCell>
                                <TableCell>Địa Chỉ</TableCell>
                                <TableCell>Số Điện Thoại</TableCell>
                                <TableCell>Ngày Đặt Hẹn</TableCell>
                                <TableCell>Trạng Thái</TableCell>
                                <TableCell>Chi Tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {((bookings.slice(bookings.length-5, bookings.length)).reverse()).map((booking) => (
                                <TableRow key={booking.bookingId}>
                                    <TableCell>{booking.bookingId}</TableCell>
                                    <TableCell>{booking.fullName}</TableCell>
                                    <TableCell>{booking.address}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>{booking.bookingDate.slice(8,10)+"-"+booking.bookingDate.slice(5,7)+"-"+booking.bookingDate.slice(0,4)+" "+booking.bookingDate.slice(11,19)}</TableCell>
                                    <TableCell>
                                        {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                            booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                    <div>Đã Hủy</div>}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin/lich-hen/${booking.id}`}>
                                            <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                Chi Tiết
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Sản Phẩm</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1300px' }}>
                        <Link to="/admin/them-san-pham">
                            <Button variant="contained" style={{ float: "left" }}>
                                <AddIcon />
                                Thêm Sản Phẩm Mới
                            </Button>
                        </Link>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Hình Ảnh</TableCell>
                                    <TableCell>Tên Sản Phẩm</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Số Lượng</TableCell>
                                    <TableCell>Mô Tả</TableCell>
                                    <TableCell>Mục</TableCell>
                                    <TableCell>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product.productId}>
                                        <TableCell>{product.productId}</TableCell>
                                        <TableCell>
                                            <img style={{ width: "200px", height: "200px" }} src={product.image} alt={product.productName} width="100px" />
                                        </TableCell>
                                        <TableCell>{product.productName}</TableCell>
                                        <TableCell>{(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <Link to={`/admin/quan-ly-san-pham/${product.productId}`}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon />
                                                </Button>
                                            </Link>
                                            <Button variant="contained" color="secondary" onClick={() => deleteProduct(product.productId)}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Dịch Vụ</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1300px' }}>
                        <Link to="/admin/them-dich-vu">
                            <Button variant="contained" style={{ float: "left" }}>
                                <AddIcon />
                                Thêm Dịch Vụ Mới
                            </Button>
                        </Link>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Hình Ảnh</TableCell>
                                    <TableCell>Tên Dịch Vụ</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Mô Tả</TableCell>
                                    <TableCell>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {services.map((service) => (
                                    <TableRow key={service.serviceId}>
                                        <TableCell>{service.serviceId}</TableCell>
                                        <TableCell>
                                            <img style={{ width: "200px", height: "200px" }} src={service.image} alt={service.serviceName} width="100px" />
                                        </TableCell>
                                        <TableCell>{service.serviceName}</TableCell>
                                        <TableCell>{(service.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                        <TableCell>{service.desciption}</TableCell>
                                        <TableCell>
                                            <Link to={`/admin/quan-ly-dich-vu/${service.serviceId}`}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon />
                                                </Button>
                                            </Link>
                                            <Button variant="contained" color="secondary" onClick={() => deleteService(service.serviceId)}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={3} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Bài Viết</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1300px' }}>
                        <Link to="/admin/them-bai-viet">
                            <Button variant="contained" style={{ float: "left" }}>
                                <AddIcon />
                                Thêm Bài Viết Mới
                            </Button>
                        </Link>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Hình Ảnh</TableCell>
                                    <TableCell>Tiêu Đề</TableCell>
                                    <TableCell>Tác Giả</TableCell>
                                    <TableCell>Ngày Đăng</TableCell>
                                    <TableCell>Mục Chim</TableCell>
                                    <TableCell>Mô Tả</TableCell>
                                    <TableCell>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts.map((post) => (
                                    <TableRow key={post.postId}>
                                        <TableCell>{post.postId}</TableCell>
                                        <TableCell>
                                            <img style={{ width: "200px", height: "200px" }} src={post.image} alt={post.title} width="100px" />
                                        </TableCell>
                                        <TableCell>{post.title}</TableCell>
                                        <TableCell>{(post.author).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                        <TableCell><div style={{ width: "105px" }}>{post.date.slice(8, 10) + "/" + post.date.slice(5, 7) + "/" + post.date.slice(0, 4) + " " + post.date.slice(11, 16)}</div></TableCell>
                                        <TableCell>
                                            {birds.map((bird) => (
                                                bird.birdId === post.birdType ? <div>{bird.birdName}</div> : null
                                            ))}
                                        </TableCell>
                                        <TableCell><div className="PostDescription" style={{ width: "500px" }} >{post.description}</div></TableCell>
                                        <TableCell>
                                            <Link to={`/admin/quan-ly-bai-viet/${post.postId}`}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon />
                                                </Button>
                                            </Link>
                                            <Button variant="contained" color="secondary" onClick={() => deletePost(post.postId)}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={4} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Đơn Hàng</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1300px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Khách Hàng</TableCell>
                                    <TableCell>Ngày Đặt</TableCell>
                                    <TableCell>Trạng Thái</TableCell>
                                    <TableCell>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders?.map((order) => (
                                    order.statusId == 1 && (
                                        <TableRow key={order.orderId}>
                                            <TableCell>{order.orderId}</TableCell>
                                            <TableCell>{order.fullName}</TableCell>
                                            <TableCell><div style={{ width: "105px" }}>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</div></TableCell>
                                            <TableCell>Chờ Xác Nhận</TableCell>
                                            <TableCell>
                                                <FormControl fullWidth >
                                                    <InputLabel id="demo-simple-select-outlined-label">Trạng Thái</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        onChange={(e) => handleChangeStatus(e, order.orderId)}
                                                        label="Trạng Thái"
                                                    >
                                                        <MenuItem value={2}>Đã Xác Nhận</MenuItem>
                                                        <MenuItem value={3}>Hoàn Thành</MenuItem>
                                                        <MenuItem value={4}>Đã Hủy</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    )
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={5} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Đặt Lịch</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1300px' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Khách Hàng</TableCell>
                                    <TableCell>Ngày Đặt</TableCell>
                                    <TableCell>Trạng Thái</TableCell>
                                    <TableCell>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {bookings?.map((booking) => (
                                    booking.statusId == 1 && (
                                        <TableRow key={booking.bookingId}>
                                            <TableCell>{booking.bookingId}</TableCell>
                                            <TableCell>{booking.fullName}</TableCell>
                                            <TableCell><div style={{ width: "105px" }}>{booking.bookingDate.slice(8, 10) + "/" + booking.bookingDate.slice(5, 7) + "/" + booking.bookingDate.slice(0, 4) + " " + booking.bookingDate.slice(11, 16)}</div></TableCell>
                                            <TableCell>Chờ Xác Nhận</TableCell>
                                            <TableCell>
                                                <FormControl fullWidth >
                                                    <InputLabel id="demo-simple-select-outlined-label">Trạng Thái</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        onChange={(e) => handleChangeStatusBooking(e, booking.bookingId)}
                                                        label="Trạng Thái"
                                                    >
                                                        <MenuItem value={2}>Đã Xác Nhận</MenuItem>
                                                        <MenuItem value={3}>Hoàn Thành</MenuItem>
                                                        <MenuItem value={4}>Đã Hủy</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                        </TableRow>
                                    )
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </TabPanel>
        </Box>
    );
}